# 4장 리액트 실전 활용법

  - useEffect 훅의 기능은 간단하지만 제대로 사용하기가 어렵다. 오래된 데이터를 참조하거나 부수 함수 효과가 자주 실행되는 문제가 발생한다.
  - useEffect 훅의 제대로 된 사용방법과 가독성과 생산성을 높이는 컴포넌트 코드 작성 방법, 렌더링 속도를 올리기 위한 최적화 방법을 살펴보자.

## 4.1 가독성과 생산성을 고려한 컴포넌트 코드 작성법

  - 유지보수하기 쉬운 코드, 컴포넌트 인터페이스를 쉽게 파악할 수 있는 코드 작성이 중요하다.
  - 다른 사람들이 봤을때 한 눈에 알아볼 수 있는 코드를 작성하는 것으로 목표를 삼자.
  - 조건부 렌더링을 할 때 가독성이 높은 방식이 무엇인지, 컨테이너 컴포넌트와 프레젠테이션 컴포넌트로 구분해서 폴더를 정리하는 방법에 대해서 살펴보자.

### 4.1.1 추천하는 컴포넌트 파일 작성법

  ```JavaScript
    MyComponent.propTypes = {
        // ...
    }

    export default function MyComponent({prop1, prop}) {
        // ...
    }

    const COLUMNES = [
        { id: 1, name : "ChoiKeunYoung", width: 200, color: "white" },
        { id: 2, name : "city", width: 100, color: "gray" },
    ];

    const URL_PRODUCT_LIST = "/api/products";
    function getTotalPrice({ price, total}) {
        // ...
    }
  ```

  - 파일 최상단에 속성값의 타입을 정의 한다. 이를 통해 파일을 열었을 경우 어떤 속성값들이 매칭되는지 한눈에 볼 수 있다.
  - 컴포넌트 함수의 매개변수는 이름을 정하게는게 좋다. 하나하나 props. 을 반복하기 보다는 변수명을 정해주면 바로 값을 넣을 수 있다.
  - 컴포넌트 외부의 변수와 함수는 파일 가장 밑에 정의한다.
  - 상수 변수는 대문자로 정의한다.
  - 모든것은 가독성을 높이기 위해서 하는 행동이다.

  ```JavaSCript
    // ex.1

    const [user, setUser] = useState("");
    const [width, setWidth] = useState("");
    
    useEffect(() => {
        getUserApi(userId).then(data => setUser(data));
    },[userId]);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    },[]);

    // ex.2

    const [user, setUser] = useState("");
    useEffect(() => {
        getUserApi(userId).then(data => setUser(data));
    },[userId]);

    const [width, setWidth] = useState("");
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    },[]);
  ```

  - 위의 ex.1 과 ex.2를 비교해보면 아래 코드가 좀 더 눈에 잘 들어온다.
  - 그 이유는 모든 훅을 선언한 후 useEffect를 사용하는 것보다 연관된 코드끼리 묶는 것이 눈에 확 들어오기 때문이다.
  - 변수 선언을 모으는 것보다 비슷한 기능을 모으는 것이 가독성이 좋다는 것이다.
  - 커스텀 훅을 이용하여 컴포넌트 코드가 복잡해지는 경우 따로 분리하면 재사용 성도 좋아지고 가독성도 좋아진다.

