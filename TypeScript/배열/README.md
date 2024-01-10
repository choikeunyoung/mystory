# 배열

 - JS의 배열은 유연하고 내부에 모든 타입의 값을 혼합해서 저장이 가능하다.
  
 ```js
    const elements = [true, null, undefined, 42, "Hello"]
 ```

 - 타입스크립트는 초기 배열에 담긴 요소를 통해 배열의 타입을 유추한다.

 ```ts
    const elements = ["Hello", "World"];
    elements.push("Hi") // Ok
    elements.push(true)
    //           ~~~~~~
    // Error: Argument of type 'boolean' is not assignable to parameter of type 'string'
 ```

 - 초기값들이 string 으로 저장됐기 때문에 string 타입을 허용하게된다.
 - 'true'는 boolean 속성이므로 에러가 발생한다.

## 배열 타입

 - 배열 타입의 선언은 [] 을 붙여서 선언한다.

 ```ts
    let arrayOfNum: number[];
    arrayOfNum = [4, 8, 15, 16]
 ```

 - 배열과 함수 타입의 혼합 사용

 ```ts
    // string 배열을 반환하는 함수
    let createString: () => string[];
    // 각각의 string 을 반환하는 함수 배열
    let stringCreators: (() => string)[]
 ```

 - 유니언 타입 배열

 ```ts
    // string 요소 혹은 number 배열을 반환
    let testFunc: string | number[];
    // string 과 number 요소를 가진 배열을 반환
    let testFunc: (string | number)[];
 ```

 - 다차원 배열 [][]로 표현
  
 ```ts
    let arrayOfNum: number[][];

    arrayOfNum = [
        [1, 2, 3],
        [2, 4, 6],
        [3, 6, 9],
    ];

    // 아래와 동일

    let arrayOfNum: (number[])[] 
 ```

 - 배열을 할당받은 멤버는 같은 타입을 가진다

 ```ts
    // (string | undefined)[] string 혹은 undefined로 구성된 배열
    const whatType = ["Hello", undefined]

    // string | undefined 타입
    const check = whatType[0]
 ```

 - 스프레드 배열

 ```ts
    // string[] 문자 배열 타입
    const soldiers = ["hello", "hi", "bye"]
    // number[] 숫자 배열 타입
    const ages = [10 ,90, 19]
    // (string | number)[] 숫자 혹은 문자 배열
    const conjoined = [...soldiers, ...ages];
 ```

# 튜플

 - 고정된 크기의 배열을 의미한다.
 - 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 좀더 구체적으로 명시한다.

 ```ts
    let testFunc: [number, string];
    testFunc = [530, "hello"] // Ok

    testFunc = [false, "Hi"]
    //
    // Error: Type 'boolean' is no assignable to type 'number'

    testFunc = [530];
    //~~~~~~~
    // Error: Type '[number]' is not assignable to type '[number, string]'
    // Source has 1 element(s) but target requires 2.
 ```

 - 여러 값을 할당할 경우 구조 분해 할당을 사용한다.

 ```ts
    let [year, warrior] = Math.random() > 0.5
    ?[340, "Hello"]
    :[1828, "Hi"];
 ```

 - 튜플은 가변 길이 배열보다 타입처리를 구체적으로 진행한다.

 ```ts
    // 타입 : (boolean | number)[]
    const pairLoose = [false, 123]

    const pairTupleLoose: [boolean, number] = pairLoose;
    // Error: Type '(number | boolean)[]' is not assignable to type '[boolean, number]'
    // Target requires 2 element(s) but source may have fewer.

    const check: [boolean, number, string] = [false, 111, "HellO"]

    const checkTwo: [boolean, number] = [check[0], check[1]];

    const checkTwo: [boolean, number] = check;
    //    ~~~~~~~~~
    // Error: Type '[boolean, number, string]' is not assignable to type '[boolean, number]'
    // Source hase 3 element(s) but target allows only 2
 ```

 - 튜플의 타입을 모르는 경우 다른 튜플의 타입에 할당해줄 수 없다.
 - 튜플에서 다른 튜플에 할당을 해줄 경우 튜플에 타입을 정확히 명시해둬야한다.
  
 ```ts
    function testFunc(name:string, value: number) {
        console.log("hellO")
    }
    const pairArray = ["Amage", 1]; // string 과 number 로 유추한다.

    testFunc(...pairArray)
    // Error : A spread argument must either have a tuple type or be passed to a rest parameter.

    const pairCorrectArray: [string, number] = ["Amage", 1];
    testFunc(...pairCorrectArray); // Ok

 ```

### const 어시션

 - 명시적 애너테이션 튜플 타입 입력의 경우 코드의 변경에 따라 작성 및 수정이 필요한 구문을 추가해야한다.
 - 이러한 상황을 방지하기 위해 const 어시션인 'as const'를 제공한다. (read-only)

 ```ts
    // 타입 : (string | number)[]
    const unionArray = [1157, "Tomoe"];

    // 타입 : readonly [1156, "Tomo"]
    const readonlyTuple = [1156, "Tomo"] as const;
 ```

 - 유연한 크기 배열을 고정된 크기의 튜플로 전환하는 것을 넘어서 해당 튜플이 읽기 전용이고 값 수정이 예상되는 곳에서 사용할 수 없다.

 ```ts
    // as const 관련 에러
    const check: [number, string] = [11, "test"];
    check[0] = 12312 // Ok

    const nextCheck: [number, string] = [1123, "tomo"] as const;
    //    ~~~~~~~~~~
    // Error: The type 'readonly [1123, "tomo"] is readonly
    // cannot be assigned to the mutable type [number, string]

    const pairConst = [1123, "tomo"] as const;
    pairConst[0] = 12314
    // Error: cannot assign to '0' because it is a read-only property.
 ```