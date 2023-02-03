# Hooks

  - Function Component에서 Class Component 기능을 사용하기 위해 쓰는 것
  - state 관련 함수, Lifecycle 관련 함수, 최적화 관련 함수들을 Hooks(갈고리) 처럼 끌어와서 사용
  - 이름 앞에 use를 사용하여 Hook이라는 것을 명시
  - useState : state를 사용하기 위한 Hook
    > const [변수명, set함수명] = useState(초기값);
```JSX
import React, { userState } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>총 {count} 번 클릭했습니다.</p>
            <button onClick={() => setCount(count + 1)}>
                클릭
            </button>
        </div>
    );
}
```

## UseEffect

  - useEffect는 Side effect를 사용하기 위한 것
  - Side effect는 부정적 의미지만 React 에서는 효과, 영향을 의미한다.
  - 다른 Component 에 영향을 미칠 수 있으며 렌더링 중에는 영향을 미칠 수 없다.
    > useEffect(이펙트 함수, 의존성 배열);
  - 의존성 배열을 생략할 경우 렌더링이 업데이트 될 때마다 실행된다.

## useMemo
  - Memoization: 연산결과와 처리하는 과정을 기억해두고 나중에 다시 사용하는 방식
```JSX
const memoizedValue = userMemo(
    () => {
        // 연산량이 높은 작업을 수행하여 결과 반환
        return computeExpensiveValue(의존성 변수1, 의존성 변수2);
    },
    [의존성 변수1, 의존성 변수2]
);
```
  - 의존성 배열을 넣지 않을 경우, 매 렌더링 마다 실행되기 때문에 의미가 사라진다.
  - 빈 배열만 넣을 경우 마운트 될 경우만 호출된다.

## useCallback
  - useMemo Hook과 유사하지만 값이 아닌 함수를 반환한다.
  - 특정 변수의 값만 변한경우 마운트가 되기 때문에 부모 요소가 렌더링 되도 의존성 변수가 변하지 않으면 다시 렌더링 하지 않는다.

## useRef
  - Reference를 사용하기 위한 Hook
  - 특정 Component에 접근할 수 있는 객체
  - refObject.current 현재 참조하고 있는 Element
```JSX
// 사용법
// Component가 마운트 되기 전까지 유지됨
const refContainer = useRef(초깃값);

function TextInputWithFocusButton(props) {
    const inputElem = useRef(null);
    
    const onButtonClick = () => {
        // 'current'는 마운트된 input element를 가리킴
        inputElem.current.focus();
    };

    return (
        <>
            <input ref={inputElem} type="text" />
            <button onClick={onButtonClick}>
                Focus the input
            </button>
        </>
    );
}
```
  - 내부 데이터가 변경되어도 별도로 알려주지 않는다.
  - 다시 렌더링이 되지 않는다는 말이다.

## 규칙

  - Hook은 무조건 최상위 레벨에서만 호출해야 한다.
  - 반복문, 조건문 등에서 사용하면 안된다.
  - Component가 렌더링될 때마다 매번 같은 순서로 호출되어야 한다.
  - 리액트 함수 컴포넌트에서만 Hook을 호출해야 한다.
  - 이름은 use로 시작해야 한다.