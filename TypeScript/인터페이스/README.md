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
 ```