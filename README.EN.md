## js-algorithm
continuously update common JavaScript algorithms

### 1.Define a function to convert 12378900 to 12,378,900
```
# 12300 transform 12,300

function thousandSeparator(number) {
  let result = [];
  let rest = String(Math.abs(number));
  while (rest.length) {
    result.push(rest.slice(-3));
    rest = rest.slice(0, -3);
  }
  const r = result.reverse().join(",");
  return number < 0 ? "-" + r : r
}
console.log(666, thousandSeparator(12300))
```

### 2.myReduce
```js
Array.prototype.myReduce = function (callback, initialValue) {
  let arr = this;
  let pre = initialValue ? initialValue : arr[0];
  let i = initialValue ? 0 : 1;
  for (i; i < arr.length; i++) {
    pre = callback(pre, arr[i]);
  }
  return pre;
}
const res = [1, 2, 3, 4].myReduce((pre, cur) => {
  return pre + cur;
}, 1);
console.log('myReduce', res);
```
### 3.inherit
```js
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
const a = new Person('li', 'lei')
const b = Person('li', 'lei')
console.log(a, b, a.__proto__ === Person.prototype)
```
### 4. call, apply, bind
```js
function P(age, country) {
console.log(`Hello, my name is ${this.name} and I am ${age}, I am from ${country}`);
}
/*

1. The call function allows you to call a function in a specific context
function.call(context, arg1, arg2, ...)

2. The apply function is similar to the call function, and it also allows you to call a function in a specific context. The difference is that the apply function requires parameters to be passed as an array
function.apply(context, [argsArray])

1. The bind function is different from the call and apply functions. It does not call the function immediately. Instead, it returns a new function that will be bound to the specified context,
and when the function is called, it will run with the specified context.
function.bind(thisArg, arg1, arg2, ...)
*/
P.call({name: 'mary'}, '12', 'USA')
P.apply({name: 'lilei'}, ['13', 'France'])
P.bind({name: 'tom'}, '11', 'China')

// 5. Custom call, apply, bind
// Implement the call method
Function.prototype.myCall = function (context, ...args) {
  // If the context parameter is empty, it defaults to the window object
  context = context || window;
  // Create a unique identifier using the Symbol function
  const fnSymbol = Symbol();
  // Store the original function as a property of the context object
  context[fnSymbol] = this;
  // Call the function and store the result in the result variable
  const result = context[fnSymbol](...args);
  // Delete the properties of the context object
  delete context[fnSymbol];
  // Return the result of the function
  return result;
};

// Implement the apply method
Function.prototype.myApply = function (context, args) {
  // If the context parameter is empty, it defaults to the window object
  context = context || window;
  // Create a unique identifier using the Symbol function
  const fnSymbol = Symbol();
  // Store the original function as a property of the context object
  context[fnSymbol] = this;
  // Call the function and store the result in the result variable
  const result = context[fnSymbol](...args);
  // Delete the properties of the context object
  delete context[fnSymbol];
  // Return the result of the function
  return result;
};

// Implement the bind method
Function.prototype.myBind = function (context, ...args) {
  // Bind this Stored in fn variable
  const fn = this;
  // Return a new function that merges the passed arguments with the new function's arguments and calls the original function with apply in the new context
  return function (...newArgs) {
  return fn.apply(context, [...args, ...newArgs]);
  };
};
P.myCall({name: 'mary'}, '12', 'USA')
P.myApply({name: 'lilei'}, ['13', 'France'])
P.myBind({name: 'tom'}, '11', 'China')
```

### 5.checkIfInstanceOf
```js
const checkIfInstanceOf = (obj, classFunction) => {
  if (classFunction === null) return false;
  while (obj !== null) {
    if (obj.__proto__ === classFunction.prototype) {
      return true
    };
    obj = obj.__proto__;
  }
  return false;
}
class Animal {};
class Dog extends Animal {};

console.log('checkIfInstanceOf', checkIfInstanceOf(new Date(), Date)) // true
console.log('checkIfInstanceOf', checkIfInstanceOf(new Dog(), Animal)) // true
console.log('checkIfInstanceOf', checkIfInstanceOf(Date, Date)) // false
console.log('checkIfInstanceOf', checkIfInstanceOf(5, Number)) // true
console.log('checkIfInstanceOf', checkIfInstanceOf([], Array)) // true
```
### 6.数组原型对象的最后一个元素
```js
Array.prototype.last = function() {
  const len = this.length
  return len ? this[len - 1] : -1
}
console.log([1, 2, 3].last()); // 3
console.log([].last()); // -1
```
### 7.counter
```js
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
  return function() {
      return n++
  };
};

const counter = createCounter(10)
counter() // 10
counter() // 11
counter() // 12
```

