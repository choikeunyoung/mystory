# 함수

 - 함수의 파라미터(매개변수) 타입
 - 함수의 반환 타입
 - 함수의 구조 타입

## 기본적 타입 선언

 ```js
    function sum(a, b) {
        return a + b
    }
 ```
 ```ts
    function sum(a: number, b: number): number {
        return a + b
    }
 ```

 - 기존의 자바스크립트 함수의 선언 방식에서 매개변수와 함수의 반환 값에 타입을 추가한 것이 아래 함수이다.
 - 매개변수에 각각 타입을 선언해준 후 ')' 뒤에 리턴값으로 돌아올 변수를 선언해주는 방식으로 구현된다.

## 함수의 인자

 - js 에서는 함수의 인자가 적은경우 많은경우 모두 실행이된다.
 - 초과하는 인자의 경우 무시한 채로 실행이되며 부족한 경우는 undefined를 반환해준다.
 - 타입스크립트에서는 기존의 함수 인자는 모두 필수값으로 받아들인다.
 - 선택적 매개변수를 선언하고 싶은경우는 ?를 앞에 붙여서 선언해주면 타입에러를 발생시키지 않는다.

 ```ts
    function sum(a: number, b: number): number {
        return a + b;
    }

    sum(10, 20); // 30
    sum(10, 20, 30); // error, too many parameters
    sum(10); // error, too few parameters

    function sum(a: number, b?: number): number {
        return a + b;
    }

    sum(10, 20) // 30
    sum(10, 20, 30) // error, too many parameters
    sum(10); // 타입 에러 없음

    function sum(a: number, b = '100'): number {
        return a + b;
    }

    sum(10, undefined) // 30
    sum(10, 20, 30) // error, too many parameters
    sum(10); // 110

    function sum(a: number, ...nums: number[]): number {
    const totalOfNums = 0;
    for (let key in nums) {
      totalOfNums += nums[key];
    }
    return a + totalOfNums;
    }
    // a 정수 , nums 배열
 ```