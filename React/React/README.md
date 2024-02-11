# 간단한 리액트 정리

## React Hook (자주 사용하는 것들)

 - 함수형 컴포넌트에서도 클래스형 컴포넌트 기능을 사용할 수 있게 하는 기술이다.
 - Hook의 특징
   - 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 연동(hook into)할 수 있게 해주는 함수이다.
   - class 안에서 동작하지 않는다.
   - class 없이도 React를 사용할 수 있게 해준다.

 - 차이점함수형클래스형state, lifeCycle관련 기능 사용불가state, lifeCycle관련 기능 사용메모리 자원을 덜 사용한다메모리 자원을 더 사용한다. 컴포넌트 선언이 편함임의 메서드를 정의할 수 있음
 - 컴포넌트 사이에 로직의 재사용이 어렵다.
 - 컴포넌트를 이해하는데 도움이된다.
 - Hooks은 JS이지만 최상위 에서만 Hook을 호출해야 한다.
   - 반복문, 조건문, 중첩된 함수 내에서 실행불가
 - React 함수 컴포넌트 내에서만 Hook을 호출해야 한다.

## State Hook

 - useState는 상태를 관리하는 Hook 이다.
 - 현재 상태를 나타내는 state 값과, 업데이트하는 함수를 쌍으로 제공한다.
 - 컴포넌트가 다시 렌더링 되어도 그대로 유지된다.
 - 초기값을 받는다
 - 객체일 필요가 없다. (문자, 숫자, null, 객체, 배열 등)

 ```jsx
   function Example() {
       const [ cnt, setCnt ] = useState(0); // ( 초기값, 초기갑을 업데이트 하는 함수 )
       return (
           <div>
               <p>클릭 횟수 {cnt} 번</p>
               <button onClick={() => setCnt(cnt+1)}>증가</button>
           </div>
       )
   }
 ```

## Effect Hook

 - 컴포넌트 내에서 side effect를 수행할 수 있게 해준다.
 - side Effect
   - 컴포넌트 안에서 데이터를 가져오거나 구독하고 DOM을 직접 조작하는 모든 동작
 - 기본 형태는 useEffect(function, deps)로 이루어졌다.

 ```jsx
   // 모든 렌더링에서 함수가 실행
   useEffect(() => {
       console.log("hello") // function
   })

   // 첫 렌더링 시 실행
   useEffect(() => {
       console.log("hello") // function
   }, [])

   // deps의 값이 변화에 따라서 함수를 실행한다.
 ```

 - useEffect는 2번째 인자로 의존성 배열을 넣게된다.
 - 의존성 배열의 값이 변화할때마다 첫번째 인자의 함수를 실행하는 구조를 가지고있다.
 - 의존성 배열이 없는경우 함수 렌더링을 진행할 때마다 작동한다.
  
## useContext

 - 기존 React에 존재하는 Context를 편하게 사용하게 도와준다.
 - Context는 단게마다 props를 넘겨주지 않고 컴포넌트 트리 전체에 데이터를 제공해주는 것을 말한다.
 - Provider, Consumer, createContext
   - createContext : context 객체를 생성한다.
   - Provider : 생성한 context를 하위 컴포넌트에게 전달한다.
   - Consumer : context의 변화를 감시한다.

 ```jsx
   // Parent.js
   export const AppContext = createContext();

   const App = () => {
       const user = {
           name: "사용자",
           age: "25"
       };

       return (
           <>
               <AppContext.Porvider value={user}>
                   <div>
                       <Children />
                   </div>
               </AppContext.Porvider>
           </>
       );
   };

   // Children.js
   import { AppContext } from "./Parent.js";

   const Children = () => {
       const user = useContext(AppContext);
       return (
           <>
               <h3>user의 name은 {user.name}입니다.</h3>
               <h3>user의 age은 {user.age}입니다.</h3>
           </>
       );
   };
 ```

