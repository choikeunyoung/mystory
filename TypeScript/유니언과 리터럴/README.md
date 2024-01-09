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
   - typeof 검사를 통한 내로잉

### 값 할당을 통한 내로잉
 
 - 변수에 직접 값을 할당하여 할당된 타입으로 좁히는 경우
 - 유니언 타입에 애너테이션이 명시되고 초기값이 주어지면 내로잉이 작동한다.

 ```ts
    let admin: number | string

    admin = "Grace Hopper";

    admin.toUpperCase(); //Ok

    admin.toFixed();
    //    ~~~~~~~~~
    // Error : Property 'toFixed' does not exist on type 'string'

    let inventor: number | string = "Hedy Lamarr";
    inventor.toUpperCase() // OK

    inventor.toFixed()
    //    ~~~~~~~~~
    // Error : Property 'toFixed' does not exist on type 'string'
 ```

### 조건 검사를 통한 내로잉

 - if 문을 사용하여 좁히는 방법

 ```ts
   let scientist = Math.random() > 0.5
   ? "Rosalind Franklin"
   : 51;

   if (scientist === "Rosalind Franklin") {
      scientist.toUpperCase(); // OK
   }

   scientist.toUpperCase();
   //        ~~~~~~~~~~~~~~
   // Error: Property 'toUpperCase' does not exist on type 'string | number'
   // Property 'toUpperCase' does not exist on type 'number'
 ```

### typeof 검사를 통한 내로잉

 - typeof 연산자를 사용할 수 있다.
 - if 문을 통해 typeof를 사용하여 타입이 같은지 확인을 진행한다.

## 리터럴 타입

 - 구체적인 버전의 원시타입이다.

 ```ts
   const myName = "Minsoo"
 ```

 - string 타입이라고 말할 수 있지만 'Minsoo"라는 특별한 값이라고 말한다.
 - 원시 타입은 해당 타입이 가질 수 있는 가능한 모든 리터럴 값의 전체 조합이다.
 - 원시 타입에는 다양한 리터럴 타입이 존재한다.
   - boolean: true | false
   - null 과 undefined: 둘 다 자기 자신, 즉, 오직 하나의 리터럴 값만 가짐
   - number: 0 | 1 | 2 ... | 0.1 | 0.2 | ...
   - string: "" | "a" | "b" | "c" | ...
 - 유니언 타입 애너테이션을 리터럴과 원시타입을 섞어서 사용이 가능하다.

 ```ts
   let lifespan: number | "ongoing" | "uncertain";
   lifespan = 89; // OK
   lifespan = "ongoing"; // OK
   lifespan = true;
   //~~~~~~
   // Error: Type 'true' is not assignable to type 'number | "ongoing" | "uncertain"'
 ```

### 리터럴 할당 가능성
 
 - 리터럴로 선언된 변수는 같은 리터럴 타입으로는 선언이 되지만 다른 값으로는 할당이 불가능하다.

 ```ts
   let special = "Aaa"
   special = "Aaa"; // OK
   special = "Hello";
   //~~~~~
   // Error: Type '"Hello"' is not assignable to type '"Aaa"'
   
   let space = "" // string
   special = space;
   //~~~~~
   // Error: Type 'string' is not assignable to type '"Aaa"'
 ```

### 엄격한 null 검사

 - 리터럴로 좁혀진 유니언은 엄격한 null 검사라고 불리며 잠재적으로 정의되지 않은 undefined를 방지한다.
 - 'strictNullChecks'라는 옵션을 비활성화 할 경우 모든 타입에 | null | undefined 를 추가해야 할당이 가능하다.

 ```ts
   let name = Math.random() > 0.5
   ? "Tony Hoare"
   : undefined;

   name.toLowerCase()
   // Potential runtime error: Cannot read property 'toLowerCase' of undefined.

   // 엄격한 null 검사가 활성화

   let name = Math.random() > 0.5
   ? "Tony Hoare"
   : undefined;

   name.toLowerCase()
   //~~
   // Error: Object is possibly 'undefined'
 ```

## 타입 별칭

 - 유니언 타입의 경우 두세 개의 요소만 갖고있다.
 - 반복하여 긴 형태의 유니언이 나타날 경우 별칭으로 대체가 가능하다.
  
 ```ts
   let test1: boolean | number | string | null | undefined;
   let test2: boolean | number | string | null | undefined;
   let test3: boolean | number | string | null | undefined;
   // 중복되는 유니언 타입이 존재한다

   let total: boolean | number | string | null;

   let test1: total;
   let test2: total;
   let test3: total;
   // 위와 같이 치환이 가능하다.

   let test4: total | undefined;
   // 타입 별칭과 결합도 가능하다.
 ```

 - 타입 별칭의 경우 타입스크립트에만 있으며 '개발 시'에만 존재한다.