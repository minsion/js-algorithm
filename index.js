
//1.Define a function to convert 12378900 to 12,378,900
function thousandSeparator(number) {
  let result = [];
  let rest = String(number);
  while (rest.length) {
    result.unshift(rest.slice(-3));
    rest = rest.slice(0, -3);
  }
  const tempRes = result.join(",");
  return tempRes
}
console.log('thousandSeparator：', thousandSeparator(12378900)) // 12,378,900

// 2.myReduce
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

// 3.继承
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
const a = new Person('li', 'lei')
const b = Person('li', 'lei')
console.log(a, b, a.__proto__ === Person.prototype)

// 4. call, apply, bind
function P(age, country) {
  console.log(`Hello, my name is ${this.name} and I am ${age}, I am from ${country}`);
}
 /* 
 
 1.call 函数允许你在一个特定的上下文中调用一个函数
 function.call(context, arg1, arg2, ...)
 
 2.apply 函数与 call 函数类似，它也允许你在一个特定的上下文中调用一个函数。不同之处在于，apply 函数需要将参数作为数组传递
 function.apply(context, [argsArray])

 1.bind 函数与 call 和 apply 函数不同，它不会立即调用函数。相反，它返回一个新函数，该函数将绑定到指定的上下文，
 当该函数被调用时，它将以指定的上下文运行。
 function.bind(thisArg, arg1, arg2, ...)
 */
P.call({name: 'mary'}, '12', 'USA')
P.apply({name: 'lilei'}, ['13', 'France'])
P.bind({name: 'tom'}, '11', 'China')

// 5.自定义 call, apply, bind
// 实现 call 方法
Function.prototype.myCall = function (context, ...args) {
  // 如果 context 参数为空，则默认为 window 对象
  context = context || window;
  // 使用 Symbol 函数创建一个唯一的标识符
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

// 实现 apply 方法
Function.prototype.myApply = function (context, args) {
  // 如果 context 参数为空，则默认为 window 对象
  context = context || window;
  // 使用 Symbol 函数创建一个唯一的标识符
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
  // 将 this 存储在 fn 变量中
  const fn = this;
  // 返回一个新的函数，该函数将传入的参数与新函数的参数合并，并在新的上下文中使用 apply 调用原始函数
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};
P.myCall({name: 'mary'}, '12', 'USA')
P.myApply({name: 'lilei'}, ['13', 'France'])
P.myBind({name: 'tom'}, '11', 'China')


// 6.检查是否是类的对象实例
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

// 7.数组原型对象的最后一个元素
Array.prototype.last = function() {
  const len = this.length
  return len ? this[len - 1] : -1
}
console.log([1, 2, 3].last()); // 3
console.log([].last()); // -1

// 8.计数器
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
  return function() {
      return n++
  };
};

/** 
* const counter = createCounter(10)
* counter() // 10
* counter() // 11
* counter() // 12
*/


// 9.睡眠函数 请你编写一个异步函数，它接收一个正整数参数 millis ，并休眠 millis 毫秒。要求此函数可以解析任何值。

/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise((resolve, reject) => {
      setTimeout(resolve, millis)
  })
}

/** 
* let t = Date.now()
* sleep(100).then(() => console.log(Date.now() - t)) // 100
*/

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
var flat = function (arr, n) {
  if (n === 0) {
    return arr
  }
  const res = flat(arr, n - 1);
  return [].concat(...res);
};
console.log('flat', [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]].flat(2))
console.log('myFlat', [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]].myFlat(2))

Number.prototype.add = function(n) {
  return this + n
}
Number.prototype.sub = function(n) {
  return this - n
}

console.log('(5).add(3).sub(2)',(5).add(3).sub(2)) // 6


const myAdd = (min, max) => {
  let sum = 0
  for (let i = min; i <= max; i++) {
    sum = sum + i
  }
  return sum
}

console.log('myAdd', myAdd(1, 100))

function intersect(nums1, nums2) {
  let i = j = 0,
      len1 = nums1.length,
      len2 = nums2.length,
      newArr = [];
  if (len1 === 0 || len2 === 0) {
      return newArr;
  }
  nums1.sort(function (a, b) {
      return a - b;
  });
  nums2.sort(function (a, b) {
      return a - b;
  });
  while (i < len1 || j < len2) {
      if (nums1[i] > nums2[j]) {
          j++;
      } else if (nums1[i] < nums2[j]) {
          i++;
      } else {
          if (nums1[i] === nums2[j]) {
              newArr.push(nums1[i]);
          }
          if (i < len1 - 1) {
              i++;
          } else {
              break;
          }
          if (j < len2 - 1) {
              j++;
          } else {
              break;
          }
      }
  }
  return newArr;
};

const set_intersection = (set1, set2) => {
  if (set1.size > set2.size) {
    return set_intersection(set2, set1);
  }
  const intersection = new Set();
  for (const num of set1) {
    if (set2.has(num)) {
      intersection.add(num);
    }
  }
  return [...intersection];
}

var intersection = function(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  return set_intersection(set1, set2);
};

// 测试
console.log('intersect',intersect([3, 5, 8, 1], [2, 3]));
console.log('intersection',intersection([2, 3], [3, 5, 8, 1]));

const unique = (arr) => {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    if(!result[arr[i]]){
      result[arr[i]] = arr[i]
    }
  }
  return Object.values(result)
}
console.log('unique', unique([1, '2', 3, 4, 3, '2']))

// foo(typeof a)
// function foo(p) {
// 	console.log(this);
// 	console.log(p);
// 	console.log(typeof b);
// 	let b = 0;
// }

class Foo {
	constructor(arr) { 
		this.arr = arr; 
	}
	bar(n) {
		return this.arr.slice(0, n);
	}
}
var f = new Foo([0, 1, 2, 3]);
console.log(f.bar(1)); // [1]
console.log(f.bar(2).splice(1, 1)); //[0, 1]
console.log(f.arr); // [0, 1, 2, 3]

// function f(count) {
// 	console.log(`foo${count}`);
// 	setTimeout(() => { console.log(`bar${count}`); });
// }
// f(1);
// f(2);
// setTimeout(() => { f(3); });
// // foo1 foo2 bar1 bar2 foo3 bar3

// 基类
var Person = function (name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.test = "this is a test";
Person.prototype.testFunc = function () {
  console.log('this is a testFunc');
}

// 子类
var Student = function (name, age, gender, score) {
  Person.apply(this, [name, age]); // 盗用构造函数
  this.gender = gender;
  this.score = score;
}
Student.prototype = new Person(); // 改变 Student 构造函数的原型对象
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