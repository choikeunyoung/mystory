# 유니언과 리터럴

 - 유니언 : 값에 허용된 타입을 두개 이상의 가능한 타입으로 확장하는 것
 - 내로잉 : 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

## 유니언 타입

 ```ts
    let mathRand = Math.random() > 0.5
    ? undefined
    : "Mark Golberg"
 ```

 - 'mathRand' 는 undefined 혹은 String 을 가지게 된다.
 - 이처럼 이거 혹은 저거의 타입을 가지는 것을 유니언 타입이라 의미하며 | (수직선) 을 사용하여 표기한다.

 ```ts
    let test: string | null = null;
    // test 는 string 혹은 null 을 가지며 초기값으로는 null이 들어감
    if (Math.random() > 0.5) {
        test = "Susanne Langer" // OK
    }
 ```

 - 위와같이 string 혹은 null을 받으며 초기값으로 null이 들어간다.
 - 아래 조건에 따라서 test 에 String이 들어갈 수 있다.

### 유니언 속성

 - 유니언으로 선언한 모든 가능한 타입에 존재하는 속성에 관해서만 접근이 가능하다

 ```ts
    let numList = Math.random() > 0.5
    ? "Marie Curie"
    : 84;

    numList.toString(); // Ok

    numList.toUpperCase();
    //      ~~~~~~~~~~~~~
    // Error : Property 'toUpperCase' does not exist on type 'string | number'
    // Property 'toUpperCase' does not exist on type 'number'

    numList.toFixed();
    //      ~~~~~~~~~
    // Error : Property 'toFixed' does not exist on type 'string | number'
    // Property 'toFixed' does not exist on type 'string'
 ```

 - 위와 같이 numList 는 string or number 를 가지게 되며 둘다 가지고 있는 속성이 아닌 경우 오류가 발생한다.

## 내로잉

 - 선언 혹은 이전에 타입스크립트에서 유추한 값보다 더 구체적인 타입임을 코드에서 유추하는 것이다.
 - 타입을 좁히는 데 사용할 수 있는 논리적 검사를 타입 가드라고 한다.
 - 타입 가드
   - 값 할당을 통한 내로잉
   - 조건 검사를 통한 내로잉

### 값 할당을 통한 내로잉
 
 - 변수에 직접 값을 할당하여 할당된 타입으로 좁히는 경우

 ```ts
    let admin: number | string

    admin = "Grace Hopper";

    admin.toUpperCase(); //Ok

    admin.toFixed();
    //    ~~~~~~~~~
    // Error : Property 'toFixed' does not exist on type 'string'
 ```