### 8.Sleep Function Write an asynchronous function that takes a positive integer parameter millis and sleeps for millis milliseconds. This function is required to be able to interpret any value.
```js
/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise((resolve, reject) => {
      setTimeout(resolve, millis)
  })
}

let t = Date.now()
sleep(100).then(() => console.log(Date.now() - t)) // 100
```
### 9.Array flat
```js
/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */

Array.prototype.myFlat = function(deep) {
  let arr = this;
  let result = [];
  if (deep === 0) {
    return arr;
  }
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...arr[i].myFlat(deep - 1));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log('myFlat', [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]].myFlat(2))

```
### 10.add and sub methods
```js
Number.prototype.add = function(n) {
  return this + n
}
Number.prototype.sub = function(n) {
  return this - n
}

console.log('(5).add(3).sub(2)',(5).add(3).sub(2)) // 6
```

### 11.sum method
```js
const myAdd = (min, max) => {
  let sum = 0
  for (let i = min; i <= max; i++) {
    sum = sum + i
  }
  return sum
}

console.log('myAdd', myAdd(1, 100))
```
### 12.intersect
```js
// 在西雅图的公司远程工作，因为月中算法考核，半月的绩效奖金没了。。。
const intersect = function (nums1, nums2) {
  let result = []
  let longArr = nums1.length > nums2.length ? nums1 : nums2;
  let shortArr = nums1.length > nums2.length ? nums2 : nums1;

  for (let i = 0; i < shortArr.length; i++) {
    let longIndex = longArr.indexOf(shortArr[i])
    if (longIndex != -1) {
      result.push(longArr.splice(longIndex, 1)[0])
    }
  }
  return result
};

intersect([1,2,1,2], [2,2,2]) // [2, 2, 2]
intersect([4,9,5], [9,4,9,8,4]) // [4, 9]
intersect([3,1,2], [2,2]) // [2]
```
### 13.sortArray
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = function (nums) {
  const { length } = nums;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
};
sortArray([1, 3, 9, 5, 2, 4, 6])
```
### 13.curry
```js
/* 
In this case, the curry function accepts a function fn as a parameter and returns a new function curried.
When the curried function is called, it checks whether the number of parameters passed in is greater than or equal to the number of parameters (arity) of the original function fn.
If so, it calls the original function directly; otherwise, it returns a new function that accepts the remaining parameters (rest) and merges the previously passed parameters (args) with the remaining parameters before calling the curried function. In this way, function currying is achieved.
*/

const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    } else {
      return function (...rest) {
        return curried.apply(this, args.concat(rest));
      };
    }
  };
}
const getURL = (protocol, domain, path) => {
  return protocol + "://" + domain + "/" + path;
}
const myurl = getURL('http', 'mysite', 'home.html');
const myurl2 = getURL('http', 'mysite', 'about.html');
console.log('myurl', myurl);
console.log('myurl2', myurl2);

const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    } else {
      return function (...rest) {
        return curried.apply(this, args.concat(rest));
      };
    }
  };
}
const getURL = (protocol, domain, path) => {
  return protocol + "://" + domain + "/" + path;
}
const myurl = getURL('http', 'mysite', 'home.html');
const myurl2 = getURL('http', 'mysite', 'about.html');
console.log('myurl', myurl);
console.log('myurl2', myurl2);

// Reduce repeated passing of unchanged parameters
const superGetURL = curry(getURL)('https', 'mysite');
const myurl3 = superGetURL('detail.html')

console.log('myurl3', myurl3);

```

### 13.Base Class
```js
var Person = function (name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.test = "this is a test";
Person.prototype.testFunc = function () {
  console.log('this is a testFunc');
}

var Student = function (name, age, gender, score) {
  Person.apply(this, [name, age]);// Stealing the constructor
  this.gender = gender;
  this.score = score;
}
Student.prototype = new Person(); // Change the prototype object of the Student constructor
Student.prototype.testStuFunc = function () {
  console.log('this is a testStuFunc');
}

// test
var zhangsan = new Student("张三", 18, "男", 100);
console.log(zhangsan.name); // 张三
console.log(zhangsan.age); // 18
console.log(zhangsan.gender); // 男
console.log(zhangsan.score); // 100
console.log(zhangsan.test); // this is a test
zhangsan.testFunc(); // this is a testFunc
zhangsan.testStuFunc(); // this is a testStuFunc

```

### 14.updating