### 4.1.2 속성값 타입 정의하기 : prop-types

  - 자바스크립트는 동적 타입 언어이다.
    - 동적 타입 언어는 들어오는 변수에 따라서 타입이 정해진다고 보면된다. => num = "10", number = 10 하면 num 은 문자형, number 은 정수형 등
    - 정적 타입 언어는 들어오는 변수가 아닌 변수형을 미리 선언해준다. => int number = 10, char num = "hi" 등 미리 변수형을 선언해준다.
  - 자바스크립트의 동적언어 특성으로 인해서 props에 잘못된 형태의 변수값이 들어갈 수도 있기 떄문에 사용한다.

  ```JavaScript
    const [age, setAge] = useState("");
    const [name, setName] = useState("");

    function Info({age, name}) {
        setAge(age);
        setName(name);
    }
  ```

  - 위의 코드를 간단히 보면 age, name에 무슨 값이 들어갈 지 모른다.
  - 둘다 str 형태로 되어있어서 age에 "hi", name에 "10" 이 들어가도 잘못된 값이 들어간 지 모르기 떄문에 이를 방지하기 위해서 사용한다.

  ```JavaScript
    MyComponent.propTypes = {
        // 리액트 요소
        menu: PropTypes.element
        // 컴포넌트 함수가 반환할 수 있는 모든 것
        description: PropTypes.node
        // 클래스로 생성된 모든 것
        message: PropTypes.instanceOf(Message)
        // 배열에 포함된 값 중에서 하나를 만족
        name: PropTypes.oneOf(["Jone","mike"])
        // 배열에 포함된 타입 중에서 하나를 만족
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        // 특정 타입만 포함하는 배열
        ages: PropTypes.arrayOf(PropTypes.number)
        // 객체 속성값 타입
        info: PropTypes.shape({
            color: PropTypes.string,
            weight: PropTypes.number
        })
        // 객체에서 모든 속성값의 타입이 같은경우
        infos: PropTypes.objectOf(PropTypes.number)
    }
  ```

### 4.1.3 가독성을 높이는 조건부 렌덜이 방법

  - 특정 값에 따라 선택적으로 렌더링 하는 조건부 렌더링은 많이 사용된다.
  - && 연산자가 삼항 연산자보다 가독성이 좋다.
  - 코드에 따라서 삼항 연산자가 && 연산자 보다 가독성이 좋을 수 있기 떄문에 어느 방식이 좋다고 할 수는 없다.
  - JSX 에서는 &&연산자가 `name ? "true" : false` 삼항 연산자 보다는 가독성이 높다.
  - 다른 사람이 코드를 보는것을 생각해서 코드를 작성하자.

### 4.1.4 관심사 분리를 위한 프레젠테이션, 컨테이너 컴포넌트 구분하기

  - 비즈니스 로직과 상태값 유무에 따라 프레젠테이션과 컨테이너로 불리는 두가지 컴포넌트로 폴더를 구분한다.
  - 관심사 분리는 복잡한 코드를 비슷한 기능의 코드끼리 모아서 별도로 관리하는 것
    - 예를 들어 Singup 관련된 코드를 Singup 코드끼리, Login 관련된 코드를 Login 코드끼리 묶는 것
  - 기능별로 폴더를 관리하면 컴포넌트 찾기가 쉽다.

## 4.2 useEffect 훅 실전 활용법

  - useEffect 사용시 의존성 배열이 매우 중요한 역할을 하게되며 이 의존성 배열을 관리하는 방법에 대해 살펴보자.

### 4.2.1 의존성 배열을 관리하는 방법

  - 의존성 배열은 useEffect 훅의 두번째 매개변수이다.
  - 이 의존성 배열의 변경에 따라서 React는 변화를 인식하고 리렌더링 한다.

  ```JavaScript
    function Profile({ userId }) {
        const [user, setUser] = useState();
        useEffect(() => {
            fetchUser(userId).then(data => setUser(data))
        });
    }
  ```

  - useEffect를 사용하여 fetchUser 함수를 호출하며 의존성 배열을 빈 배열로 처리할 경우 한번만 렌더링 시켜준다.
  - 하지만 userId의 변동에 따라서 값을 변화를 주고싶지만 의존성 배열에 없기때문에 값이 변화가 없다.

  ```JavaScript
    function Profile({ userId }) {
        const [user, setUser] = useState();
        useEffect(() => {
            fetchUser(userId).then(data => setUser(data))
        },[userId]);
    }
  ```
  
  - 의존성 배열에 userId 값을 넣어주면 userId 값의 변화를 감지하여 fetchUser 함수를 실행해준다.

  ```JavaScript
    function Profile({ userId }) {
        const [user, setUser] = useState();
        const [needDetail, setNeedDetail] = useState(false);
        useEffect(() => {
            fetchUser(userId, needDetail).then(data => setUser(data))
        },[userId]);
    }
  ```

  - useEffect 사용시 자주 하는 실수로 의존성 배열에 추가된 변수를 선언해주지 않아서 값이 제대로 나오지 않는 경우가 있다.
  - "exhaustive-deps"를 통해서 의존성 배열에 추가되지 않은 값들이 있는지 체크할 수 있는 기능을 제공한다.

  - async await 함수를 useEffect 내에서 사용하고 싶은 경우 함수로 만들어서 사용해야한다.

  ```JavaScript
    // ex.1

    useEffect(async () => {
        const data = await fetchUser(userId);
        setUser(data);
    }, [userId])

    // ex.2

    useEffect(() => {
        async function fetchAndSetUser() {
            const data = await fetchUser(userId);
            setUser(data)
        }
        fetchAndSetUser;
    }, [userId])
  ```

  - useEffect을 사용하기 위해서는 반환값이 항상 함수 타입이여야 한다.
  - ex.1 의 경우 async await 함수의 반환값은 프로미스 객체를 반환하기 때문에 사용할 수 없다
  - ex.2 의 경우 따로 함수로 만들어서 사용하기 때문에 useEffect 에서 사용할 수 있다.

