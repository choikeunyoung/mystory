# JavaScript
  - HTML => 웹사이트의 뼈대
  - ECMAScript => 웹사이트의 동작을 조작
  - Script Language => 프로그래밍이 실행되는 runtime 코드가 해석되고 실행된다.

  - 자료형(Data Type)
    - JS에서는 변수를 선언할 떄가 아닌 데이터에 삽입될 시점에서 자료형을 결정함 (Dynamic Typing)
    - var: 변수를 마음대로 조작이 가능함
    - let: 변수를 조작할수는 있지만 Type은 변경하지 못함
    - 배열: 문자, 숫자의 집합을 의미함 여러 자료형이 섞일 수 있음. (숫자랑 문자 복합)
    - console.log를 통하여 홈페이지의 F12 개발자 도구 console 창에 결과를 띄울 수 있다.

  1. 연산자
   - 대입 연산자(Assignment operator)
     - 대입 연산자는 항상 오른쪽에서 왼쪽 방향으로 흐름이 흘러감
```javascript
    let a = 10;
    let b = 10;
    console.log(a)
    // 10
```
   - 산술 연산자(Artihmetic operators)
     - 더하기(+)
     - 빼기(-)
     - 곱하기(*)
     - 나누기(/)
     - 나머지(%)
     - 제곱(**)
```javascript
let a = 2;
let b = 4;
console.log(a+b);
// 6
console.log(a-b);
// -2
console.log(a*b);
// 8
console.log(a%b);
// 0.5
console.log(a/b); 
// 2
console.log(a**b);
// 16
```
   - 증가연산자(++)
   - 감소연산자(--)
   - postfix 방식: a++
    - 변수의 값을 계산 후 증가
   - prefix 방식: ++a
    - 변수의 값을 증가 후 계산
```javascript
let a = 1;
let b = a++;
console.log(a ,b);
// 2, 1
let c = 1;
let d = ++c;
console.log(c, d);
// 2, 2
```
   - 관계 연산자(Relational operators)
     - 변수들 사이에 관계를 비교하기 위해 사용

   - 비교 연산자(Comparison operators) => 왼쪽을 기준으로 생각하면 편함
     - 변수들의 값을 비교하기 위해 사용
     - a < b a가 b보다 작다
     - a > b a가 b보다 크다
     - a <= b a가 b보다 작거나 같다
     - a >= b a가 b보다 크거나 같다

   - 동등 연산자(Equality operators)
     - a == b a가 b랑 같다
     - a != b a가 b와 같지 않다.

   - 일치 연산자(Strict equality operators)
     - a === b a가 b와 값과 자료형이 모두 같다
     - a !== b a가 b와 값이나 자료형이 같지 않다

   - 이진 논리 연산자(Binary logical operators)
     - a && b a와 b가 모두 true일 경우에만 true
     - a || b a또는 b가 true일 경우에만 true

   - 조건부 연산자(Conditional operator)
     - 삼항 연산자(Ternary operator)
       - 조건식 ? true일 경우: false일 경우
```javascript
let a = true;
let b = false;
console.log(a ? 1 : 2);
// 1
console.log(b ? 1 : 2);
// 2
```
  
  2. 함수
   - 파라미터(parameters)
   - 인자(arguments)
```javascript
// function statement 사용
function sum(a, b) {
    return a + b;
}
console.log(sum(10, 20));
// 30

// arrow function expression 사용
const multiply = (a,b) => {
    return a * b;
}
console.log(multiply(10, 20));
// 200
```
