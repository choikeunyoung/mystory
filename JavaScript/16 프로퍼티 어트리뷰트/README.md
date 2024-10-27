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
// 데이터 프로퍼티
const person = {
    firstName: "Hamboo",
    lastName: "Lee",
    // 접근자 프로퍼티
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    },

    set fullName(name) {
        [this.firstName, this.lastName] = name.split(" ");
    }
}

console.log(person.fullName)
// Hamboo Lee
person.fullName = "hungry kim"
console.log(person.fullName)
// hungry kim
```

### 프로토타입

- 어떤 객체의 상위 객체 역할을 하는 객체
- 하위 객체에게 자신의 프로퍼티와 메서드를 상속

## 프로퍼티 정의

- 새로운 프로퍼티를 추가하며 어트리뷰트를 명시적 정의 혹은 기존 어트리뷰트를 재정의 하는 것

```JS
const person = {};

Object.defineProperty(person,'firstName', {
    value: "Ungmo",
    writable: true,
    enumerable: true,
    configurable: true
});
```

| 프로퍼티 디스크립터 객체의 프로퍼티 | 대응하는 어트리뷰트 | 생략했을 때의 기본값 |
| ----------------------------------- | ------------------- | -------------------- |
| value                               | [[Value]]           | undefined            |
| get                                 | [[Get]]             | undefined            |
| set                                 | [[Set]]             | undefined            |
| writable                            | [[Writable]]        | false                |
| enumerable                          | [[Enumerable]]      | false                |
| configurable                        | [[Configurable]]    | false                |

## 객체 변경 방지

- 객체는 변경이 가능한 값이므로 재할당 없이 직접 변경이 가능
- Object.defineProperty or Object.defineProperties 를 통하여 어트리뷰트 재정의도 가능

| 구분           | 메서드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 읽기 | 프로퍼티 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| -------------- | ------------------------ | ------------- | ------------- | ------------- | ------------- | -------------------------- |
| 객체 확장 금지 | Object.preventExtensions | X             | O             | O             | O             | O                          |
| 객체 밀봉      | Object.seal              | X             | X             | O             | O             | X                          |
| 객체 동결      | Object.freeze            | X             | X             | O             | X             | X                          |

### 객체 확장 금지

- 객체의 확자을 금지하는 것으로 설정된 프로퍼티의 추가가 불가능함

```JS
const person = {name : "Lee"}
console.log(person.isExtensible(person)); // true

Object.preventExtensions(person):

console.log(person.isExtensible(person)); // false

person.age = 20;
console.log(person) // {name : 'Lee'}
```

### 객체 밀봉

- 프로퍼티 추가 및 삭제 어트리뷰트 재정의 금지
- 읽기와 쓰기만 가능

```JS
const person = { name : "Lee" };

console.log(Object.isSealed(person)); // false

Object.seal(person);

console.log(Object.isSealed(person)); // true

console.log(Object.getOwnPropertyDescriptors(person));

{
  name: {
    value: 'Lee',
    writable: true,
    enumerable: true,
    configurable: false
  }
}
```

### 객체 동결

- 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 값 갱신 금지
- 읽기만 가능

```JS
const person = { name : "Lee" };

console.log(Object.isFrozen(person)); // false

Object.freeze(person);

console.log(Object.isFrozen(person)); // true

console.log(Object.getOwnPropertyDescriptors(person));

{
  name: {
    value: 'Lee',
    writable: false,
    enumerable: true,
    configurable: false
  }
}
```

### 불변 객체

- 프로퍼티만 변경이 방지 중첩 객체까지 동결이 불가능

```JS
const person = {
    name: "Lee",
    address: { city : "Seoul"}
};

Object.freeze(person); // 얕은 동결

console.log(Object.isFreeze(person)); // true
console.log(Object.isFreeze(person.address)); // false
```

- 중첩 객체까지 동결하기 위해서는 재귀적 호출을 통한 처리가 필요함
