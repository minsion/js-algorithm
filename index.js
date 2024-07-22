function printThisAndData(...data) {
  console.log(this.data, ...data);
}

const obj = { data: 0 };
const data = [1, 2, 3];

printThisAndData.call(obj, data);       // logs: 0 [1, 2, 3]
printThisAndData.call(obj, ...data); 