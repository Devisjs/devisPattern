/* Copyright (c) 2016 Devis, MIT License */
"use strict";

class devisPattern {

    constructor() {
        this.path = [];
        this.id = 0;
        this.index = new Map();
    }

    add(path, handle) {
        this.path[this.id] = handle;
        const key = JSON.stringify(path);
        // First registration wins, as with the former native addon.
        if (!this.index.has(key)) {this.index.set(key, this.id);}
        this.id++;
        return this;
    }

    find(path) {
        const id = this.index.get(JSON.stringify(path));
        if (id !== undefined) {return this.path[id];}
        else {return null;}
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
