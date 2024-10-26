# 프로퍼티 어트리뷰트

- 내부 슬롯 => JavaScript 객체 또는 명세 타입의 데이터 멤버, 객체 상태를 저장하는 데 사용

  ```JS
    const obj = {};
    console.log(Object.getPrototypeOf(obj));
  ```

- 내부 메서드 => JavaScript 객체 멤버 함수

  ```JS
    const obj = { name: "Alice" };
    console.log(obj.name);
  ```

- 언어의 엔진에서 관리하는 기본적인 동작
- 임의로 수정이 불가능하게 접근이 막혀있음

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

- 프로퍼티 생성시 상태를 나타내는 어트리뷰트를 기본값으로 자동 정의
- value, writable, enumerable, configurable (값, 갱신 여부, 열거 가능, 재정의 가능)

```JS
    const person = {
        name: "Lee"
    };

    console.log(Object.getOwnPropertyDescriptor(person, 'name'));
    { value: 'Lee', writable: true, enumerable: true, configurable: true }
```

## 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티 : Key, Value 로 구성된 일반적 프로퍼티

  - Value : Key를 통해 Value 에 접근하면 반환되는 값
  - Writable : 변경 가능 여부를 나타내고 false 일 경우 읽기 전용이 됨
  - enumerable : 열거가 가능한지 여부 체크 false 일 경우 for ... in or Object.keys 로 열거 불가능
  - configurable : 재정의 가능 여부 false 인 경우 삭제, 어트리뷰트 값 변경이 금지됨

- 접근자 프로퍼티 : 자체적 값을 가지지는 않고 다른 데이터 프로퍼티 값을 읽거나 저장할 때 호출되는 함수로 구성된 프로퍼티
  - get : 프로퍼티 값을 읽을 때 사용
  - set : 프로퍼티 값을 저장할 때 사용
  - enumerable
  - configurable

```JS

```
