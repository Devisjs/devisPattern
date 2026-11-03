/* Copyright (c) 2016 Devis, MIT License */
"use strict";

class devisPattern {

    constructor() {
        this.path = [];
        this.id = 0;
        this.index = new Map();
        this.entries = [];
    }

    add(path, handle) {
        this.path[this.id] = handle;
        const key = JSON.stringify(path);
        // First registration wins, as with the former native addon.
        if (!this.index.has(key)) {
            this.index.set(key, this.id);
            this.entries.push({ path: path, id: this.id });
        }
        this.id++;
        return this;
    }

    find(path) {
        const id = this.index.get(JSON.stringify(path));
        if (id !== undefined) {return this.path[id];}
        else {return null;}
    }

    // Most specific registered pattern whose keys all appear in path with the same values; the first registered wins a tie.
    match(path) {
        const exact = this.find(path);
        if (exact) {return { handle: exact, size: Object.keys(path).length };}
        let best = null;
        for (const entry of this.entries) {
            const keys = Object.keys(entry.path);
            if (best && keys.length <= best.size) {continue;}
            const matches = keys.every((key) => Object.hasOwn(path, key) && JSON.stringify(path[key]) === JSON.stringify(entry.path[key]));
            if (matches) {best = { handle: this.path[entry.id], size: keys.length };}
        }
        return best;
    }

    call(path, args, callback) {
        if (!callback) {
            callback = args;
            args = {};
        }
        let res = this.find(path);
        if (res) {res.call(this, args, callback);}
        return this;
    }

    list() {
        return "[" + [...this.index.keys()].join(",") + "]";
    }

}
module.exports = devisPattern;
