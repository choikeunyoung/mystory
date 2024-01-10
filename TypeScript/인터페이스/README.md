# 인터페이스

 - 상호간의 정의한 약속 혹은 규칙
 - 객체의 스펙(속성과 속성의 타입)
 - 함수의 파라미터, 스펙
 - 배열과 객체를 접근하는 방식
 - 클래스

## 예시

 ```ts
    let person = { name: 'Capt', age: 28};

    function logAge(obj: { age: number }) {
        console.log(obj.age) // 28
    }

    logAge(person); // 28

    // 인터페이스 변환

    interface personAge {
        age: number;
    }

    function logAge(obj: personAge) {
        console.log(obj.age)
    }

    let person = { name: "Capt", age: 28}
    logAge(person)
 ```

 - 인터페이스는 속성의 증가를 위해 병합할 수 있다.
 - 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있다.
 - 인터페이스에서 타입스크립트 타입 검사기가 더 빨리 작동한다.
 - 인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언한다.
 - 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름 있는(명명된) 객체로 간주되므로 어려운 특이 케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있다.

## 속성 타입

 - 기존의 type 쓰는 것과 같이 선택적 속성을 나타내는 방법으로는 "?"를 앞에 붙이는 것을 사용한다.

 ```ts
    interface Book {
        author?: string;
        pages: number;
    }

    // Ok
    const ok: Book = {
        author: "Hello",
        pages: 80,
    };

    const missing: Book = {
        pages: 80
    };
 ```

 - 읽기 전용을 추가하는 방법이 약간의 차이가 존재한다.
 - interface에서만 사용할 수 있는 방법으로 readonly 속성을 앞에 붙이는 것으로 읽기 전용으로 선언할 수 있다.

 ```ts
    interface Page {
        readonly text: string;
    }

    function read(page: Page) {
        // Ok: text 속성을 수정하지 않고 읽는 것
        console.log(page.text)

        page.text += "!";
        // Error: Cannot assign to 'text' because it is a read-only property.
    }
 ```

 - readonly 속성을 가진 interface를 명시적 타입 애너테이션으로 선언할 경우 선언된 변수도 readonly 속성을 상속받는다.