## useReducer

 - useState의 대체 함수(hook)이고 기능 자체는 비슷하지만 복잡한 로직을 처리할 때 사용된다.

 ```jsx
   const [state, dispatch] = useReducer(reducer, initalArg, init)
 ```

 - useState와 동일하게 state를 관리하고 업데이트할 수 있다.
 - 다수 하윗값을 포함하는 복잡한 정적 로직을 만들거나 다음 state가 이전 state에 의존적인 경우에 사용한다.

 ```jsx
   const initValue = {count: 0};

   function reducer(state, action) {
       switch (action.type) {
           case "increase":
               return {count: state.count + 1}
           case "decrease":
               return {count: state.count - 1}
           default:
               throw new Error();
       }
   }

   function Counter() {
       const [state, dispatch] = useReducer(reducer, initalValue);
       return (
           <>
               Count : {state.count}
               <button onClick={() => dispatch({type: 'decrease'})}>-</button>
               <button onClick={() => dispatch({type: 'increase'})}>+</button>
           </>
       )
   }
 ```

## useCallback

 - 메모제이션된 콜백을 반환한다.
 - 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다.
 - 메모제이션
   - 컴퓨터 프로그램에서 동일한 계산을 반복해야 할 때. 이전 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 속도를 향상 시키는 기술이다.
 - useCallback(function, deps) 형태로 구성되어있다. Effect와 마찬가지로 의존성 배열을 가지고있다.

 ```jsx
   const memoizedCallback = useCallback(
       () => {
           doSomething(a, b); // function
       },
       [a, b],
   );
 ```

 - 하위 컴포넌트 콜백 함수가 inline 함수로 사용 혹은 컴포넌트 내에서 함수를 직접 생성하면 컴포넌트가 렌더링 될 때 마다 새로운 함수가 만들어지기 때문에 그것을 방지하기 위해서 사용한다.

 ```jsx
   // testFunct 함수가 렌더링 될때마다 새로운 함수로 인식한다.
   function testFunc() {
       return "hello"
   }
 ```

 - 렌더링 시마다 함수를 재선언하는 것 보다, 한번 만든 함수를 재사용하고 필요한 경우만 재생성 하는 것이 효율적이기 때문에 useCallback을 사용한다.

## useMemo

 - 성능 최적화를 위해 연산된 값을 재사용하는 기능을 가진 훅
 - 컴포넌트가 렌더링 시 함수를 호출해 반복적 연산을 할때 매번 연산을 하는 것이 아닌 연산된 값을 재사용하는 훅
 - useMemo(func, deps) 의 구조로 이루어져있으며 deps 배열의 값에 따라서 함수를 실행한다.

 ```jsx
   const memoizedValue = useMemo(
       () => computeExprensiveValue(a, b) // 함수
       , [a, b]
   );
 ```

## useRef

 - 특정 DOM을 선택할 수 있게 해주는 훅이다.
 - 'reference'의 줄임말로 무엇인가를 참조할 때 사용한다.
 - DOM 요소를 직접 선택해야 하는 Selector를 대체하여 특정 요소를 잡아 포커싱 하거나 할때 사용한다.

 ```jsx
   function TextInputWithFocusButton() {
       const inputEl = useRef(null);
       const onButtonClick = () => {
           inputEl.current.focus();
       };

       return (
           <>
               <input ref={inputEl} type="text" />
               <button onClick={onButtonClick}>인풋 포커스</button>
           </>
       )
   }
 ```

 1. useRef()함수로 const 객체를 선언했고, focus 함수를 작성했다.
 2. 선택하고 싶은 DOM 요소에 ref 속성으로 useRef 객체를 넣어준다.
 3. 버튼 클릭시 이벤트 핸들러로 우리가 설정한 ref 값의 DOM을 가리키고 focus() 함수를 호출하여 창을 포커싱한다.

 - useRef는 내용이 변경되어도 그것을 알려주지 않는다.
 - current 프로퍼티를 변형해도 리렌더링을 발생시키지 않기때문에 리렌더링할 필요가 없는 변수를 useRef로 관리한다.