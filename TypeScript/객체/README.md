# 객체

 - ... sperad 구문을 사용하면 새로운 객체 타입 또는 형태를 만든다.
 - 기존의 객체와 동일한 속성명과 원시 타입을 갖게된다.

 ```ts
    const poet = {
        born: 1999,
        name: "Hello"
    };

    poet['bonr'] // type: number
    poet.name; // type: string

    poet.end;
    //   ~~~
    // Error: Property 'end' does not exist on type `{born: number; name: string; }`
 ```

 - 객체 타입 선언

 ```ts
    let school: {
        born: number;
        name: string;
    };

    // Ok
    school = {
        born: 1999,
        name: "Oliver"
    };

    school = "맘아프다";
    //~~~~
    // Error: Type 'string' is not assignable to type '{ born: number; name: string; }'
 ```

 - 별칭 객체 타입

 ```ts
    let school: {
        born: number;
        name: string;
    };

    let subject = school
    // Ok
    subject = {
        born: 1999,
        name: "Oliver"
    };

    subject = "맘아프다";
    //~~~~
    // Error: Type 'string' is not assignable to 'school'.
 ```

## 구조적 타이핑

 - 타입을 충족하는모든 값을 해당 타입의 값으로 사용한다.
 - 특정 타입으로 선언되면 어떤 객체를 사용하든 해당 속성이 있어야한다.
  
 ```ts
    type WithFirstName = {
        firstName: string;
    };

    type WithLastName = {
        lastName: string;
    };

    const hasBoth = {
        firstName: "Lucile",
        lastName: "Clifton",
    };

    let withFirstName: WithFirstName = hasBoth;
    let withLastName: WithLastName = hasBoth;
 ```

 - 위의 구문에서 hasBoth는 firstName, lastName 을 둘다 가지고 있으며 각각 string 으로 암묵적으로 인식하고있다.
 - "WithFirstName", "WithLastName" 둘다 각각 firstName, lastName 을 가지고 있기 떄문에 hasBoth를 가질 수 있다.
 - 자바스크립트는 덕타입, 타입스크립트는 구조적 타입화로 이루어진다.
   - 덕타입 : 런타임에서 사용될 때까지 객체 타입을 검사하지 않는다.
   - 구조적 타입화 : 정적 시스템이 타입을 검사하는 경우이다.

### 사용 검사

 ```ts
    type FirstAndLastNames = {
        first: string;
        last: string;
    };

    const hasBoth: FirstAndLastNames = {
        first: "Sarojini",
        last: "Naidu",
    };

    const hasOnlyOne: FirstAndLastNames = {
        //~~~~~~~~
        // Error: Property 'last' is missing in type '{ first: string }'
        // but required in type 'FirstAndLastNames'
        first: "Sappho"
    };
 ```

 - 객체 타입으로 애너테이션된 위치에 값을 제공할 때 객체 타입에 할당할 수 있는지확인한다.
 - 객체 타입의 필수 속성이 있어야 한다.
 - 필수 속성 이름과 해당 속성이 예상되는 타입을 모두 지정한다.
 - 객체 속성이 일치하지 않으면 오류를 발생시킨다.
 - 'last' 속성이 객체에 있지만 "hasOnlyOne" 에는 존재하지 않기 때문에 오류가 발생한다.

### 초과 속성 검사

 - 초기값에 객체 타입에 정의된 것보다 많은 필드가 있으면 타입 스크립트에서 오류가 발생한다.
 - 기존의 2개의 속성에 관해서 타입이 선언 되었다면 2개의 속성에 관해서만 검사가 가능하다.
 - 3개의 속성이 존재할 경우 오류가 발생한다.

 ```ts
    const Poet = {
        born: number;
        name: string;
    }

    const extraProperty: Poet = {
        activity: "walking",
        //~~~~~~~~~~~~~~~~~~
        // Error: Type '{ activity: string; born: number; name: string; }'
        // is not assignable to type 'Poet'
        // Object literal may only specify known properties,
        // and 'activity' does not exist in type 'Poet'
        born: 1111;
        name: "Mary"
    };
 ```

 - 객체 타입으로 선언된 위치에서 생성도는 리터럴에 대해서만 발생한다.
 
 ```ts
    const existingObject = {
        activity: "walking",
        born: 1935,
        name: "Mary",
    };

    const existingObjectOk: Poet = existingObject; // Ok
 ```

### 중첩된 객체 타입

 ```ts
    type Author = {
        firstName: string;
        lastName: string;
    };

    type Poem = {
        author: Author;
        name: string;
    };

    // Ok

    const poemMatch: Poem = {
        author: {
            first: "Sylvia",
            last: "Plath",
        },
        name: "Lady"
    };

    const check: Poem = {
        author: {
            name: "Sylvia Plath"
            // Error: Type '{ name: string; }' is not assignable
            // to type '{ firstName: string; lastName: string; }'
        },
        name: "Tulips"
    }
 ```

 - author 가 name 이라는 속성이 없기 때문에 발생하는 오류이다.

### 선택적 속성

 - 애너테이션에서 : 앞에 ? 를 추가하면 선택적 속성임을 나타낸다.
 - ? 속성을 사용하는 경우와 undefined를 포함하는 유니언 타입의 속성 사이에는 차이가 있다.
 - 필수로 선언된 undefined 는 undefined가 존재해야 하지만 선택적 속성인 ? 는 존재하지 않아도 상관없다.

 ```ts
    type Writers = {
        author: string | undefined;
        editor?: string;
    };

    const required: Writers = {
        author: undefined,
    }

    const check: Writers = {};
    //    ~~~~~
    // Error: Property 'author' is missing in type '{}' but required in type 'Writers'
 ```

### 객체 타입 유니언

 ```ts
    type PoemWithPages = {
        name: string;
        pages: number;
    };

    type PoemWithRhymes = {
        name: string;
        rhymes: boolean;
    };

    type Poem = PoemWithPages | PoemWithRhymes;

    const poem: Poem = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true }
 ```

 - 객체의 유니언은 위와 같은 구조로 선언이 가능하다.
 - 객체에 존재하지 않는 속성에 대한 접근을 요청시 오류가 발생한다.
  
### 교차 타입 유니언

 ```ts
    type Artwork = {
        genre: string;
        name: string;
    };

    type Writing = {
        pages: number;
        name: string;
    };

    type WrittenArt = Artwork & Writing;
    // 다음과 같음
    // {
    //  genre: string;
    //  name: string;
    //  pages: numbers;
    // }
 ```

 - 교차 타입의 경우 두 객체의 타입을 합쳐주는 역할을 한다.