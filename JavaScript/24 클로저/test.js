var foo = function () {
  this.name = "test";
};

console.log(foo.name); // "test" (일반 호출은 전역 객체에 속성을 추가)
console.log(foo); // undefined

var instance = new foo();
