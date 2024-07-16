## js-algorithm
持续更新常见JavaScript算法

### 1.定义一个函数，将 12378900 转换为 12,378,900

```js
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

1. call 函数允许你在特定上下文中调用函数
function.call(context, arg1, arg2, ...)

2. apply 函数与 call 函数类似，也允许你在特定上下文中调用函数。不同之处在于 apply 函数需要以数组形式传递参数
function.apply(context, [argsArray])

1. bind 函数与 call 和 apply 函数不同。它不会立即调用函数。而是返回一个将绑定到指定上下文的新函数，
当调用该函数时，它将以指定的上下文运行。
function.bind(thisArg, arg1, arg2, ...)
*/
P.call({name: 'mary'}, '12', 'USA')
P.apply({name: 'lilei'}, ['13', 'France'])
P.bind({name: 'tom'}, '11', 'China')

// 5. 自定义call、apply、bind
// 实现call方法
Function.prototype.myCall = function (context, ...args) {
  // 如果context参数为空，则默认为window对象
  context = context || window;
  // 使用Symbol函数创建唯一标识符
  const fnSymbol = Symbol();
  // 将原始函数存储为context对象的属性
  context[fnSymbol] = this;
  // 调用函数并将结果存储在 result 变量中
  const result = context[fnSymbol](...args);
  // 删除 context 对象的属性
  delete context[fnSymbol];
  // 返回函数的结果
  return result;
};

// 实现 apply 方法
Function.prototype.myApply = function (context, args) {
  // 如果 context 参数为空，则默认为 window 对象
  context = context || window;
  // 使用 Symbol 函数创建唯一标识符
  const fnSymbol = Symbol();
  // 将原始函数存储为 context 对象的属性
  context[fnSymbol] = this;
  // 调用函数并将结果存储在 result 变量中
  const result = context[fnSymbol](...args);
  // 删除 context 对象的属性
  delete context[fnSymbol];
  // 返回函数的结果
  return result;
};

// 实现 bind 方法
Function.prototype.myBind = function (context, ...args) {
  // 将 this 绑定到 fn 变量中
  const fn = this;
  // 返回一个新函数，该函数将传递的参数与新函数的参数合并，并在新上下文中使用 apply 调用原始函数
  return function (...newArgs) {
  return fn.apply(context, [...args, ...newArgs]);
  };
};
P.myCall({name: 'mary'}, '12', 'USA')
P.myApply({name: 'lilei'}, ['13', 'France'])
P.myBind({name: 'tom'}, '11', 'China')
```

### 5.检查是否是类的对象实例
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

### 8.休眠函数编写一个异步函数，该函数接受正整数参数 millis 并休眠 millis 毫秒。此函数需要能够解释任何值。
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
### 10.add and sub 方法
```js
Number.prototype.add = function(n) {
  return this + n
}
Number.prototype.sub = function(n) {
  return this - n
}

console.log('(5).add(3).sub(2)',(5).add(3).sub(2)) // 6
```

### 11.sum 方法
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
### 12.继承
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
### 13.数组排序
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
### 13.柯里化
```js
/* 
在这种情况下，curry 函数接受一个函数 fn 作为参数，并返回一个经过 currying 的新函数。
在调用 curryed 函数时，它会检查传入的参数数量是否大于或等于原函数 fn 的参数数量（arity）。
如果是，则直接调用原函数；否则，它会返回一个接受剩余参数（rest）的新函数，并将之前传入的参数（args）与剩余参数合并，然后再调用 curryed 函数。这样就实现了函数 currying。
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

// 减少重复传递不变的参数
const superGetURL = curry(getURL)('https', 'mysite');
const myurl3 = superGetURL('detail.html')

console.log('myurl3', myurl3);

```

### 13.继承
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

// 测试
var zhangsan = new Student("张三", 18, "男", 100);
console.log(zhangsan.name); // 张三
console.log(zhangsan.age); // 18
console.log(zhangsan.gender); // 男
console.log(zhangsan.score); // 100
console.log(zhangsan.test); // this is a test
zhangsan.testFunc(); // this is a testFunc
zhangsan.testStuFunc(); // this is a testStuFunc

```

### 14.更新...