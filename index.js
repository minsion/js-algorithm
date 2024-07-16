
// testing
/* 
案例中，curry函数接受一个函数fn作为参数，返回一个新的函数curried。
curried函数在调用时会检查传入的参数数量是否大于或等于原始函数fn的参数数量（arity），
如果是，则直接调用原始函数；否则，返回一个新的函数，该函数接受剩余的参数（rest），
并将之前传入的参数（args）与剩余参数合并后调用curried函数。通过这种方式，实现函数柯里化。
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

// Reduce repeated passing of unchanged parameters
const superGetURL = curry(getURL)('https', 'mysite');
const myurl3 = superGetURL('detail.html')

console.log('myurl3', myurl3);

const arr = new Array();





