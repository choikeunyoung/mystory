# 타입

 - 데이터가 메모리에 어떻게 저장되고, 프로그램에서 어떻게 처리되어야 하는지를 명시적으로 알려주는 역할
 - 자바스크립트에서 다루는 값의 형태를 의미
 - 속성과 메서드, typeof 연산자가 설명하는 것을 의미

## 타입 시스템

 - 프로그래밍 언어가 가질 수 있는 타입을 이해하는 방법에 대한 규칙

 1. 코드를 읽고 존재하는 모든 타입과 값을 이해
 2. 각 값이 초기 선언에서 가질 수 있는 타입을 확인
 3. 각 값이 코드에서 어떻게 사용될 수 있는지 모든 방법을 확인
 4. 값의 사용법이 타입과 일치하지 않으면 사용자에게 오류 표시

 ```ts
    let firstName = "Whiteney";
    firstName.length();
    //        ~~~~~~~
    // Error: This expression is not callable.
    // Type 'Number' has no call signatures
 ```

 다음 순서로 오류를 표시
 1. 코드를 읽고 firstName이라는 변수를 이해
 2. 초기값이 "Whitney"이므로 firstName이 string 타입이라고 결론
 3. firstName의 .length 멤버를 함수처럼 호출하는 코드를 확인
 4. string의 .length 멤버는 함수가 아닌 숫자라는 오류를 표시 => 함수처럼 호출이 불가능

## 오류 종류

 - 구문 오류 : 타입스크립트가 자바스크립트로 변환되는 것을 차단
 - 타입 오류 : 타입 검사기에 따라 일치하지 않는 것을 감지

### 구문 오류

 - 타입스크립트가 코드로 이해할 수 없는 잘못된 구문을 감지한 경우
 - 타입스크립트 파일에서 자바스크립트 파일을 올바르게 생성할 수 없도록 차단함

 ```ts
    let let test;
    //      ~~~~
    // Error: ',' expected.
 ```

 - "let"을 변수로 인식해서 변수와 변수 사이에 ','가 누락됐다고 알려준다.
 - 아래와 같은 컴파일된 자바스크립트 결과를 보여준다

 ```js
    let let, test
 ```

### 타입 오류

 - 타입 검사기가 프로그램의 타입에서 오류를 감지한 경우
 - 타입스크립트 구문을 자바스크립트로 변환하는 것을 차단하지는 않는다.
 - 코드가 실행될 경우 충돌하거나 예기치 않게 작동할 수 있음을 나타냄

 ```ts
    console.blub("Nothing is worth more than laughter.")
    //      ~~~~
    // Error : Property 'blub' does not exist on type 'Console'.
 ```

## 할당 가능성

 - 초기 값을 읽고 변수가 허용되는 타입을 결정
 - 해당 변수에 새로운 값이 할당되면 새롭게 할당된 값의 타입이 변수 타입과 동일한지 확인

 ```ts
    let name = "KY"
    name = "YKK"

    let yourName = "Minsoo"
    yourName = true
    //~~~~~~
    // Error : Type 'boolean' is not assignaable to type 'string'.
 ```

 - Type ... is not assignable to type .... 형태의 오류는 가장 일반적인 오류이다.
 - 변수에 할당하려고 시도하는 값이 잘못됐다는 의미로 알아두면 좋다.

## 타입 애너테이션

 - 변수의 초기값이 없는경우 암묵적인 any 타입으로 간주
 - 초기 타입을 유추할 수 없는 경우 새로운 값이 할당될 때마다 변수 타입을 갱신함

 ```ts
    let name; // any 타입
    name = "Joan Jett"; // string 타입
    name.toUpperCase() // Ok

    name = 19.58; // Number 타입
    name.toPrecision(1): // Ok

    name.toUpperCase();
    //~~~~~
    // Error : 'toUpperCase' does not exist on type 'number'
 ```

 - 타입 스크립트의 목적은 타입의 검사를 위한 것이므로 any 타입의 경우 이러한 기능을 부분적 쓸모없게함
 - 이러한 상황을 방지하기 위해 미리 변수의 타입을 선언할 수 있도록 '타입 애너테이션'을 사용하여 방지한다.

 ```ts
    let name: string;
    name = "Joan Jett";

    name = 19.58;
    //~~~
    // Error : Type 'number' is not assignable to type 'string'.
 ```

### 타입 애너테이션이 불필요한 경우

 ```ts
    let name: string = "Tina";
 ```

 - 초기값이 있는 변수에서 타입스크립트는 타입을 유추할 수 있으므로 따로 애너테이션을 선언하는 것은 불필요하다.
 - 초기값이 있는 변수에 애너테이션을 추가하는 경우 그 값의 타입이 일치하는지 확인할 수 있다.