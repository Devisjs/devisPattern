"use strict";
const devisPattern = require("../devisPattern");
const date = require("./time");

let i,j;
let LIMIT = 2900;
for (i = 0; i < LIMIT; i++) {
    date.time(i);
    devisPattern.add({
        id: i,
        cmd: i
    }, (args, done) => {

        let x = args.ident;
        let somme = args.data1 + args.data2 + args.data3 + args.data4;
        done(somme);
    });
}

for (j = 0; j < LIMIT; j++) {
    let i = Math.trunc(Math.random() * 100);

    devisPattern.call({
        id: i,
        cmd: i
    }, {
        ident: i,
        data1: 2 * i,
        data2: 3 * i,
        data3: 4 * i,
        data4: 5 * i
    }, (res) => {
        console.log(res);
        date.timeEnd(i);

    });
}

console.log(date.moyenne()/1000+"s");
//console.log(date.min()/1000+"s");
