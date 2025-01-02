# 32. String

- 표준 빌트인 객체 String은 원시 타입인 문자열을 다룰 때 프로퍼티와 메서드 제공

## 32.1 String 생성자 함수

- new 연산자와 함께 호출하여 인스턴스 생성 가능
- 생성자 함수에 인수를 전달하지 않고 생성시 [[StringData]] 내부 슬롯에 빈 문자열을 할당한 래퍼 객체 생성

```JS
    const strObj = new String();
    console.log(strObj); // String { length: 0, [[PrimitiveValue]]: ""} 내부 구조

    const strObj2 = new String("hi");
    console.log(strObj2); // String {0:"h", 1:"i" length: 2, [[PrimitiveValue]]: "hi"} 내부 구조

    // 원시값과 래퍼 객체 부분
    const name = "hi";
    console.log(name);

    const strObj = new String("hi");
    console.log(strObj);

    // hi
    // [String: 'hi']
```

- String 생성자 함수 인자로 문자아닌 값을 넣을시 강제로 문자열로 변환시킴

```JS
    let strObj = new String(123)
    console.log(strObj) // [String: '123']

    let strObj2 = new String(null)
    console.log(strObj2) // [String: 'null']
```

## 32.2 Length 프로퍼티

- 문자열의 개수를 반환하는 프로퍼티

```JS
    'hello'.length; // 5
    '안녕'.length // 2
```

## 32.3 String 메서드

- 배열에는 원본 배열을 직접 변경하는 메서드와 원본 배열을 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 존재
- String 객체는 원본을 직접 수정하는 메서드는 존재하지 않음
- String 객체 메서드는 언제나 새로운 문자열을 반환, 읽기 전용 객체로 제공됨

```JS
    const strObj = new String("Lee");
    console.log(Object.getOwnPropertyDescriptors(strObj));

    /*
    {
  '0': {
    value: 'L',
    writable: false,
    enumerable: true,
    configurable: false
  },
  '1': {
    value: 'e',
    writable: false,
    enumerable: true,
    configurable: false
  },
  '2': {
    value: 'e',
    writable: false,
    enumerable: true,
    configurable: false
  },
  length: { value: 3, writable: false, enumerable: false, configurable: false }
}
    */
```

### 32.3.1 String.prototype.indexOf

- 대상 문자열에서 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스 반환 실패시 -1 반환

```JS
    const str = 'Hello, world';
    str.indexOf('l') // 2
    str.indexOf('or') // 7
    str.indexOf('x') // -1

    const str = "banana";
    console.log(str.indexOf("n")); //2

    // String.indexOf(searchString: string, position?: number): number
    console.log(str.indexOf("n",3)) // 4
```

### 32.3.2 String.prototype.search

- 대상 문자열에서 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열 인덱스 반환 실패시 -1 반환

```JS
    const str = 'Hello world';
    // 31 장에서 정규 표현식 다뤘음
    str.search(/x/) // 4
    str.search(/o/) // -1
```

### 32.3.3 String.prototype.includes

- 대상 문자열에 인수로 전달받은 문자열이 포함되어 있는지 확인하여 결과를 true or false 로 반환

```JS
    const str = 'Hello world';

    str.includes('Hello') // true
    str.includes('') // true
    str.includes('x') // false
    str.includes() // false

    // indexOf 처럼 position 설정 가능
    // String.includes(searchString: string, position?: number): boolean
```

### 32.3.4 String.prototype.startsWith

- 대상 문자열이 인수로 전달받은 문자열로 시작하는지 확인하여 true or false 반환

```JS
    const str = 'Hello world';

    str.startsWith('He') // true
    str.startsWith('x') // false
    // String.startsWith(searchString: string, position?: number): boolean
```

### 32.3.5 String.prototype.endsWith

- 대상 문자열이 인수로 전달받은 문자열로 끝나는지 확인하여 true or false 반환

```JS
    const str = 'Hello world';

    str.endsWith('ld') // true
    str.endsWith('x') // false
    // String.endsWith(searchString: string, endPosition?: number): boolean
```

### 32.3.6 String.prototype.charAt

- 대상 문자열에서 인수로 전달받은 인덱스에 위치한 문자를 검색하여 반환

```JS
    const str = "Hello";

    for (let i = 0; i < str.length; i++) {
        console.log(str.charAt(i)); // H e l l o
    }
```

- 인덱스는 문자열 범위사이의 정수여야 하며 범위를 벗어날 경우 빈 문자열을 반환

### 32.3.7 String.prototype.substring / String.prototype.slice

- substring 메서드는 대상 문자열에서 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터 두 번째 인수로 전달받은 문자 전까지 반환

```JS
    const str = "Hello World";

    str.substring(1,4); // ell
    str.substring(1); // ello World
```

- slice 와 비슷하게 동작하지만 차이가 존재
- substring: start, end 상관없이 한개라도 음수면, 시작위치가 0으로 설정된다.
- slice: end 값이 음수일 때, 뒤에서 부터 세서 그 앞까지 센다.
- slice: start 값이 음수일 때, ""

### 32.3.9 String.prototype.toUpperCase

- 대상 문자열을 모두 대문자로 변경한 문자열을 반환

### 32.3.10 String.prototype.toLowerCase

- 대상 문자열을 모두 소문자로 변경한 문자열을 반환

### 32.3.11 String.prototype.trim

- 대상 문자열 앞뒤 공백 문자를 제거

```JS
    const str = "      foo    "

    str.trim(); // foo
    str.trimStart(); // 'foo   '
    str.trimEnd(); // '     foo'
```

- String.prototype.replace 메서드를 통하여 정규 표현식을 인수로 전달하여 공백문자 제거 가능

### 32.3.12 String.prototype.repeat

- 대상 문자열을 인수로 전달받은 만큼 반복해 연결한 새로운 문자열 반환 음수면 RangeError 발생

```JS
    const str ="abc"

    str.repeat(); // ""
    str.repeat(0); // ""
    str.repeat(1); // "abc"
    str.repeat(2.5); // "abcabc"
```

### 32.3.13 String.prototype.replace

- 대상 문자열을 첫 번째 인수로 전달받은 문자열 또는 정규표현식을 검색하여 두 번째 인수로 전달한 문자열로 치환

### 32.3.14 String.prototype.split

- 대상 문자열에서 첫 번째 인수로 전달한 문자열 또는 정규 표현식을 검색하여 문자열을 구분 한 후 분리된 각 문자열로 이루어진 배열을 반환
