
// 12300 transform 12,300
function thousandSeparator(number) {
  let result = [];
  let rest = String(Math.abs(number));
  while (rest.length) {
    result.push(rest.slice(-3));
    rest = rest.slice(0, -3);
  }
  const r = result.reverse().join(",");
  const tempRes = number < 0 ? "-" + r : r
  console.log('thousandSeparator：', tempRes)
  return tempRes
}
thousandSeparator(12300)

Array.prototype.myReduce = function (callback, initialValue) {
  let arr = this;
  let pre = initialValue == undefined ? arr[0] : initialValue
  let i = initialValue == undefined ? 1 : 0;
  for (i; i < arr.length; i++) {
    pre = callback(pre, arr[i], i, arr);
  }
  return pre;
}
const res = [1, 2, 3, 4, 4].myReduce((pre, cur, index) => {
  return pre + cur;
}, 1);
console.log('myReduce', res);

function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
const a = new Person('li', 'lei')
const b = Person('li', 'lei')
console.log(a, b, a.__proto__ === Person.prototype)



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