### 4.2.2 의존성 배열을 없애는 방법

  - 의존성 배열을 관리하는데 많은 시간과 노력이 들어간다.
  - 속성값으로 전달되는 함수를 의존성 배열에 넣는 순간 useCallback 등을 사용하여 자주 변경되지 않도록 신경써야 한다.

  ```JavaScript
    const [ count, setCount ] = useState(0);

    // ex.1

    useEffect(() => {
        function onClick() {
            setCount(count + 1);
        }
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, [count]);

    // ex.2
    useEffect(() => {
        function onClick() {
            setCount(prev => prev +1);
        }
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    });
  ```

  - 이전 상태값을 기반으로 다음 상태값을 계산하기 위해 의존성 배열에 상태값을 넣는 경우 함수를 넣어주면 의존성 배열을 없앨 수 있다.
  - 여러 상태값을 참조하면서 값을 변경할 때는 useReducer 훅을 사용하는게 좋다.
  - useReducer 훅의 두 번째 매개변수는 초기상태값이고, dispatch는 변하지 않는 값이다.
  - useReducer를 사용하면 다양한 액션과 상태값을 관리하기 용이하고, 상태값 변경 로직을 여러 곳에서 재사용이 좋다.

  - useRef 활용하여 의존성 배열을 제거할 수 있다.
  - 속성값으로 함수가 전달되면 내용은 그대로지만 렌더링마다 변경되는 경우가 있어서 불필요한 호출이 되는 경우가 종종 있다.
  - useRef에 값을 저장하면 값이 변경되도 컴포넌트가 다시렌더링 되지 않기 때문에 의존성 배열에 추가하지 않아도 된다.

## 4.3 렌더링 속도를 올리기 위한 성능 최적화 방법

  - React가 실행될 때 가장 많은 CPU 리소스를 사용하는 것이 렌더링이다.
  - 리액트가 UI 라이브러리이기 때문에 프로그램이 실행되는 동안 화면을 계속 그리기 때문이다.
  - 데이터와 컴포넌트 함수로 화면을 그리고 대부분 연산은 가상 돔에서 발생한다.

  1. 이전 렌더링 결과를 재사용할지 판단
  2. 컴포넌트 함수를 호출
  3. 가상 돔끼리 비교해서 변경된 부분만 실제 돔에 반영

  - 성능 이슈가 생기면 그때 가서 고민해도 된다.

### 4.3.1 React.memo로 렌더링 결과 재사용하기

  - React.memo로 감싸줄 경우 속성값 비교 함수가 호출된다.
  - 이전 속성값을 매개변수로 받아서 같은지 다른지 참 or 거짓 으로 반환하여 참이면 렌더링을 하지않고 거짓이면 컴포넌트 함수를 실행하여 가상 돔을 업데이트 한다.
  - React.memo로 감싸지 않을경우 항상 거짓으로 반환된다.