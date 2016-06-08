function checkEquals(o1, o2, proto) {
  var t1 = typeof o1;
  var t2 = typeof o2;
  if (t1 !== t2) return false; //they aren't the same type, can't be equal

  //null's typeof is 'object', even though we can't do anything with it. Need to capture all primitives, undefined, and nulls here
  if ((t1 !== 'object' && t1 !== 'function') || o1 === null || o2 === null) {
    return o1 === o2;
  }

  //if it is a function passed in and it isn't the same ref, we can only go off it's toString, which will match both anonymous and named functions
  if (t1 === 'function') {
    console.log('hello', o1.toString(), o2.toString());
    return o1.toString() === o2.toString();
  }

  //if it is an array passed in
  if (Array.isArray(o1) !== Array.isArray(o2)) {
    return false;
  }

  //if we don't have the same number of keys, must be false
  if (Object.keys(o1).length !== Object.keys(o2).length) return false;

  //loop through the keys, and recursively see if they're the same
  for (var propName in o1) {
    if (o1.hasOwnProperty(propName)) {
      if (!checkEquals(o1[propName], o2[propName])) {
        return false;
      }
    }
  }

  //all this objects' keys are correct, check the proto if desired
  if (proto === undefined || proto === true) {
    if (!checkEquals(Object.getPrototypeOf(o1), Object.getPrototypeOf(o2), true)) {
      return false;
    }
  }

  return true;
}

//makes it easier to check protos
function checkProto(o1, o2, proto, arrOrder) {
  return checkEquals(Object.getPrototypeOf(o1), Object.getPrototypeOf(o2), proto)
}

module.exports = {
  checkEquals: checkEquals,
  checkProto: checkProto,
}
