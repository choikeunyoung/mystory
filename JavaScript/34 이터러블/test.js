const arr = [1, 2, 3];
// arr 가 이터러블 프로토콜을 가진 객체
const iter = arr[Symbol.iterator]();

console.log(iter)