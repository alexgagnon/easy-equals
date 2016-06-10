function checkEquals(o1, o2, proto) {
  var t1 = typeof o1;
  var t2 = typeof o2;
  if (t1 !== t2) return false; //they aren't the same type, can't be equal

  //null's typeof is 'object', even though we can't do anything with it. Need to capture all primitives, undefined, and nulls here (not functions though)
  if ((t1 !== 'object' && t1 !== 'function') || o1 === null || o2 === null) {
    return o1 === o2;
  }

  //if it is a function passed in and it isn't the same ref, we can only go off it's toString, which will match both anonymous and named functions
  if (t1 === 'function') {
    return o1.toString() === o2.toString();
  }

  //compare dates using getTime()
  if (o1 instanceof Date) {
    return (o2 instanceof Date) ? o1.getTime() === o2.getTime() : false;
  }

  //if one but not both are arrays, not equal. If they both are, just check with keys
  if (Array.isArray(o1) !== Array.isArray(o2)) {
    return false;
  }

  //if we don't have the same number of keys, must be false
  if (Object.keys(o1).length !== Object.keys(o2).length) return false;

  //loop through own properties, and recursively see if they're the same. To limit comparisons with hasOwnProperty, use try/catch to break out of the forEach
  try {
    Object.keys(o1).forEach(function(propName) {
      if (!checkEquals(o1[propName], o2[propName])) throw BreakException();
    })
  }
  catch (e) {
    return false;
  }

  //all this objects' keys are correct, check the proto if desired. This speeds up looking through all props, as if the proto are the same ref, catches it in one check
  if (proto === undefined || proto === true) {
    if (!checkEquals(Object.getPrototypeOf(o1), Object.getPrototypeOf(o2), true)) {
      return false;
    }
  }

  return true;
}

//makes it easier to check protos
function checkProto(o1, o2, proto) {
  return checkEquals(Object.getPrototypeOf(o1), Object.getPrototypeOf(o2), proto)
}

module.exports = {
  equals: checkEquals,
  equalsProto: checkProto,
}
