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
 - 선택적 매개변수는 항상 undefined 가 유니언으로 선언되어있다.

 ```ts
    function sum(a: number, b: number): number {
        return a + b;
    }

    sum(10, 20); // 30
    sum(10, 20, 30); // error, too many parameters
    sum(10); // error, too few parameters

    // 선택적 매개변수
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
    // a 정수 , 나머지 매개변수 nums 배열
 ```
 
## 반환 타입

 - 반환 타입에 관해서 이해를 돕기위해 추가적인 설명
 - 함수의 return 값으로 반환하는 값에 대해서 타입을 선언하지 않을 경우 반환 가능한 모든 타입의 조합을 유추한다.

 ```ts
    // string 배열
    function singSongs(songs: string[]) {
        for (const song of songs) {
            console.log(`${song}`);
        }

        return songs.length;
    }
    // number 타입 유추

    function getSongAt(songs: string[], index: number) {
        return index < songs.length
        ? songs[index]
        : undefined;
    }
    // string | undefined
 ```

### 명시적 반환 타입

 - 명시적 반환 타입을 사용하는 이유
    - 타입스크립트는 재귀 함수의 반환 타입을 통해 타입 유추하는 것을 거부한다.
    - 가능한 반환값이 많은 함수가 동일한 타입의 값을 반환하도록 강제한다.
    - 수백 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입스크립트 타입 검사속도를 높일 수 있다.
 - 앞서 말한 것 처럼 ")" 뒤에 명시적 반환 타입을 선언해준다.

 ```ts
    function testFunc(name: string[], count = 0): number {
        return 1
    }

    // arrow function

    const testFunc = (name: string[], count=0): number => {
        return 1
    }

    // 반환 타입으로 할당할 수 없는 경우 할당 가능성 오류를 표시한다.

    function testFunc(name: string[], count: number): number | undefined {
        return "Hello"
        //     ~~~~~~~
        // Error : Type 'string' is not assignable to type 'number'
    }
 ```

### 함수 타입

 - 화살표 함수와 유사하지만 본문 대신 타입이 존재한다.

 ```ts
    // string을 반환하는 함수
    let nothingInGivesStrings: () => string;
    // string[] 매개변수와 ㅊount 선택적 매개변수 number 을 반환하는 함수
    let inputAndOutput: (songs: string[], count?: number) => number;
 ```

### void 반환 타입

 - void는 return 값이 존재하지 않는 함수에 사용된다

 ```ts
    function testFunc(song: string | undefined): void {
        return true;
        //~~~~~~~~~~
        // Error: Type 'boolean' is not assignable to type 'void';
    }
 ```

### never 반환 타입

 - never은 의도적으로 항상 오류를 발생시키거나 무한 루프를 실행하는 함수이다.

 ```ts
    function fail(message: string): never {
        throw new Error(`Invariant failure: ${message}`);
    }
 ```