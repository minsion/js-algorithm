
// 12300 transform 12,300
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