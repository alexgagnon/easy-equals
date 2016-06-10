var mocha = require('mocha');
var assert = require('chai').assert;
var checkEquals = require('../easy-equals').equals;
var checkProto = require('../easy-equals').equalsProto;

var _ = require('lodash');

var str = 'hello'
var arr = [1, 2, 3]
var fun = function() {}
var bool = false;
var num = 4;
var date1 = new Date();
var date2 = new Date('2015');
var date3 = new Date(date1);
var a = {}
var b = a
var c = {}
var d = {"1": 1}
var e = {"1": 1}
var f = {"1": 2}
var g = {"2": 1}
var h = {bool: true}
var i = {bool: true}
var j = {bool: false}
var k = {name: 'alex'}
var l = {name: 'alex'}
var m = {name: 'lisa'}
var n = {obj: {}}
var nn = {obj: d}
var nnn = {obj: d}
var nnnn = {obj: {1: 1}}
var o = {obj: []}
var p = {obj: 'string'}
var q = {obj: { name: 'alex'}}
var r = {obj: { name: 'alex'}}
var s = {obj: { name: 'lisa'}}
var t = {obj: { arr: [1, 2, 3]}}
var tt = {obj: { arr: [1, 2, 3]}}
var ttt = {obj: { arr: [1, 2, 5]}}
var u = {obj: { arr: [1, 2, 4]}}
var v = {obj: { arr: [{obj: 1}, function() {}]}}
var w = {obj: { arr: [{obj: 1}, function() {}]}}
var x = {obj: { arr: [{obj: 4}, function() {}]}}
var y = function() {}
var yy = function hello() {}
var yyy = function() {return 1;}
var z = function() {}
var zz = z

var aa = { func: function() {}}
var bb = { func: function() {}}

var arr1 = [1, {obj: 'hello'}]
var arr2 = [1, {obj: 'hello'}]
var arr3 = [2, {obj: 'hello'}]
var arr4 = [1, {obj: 'goodbye'}]

var child1 = {obj: 'sweet'}
var child2 = {obj: 'salty'}
var child3 = {obj: 'sweet'}

var child4 = {obj: 'sweet'}
var child5 = {obj: 'salty'}
var child6 = {obj: 'sweet'}

var child7 = {obj: 'sweet'}
var child8 = {obj: 'salty'}
var child9 = {obj: 'sweet'}

var parent1 = {parent: true}
var parent2 = {parent: true}
var parent3 = {parent: false}

child1.__proto__ = parent1;
child2.__proto__ = parent1;
child3.__proto__ = parent1;

child4.__proto__ = parent2;
child5.__proto__ = parent2;
child6.__proto__ = parent2;

child7.__proto__ = parent3;
child8.__proto__ = parent3;
child9.__proto__ = parent3;

describe('Prototypes', function() {
  describe('Same parent ref', function() {
    it('should be true if the children are the same and proto is same ref', function() {
      assert.isTrue(checkEquals(child1, child3));
    });

    it('should be true is the children are the same and the proto is a similar object', function() {
      assert.isTrue(checkEquals(child1, child4));
    })

    it('should be false if the children are not the same, or the prototypes are different', function() {
      assert.isFalse(checkEquals(child1, child2));
      assert.isFalse(checkEquals(child1, child7));
    })
  })
})

describe('Primitives', function() {
  it('should be true when comparing equal primitives', function() {
    assert.isTrue(checkEquals(str, 'hello'));
    assert.isFalse(checkEquals(str, 'nothing'));
    assert.isTrue(checkEquals(bool, false));
    assert.isFalse(checkEquals(bool, true));
    assert.isTrue(checkEquals(num, 4));
    assert.isFalse(checkEquals(num, 6));
    assert.isTrue(checkEquals(undefined, undefined));
  });

  it('should be false when comparing against other primitives', function() {
    assert.isFalse(checkEquals(undefined, 4));
    assert.isFalse(checkEquals(num, str));
    assert.isFalse(checkEquals(num, true));
    assert.isFalse(checkEquals(0, bool));
  });
})

describe('Empty objects', function() {
  it('should return true with two empty objects', function() {
    assert.isTrue(checkEquals(a, c));
  });

  it('should be false when compared with non objects', function() {
    assert.isFalse(checkEquals(a, 4));
  });
});

describe('Basic Objects:', function() {
  describe('Arrays', function() {
    it('should be true when comparing equal arrays', function() {
      assert.isTrue(checkEquals(arr, [1,2,3]));
      assert.isTrue(checkEquals(arr1, arr2));
    });

    it('should be false when comparing arrays to other types', function() {
      assert.isFalse(checkEquals(arr, {}));
    });

    it('should be false when the arrays are not the same', function() {
      assert.isFalse(checkEquals(arr, []));
      assert.isFalse(checkEquals(arr, [1, 2, 4]));
      assert.isFalse(checkEquals(arr1, arr3));
      assert.isFalse(checkEquals(arr, 4));
    });
  });

  describe('Functions', function() {
    it('should return true if exactly the same or the same ref', function() {
      assert.isTrue(checkEquals(y, z));
      assert.isTrue(checkEquals(z, zz));
    });

    it('should be false if it has different expressions or names', function() {
      assert.isFalse(checkEquals(y, yy));
      assert.isFalse(checkEquals(y, yyy));
      assert.isFalse(checkEquals(yy, yyy));
    });
  });

  describe('Dates', function() {
    console.log(date1, date2, date3);
    it('should be true with matching dates', function() {
      assert.isTrue(checkEquals(date1, date3));
    });

    it ('should be false with different dates', function() {
      assert.isFalse(checkEquals(date1, date2));
    });
  });
})

describe('Refs', function() {
  it('should be true with an object and a reference to it', function() {
    assert.isTrue(checkEquals(a, b));
  });

  it('should be true when we compare an object to a reference of another object', function() {
    assert.isTrue(checkEquals(b, c));
  })
});

describe('Nulls', function() {
  it('should be false if null is compared with anything but null, true otherwise',
  function() {
    assert.isFalse(checkEquals(undefined, null));
    assert.isFalse(checkEquals({}, null));
    assert.isFalse(checkEquals(undefined, {}));
    assert.isTrue(checkEquals(null, null));
  });
})

describe('Primitive values', function() {
  it('should be true if the key and value are the same', function() {
    assert.isTrue(checkEquals(d, e));
    assert.isTrue(checkEquals(k, l));
  });

  it('should be false if the key and/or value are different', function() {
    assert.isFalse(checkEquals(d, f));
    assert.isFalse(checkEquals(d, g));
  });
});

describe('Nested Objects', function() {
  it('should be true if the values are themselves equivalent objects', function() {
    assert.isTrue(checkEquals(nn, nnn));
    assert.isTrue(checkEquals(nn, nnnn));
  });

  it('should be false if the values are not equal', function() {
    assert.isFalse(checkEquals(n, nn));
    assert.isFalse(checkEquals(n, nnnn));
  });

  it('should be true if the inner values are arrays', function() {
    assert.isTrue(checkEquals(v, w));
  })

  it('should be false when inner values are not the same', function() {
    assert.isFalse(checkEquals(v, x));
  })
});

describe('Empty objects', function() {
  it('should be false if they are not the same', function() {
    assert.isFalse(checkEquals([], {}));
    assert.isFalse(checkEquals({}, new Date()));
    assert.isFalse(checkEquals([], new Date()));
  })
});
