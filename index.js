
// 12300 transform 12,300
function thousandSeparator(number) {
  let result = [];
  let rest = String(Math.abs(number));
  console.log(111, rest)
  while (rest.length) {
    result.push(rest.slice(-3));
    console.log(222, result)
    rest = rest.slice(0, -3);
    console.log(333, rest)
  }
  const r = result.reverse().join(",");
  console.log(555, r)
  const tempRes = number < 0 ? "-" + r : r
  console.log(666, tempRes)
  return tempRes
}
thousandSeparator(12300)