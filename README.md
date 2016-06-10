#easyequals

A simple package for doing comparisons. No dependencies or transpilers needed

Compares Primitives, Objects, Arrays, Functions, and Dates

####Usage

CommonJS

`var easy = require('easy-equals')`;

Then use as so...

`easy.equals(item1, item2[, proto])`;

or, to check the prototypes...

`easy.equalsProto(item1, item2[, proto])`

####Notes

For all values, it first checks if the reference is the same. Same object's will always return true.

For primitives, uses strict comparison (===). This means that even values that are considered 'truthy' or 'falsy' only by coersion will always return false.

    '' == 0 // true
    [] == false // true

    easy.equals('', 0) // false, one is a string, the other a number
    easy.equals([], false) // false, one is an empty array, the other a boolean

For objects, property order doesn't matter, just that (1) they have the same number of properties, and (2) the value for each property is equal.

    var obj1 = { a: 'a', b: 'b' }
    var obj2 = { b: 'b', a: 'a' }
    var obj3 = { a: 'a', b: 'a' }
    var obj4 = { a: 'a', c: 'c' }

    easy.equals(obj1, obj2) // true, same key-value pairs
    easy.equals(obj1, obj3) // false, same keys, but values are different
    easy.equals(obj1, obj4) // false, different keys

For arrays, it compares them based on value and order. Can have nested arrays and objects.

    var a = [1, 2, { obj: 3 }]
    var b = [1, 2, { obj: 3 }]
    var c = [1, 2, { obj: 5 }]
    var d = [1, { obj: 3 }, 2]

    easy.equals(a, b) // true, same order and values
    easy.equals(a, c) // false, different value
    easy.equals(a, d) // false, different order

For functions, it's based only on their references or toString. Because of this, it really is only good to check if the function have the same name and statements. Even then, although closures may have the same expressions, they may not have the same state and so might have different behaviour. You've been warned.

    var func1 = function hello() {}
    var func2 = function hello() {}
    var func3 = function () {}

    easy.equals(func1, func2) // true, same toString()
    easy.equals(func1, func3) // false, toString() is different

By default, it first checks this objects' own properties, then recursively checks the item's prototypes as well. You can just check the items own properties if false is passed into 'proto'.

    var child1 = { prop1: 'cool' }
    var child2 = { prop1: 'cool' }
    var child3 = { prop1: 'cool' }

    var parent1 = { parentProp: 'sweet' }
    var parent2 = { parentProp: 'sweet' }
    var parent3 = { parentProp2: 'uh oh' }

    child1.__proto__ = parent1;
    child2.__proto__ = parent2;
    child3.__proto__ = parent3;

    easy.equals(child1, child2) // true, both the child and parents' match
    easy.equals(child1, child3) // false, child is the same, but parents are not
    easy.equals(child1, child3, false) // true, just the children are the same

There is an additional method too, a shorthand for checking the prototypes of two items to see if they're the same, called equalsProto.
