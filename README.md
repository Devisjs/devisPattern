# DevisPattern
 <img  src="https://avatars3.githubusercontent.com/u/21971184?v=4&amp;s=200" href="http://devisjs.surge.sh" width="250" />

>A pattern matcher on JavaScript object properties.

<p align="center">
  <a href="https://www.npmjs.com/package/devisPattern"><img src="https://img.shields.io/npm/v/devisPattern.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/devisPattern"><img src="https://img.shields.io/npm/l/devisPattern.svg" alt="License"></a>
  <a href="https://github.com/Devisjs/devisPattern/actions/workflows/ci.yml"><img src="https://github.com/Devisjs/devisPattern/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

This module is used by the [devis](https://github.com/Devisjs/devis) framework to route actions to their handlers.

Since 2.0.0 it is plain JavaScript: no compiler, CMake or native build is needed. Node.js 22 or later is required.

## Install

```sh
npm install devisPattern
```

### Quick example

```JavaScript
const DevisPattern = require("devisPattern");
const devisPattern = new DevisPattern();

devisPattern.add({
    action: "game",
    cmd: "play"
}, (args, done) => {
    done({
        result: "play"
    });
});

devisPattern.call({
    action: "game",
    cmd: "play"
}, (result) => {
    console.log(result); // { result: 'play' }
});
```

## Matching rules

`find` matches only an identical pattern: same keys, same values, same key order. Patterns are compared by their `JSON.stringify` form, so `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }` are different patterns, and `{ a: 1 }` does not match `{ a: 1, b: 2 }`.

When the same pattern is added twice, the first handler is kept.

`match` is the partial lookup used by Devis 4.1: a registered pattern matches when all its keys appear in the looked-up pattern with the same values. The pattern with the most keys wins, and the first registered wins a tie:

```JavaScript
devisPattern.add({ role: "math" }, any);
devisPattern.add({ role: "math", cmd: "sum" }, sum);

devisPattern.match({ role: "math", cmd: "sum", version: 2 }); // { handle: sum, size: 2 }
devisPattern.match({ role: "math", cmd: "divide" });          // { handle: any, size: 1 }
devisPattern.match({ cmd: "sum" });                           // null
```

## API

### new DevisPattern()

Creates a matcher. Each instance has its own patterns.

### .add( {...pattern...}, handler )

Registers a pattern and the handler returned when an identical pattern is looked up. Returns the instance.

### .find( {...pattern...} )

Returns the handler registered for this pattern, or `null`.

### .match( {...pattern...} )

Returns `{ handle, size }` for the most specific registered pattern contained in this one, where `size` is its number of keys, or `null`.

### .call( {...pattern...}, [{...arguments...}], callback )

Calls the handler registered for this pattern with `(arguments, callback)`. `arguments` defaults to `{}`. Does nothing when no handler matches.

### .list( )

Returns the registered patterns as a JSON array string.

## Upgrading from 1.x

- The native addon is gone, so installing no longer needs CMake or a C++ toolchain.
- Instances no longer share a single pattern table. In 1.x, two instances could resolve each other's patterns to the wrong handler.
- Node.js 22 or later is required.

## License

MIT
