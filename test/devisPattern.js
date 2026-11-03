"use strict";
const test = require("node:test");
const assert = require("node:assert");
const DevisP = require("../devisPattern");

test("find returns the handle registered for an identical pattern", () => {
    const matcher = new DevisP();
    const play = () => {};
    matcher.add({ action: "game", cmd: "play" }, play);
    assert.strictEqual(matcher.find({ action: "game", cmd: "play" }), play);
});

test("find returns null for an unknown pattern", () => {
    const matcher = new DevisP();
    matcher.add({ action: "game", cmd: "play" }, () => {});
    assert.strictEqual(matcher.find({ action: "game", cmd: "stop" }), null);
});

// devis routes remote calls by this exact-match contract, so partial matches must not resolve.
test("find does not match a subset or superset of a pattern", () => {
    const matcher = new DevisP();
    matcher.add({ action: "game", cmd: "play" }, () => {});
    assert.strictEqual(matcher.find({ action: "game" }), null);
    assert.strictEqual(matcher.find({ action: "game", cmd: "play", extra: 1 }), null);
});

test("the first handle registered for a pattern is kept", () => {
    const matcher = new DevisP();
    const first = () => {};
    matcher.add({ cmd: "a" }, first);
    matcher.add({ cmd: "a" }, () => {});
    assert.strictEqual(matcher.find({ cmd: "a" }), first);
});

// The former native addon shared one table across instances, so ids collided between matchers.
test("instances do not share registered patterns", () => {
    const a = new DevisP();
    const b = new DevisP();
    a.add({ cmd: "a" }, () => {});
    const handleB = () => {};
    b.add({ cmd: "b" }, handleB);
    assert.strictEqual(b.find({ cmd: "a" }), null);
    assert.strictEqual(b.find({ cmd: "b" }), handleB);
});

test("call invokes the handle with args and callback", () => {
    const matcher = new DevisP();
    matcher.add({ cmd: "sum" }, (args, done) => done(args.x + args.y));
    let result;
    matcher.call({ cmd: "sum" }, { x: 2, y: 3 }, (res) => { result = res; });
    assert.strictEqual(result, 5);
});

test("call without args passes an empty object", () => {
    const matcher = new DevisP();
    matcher.add({ cmd: "args" }, (args, done) => done(args));
    let result;
    matcher.call({ cmd: "args" }, (res) => { result = res; });
    assert.deepStrictEqual(result, {});
});

// devis parses list() with JSON.parse and re-registers each pattern when plugging services together.
test("list returns a JSON array string of registered patterns", () => {
    const matcher = new DevisP();
    assert.strictEqual(matcher.list(), "[]");
    matcher.add({ cmd: "a" }, () => {});
    matcher.add({ cmd: "b", n: 1 }, () => {});
    assert.deepStrictEqual(JSON.parse(matcher.list()), [{ cmd: "a" }, { cmd: "b", n: 1 }]);
});

test("match returns the handle of an identical pattern with its key count", () => {
    const matcher = new DevisP();
    const sum = () => {};
    matcher.add({ role: "math", cmd: "sum" }, sum);
    assert.deepStrictEqual(matcher.match({ role: "math", cmd: "sum" }), { handle: sum, size: 2 });
});

// A caller may send more keys than the handler cares about, such as a version or a tenant.
test("match resolves a registered pattern contained in a larger one", () => {
    const matcher = new DevisP();
    const sum = () => {};
    matcher.add({ role: "math", cmd: "sum" }, sum);
    assert.strictEqual(matcher.match({ role: "math", cmd: "sum", version: 2 }).handle, sum);
    assert.strictEqual(matcher.match({ role: "math" }), null);
    assert.strictEqual(matcher.match({ role: "math", cmd: "divide" }), null);
});

// A generic handler must not shadow a specific one, whatever the registration order.
test("match prefers the pattern with the most keys", () => {
    const matcher = new DevisP();
    const any = () => {};
    const sum = () => {};
    matcher.add({ role: "math" }, any);
    matcher.add({ role: "math", cmd: "sum" }, sum);
    assert.strictEqual(matcher.match({ role: "math", cmd: "sum", x: 1 }).handle, sum);
    assert.strictEqual(matcher.match({ role: "math", cmd: "divide" }).handle, any);
});

test("match keeps the first registered pattern on a tie", () => {
    const matcher = new DevisP();
    const byRole = () => {};
    matcher.add({ role: "math" }, byRole);
    matcher.add({ cmd: "sum" }, () => {});
    assert.strictEqual(matcher.match({ role: "math", cmd: "sum" }).handle, byRole);
});

test("match compares values, not only keys", () => {
    const matcher = new DevisP();
    matcher.add({ role: "math", options: { precise: true } }, () => {});
    assert.notStrictEqual(matcher.match({ role: "math", options: { precise: true } }), null);
    assert.strictEqual(matcher.match({ role: "math", options: { precise: false } }), null);
    assert.strictEqual(matcher.match({ role: "1" }), null);
});
