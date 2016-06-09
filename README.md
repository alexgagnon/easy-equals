# easyequals
A simple package for doing comparisons. No dependencies or transpilers needed

Compares Primitives, Objects, Arrays, Functions, and Dates

For primitives, uses strict comparison (===)

For arrays, it compares them based on value and order

For functions, it's based only on their references or toString. Because of this, although closures may have the same expressions, they may not have the same state and so might have different behaviour. You've been warned.

By default, compares prototypes as well, but you can just check the items own properties if false is passed into 'proto'

####Usage
CommonJS

`var easy = require('easy-equals')`;

ES6

`import * as easy from 'easy-equals'`;

Then use as so...

`easy.equals(item1, item2, [proto])`;


NOTE: It's a bit slower than lodash (about 25% slower when testing on huge objects)
