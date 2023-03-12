## 6.4 리액트 상태값을 리덕스로 관리하기

  - 리덕스는 JS를 사용하는 모든 곳에서 사용이 가능하다.
  - 리액트의 컴포넌트 상태값과 리덕스의 상태값이 불변 객체이고 이는 변경 여부확인이 빨라 렌더링 속도가 향상된다.
  - 리액트와 리덕스가 궁합이 잘 맞기때문에 자주 사용된다.


### 6.4.1 react-redux 패키지 없이 직접 구현하기

  ```JavaScript
    const reducer = combineReducers({
        timeline : timelineReducer,
        friend: friendReducer
    });
    const store = createStore(reducer);
    export default store;
  ```

  - 스토어를 생성하여 객체를 내보내서 원하는 곳에서 사용가능하게 만든다.
  
  ```JavaScript
    // TimelineMain.js
    const [, forceUpdate] = useReducer(v => v + 1, 0);
    useEffect(() => {
        const unsubscribe = store.subscribe(() => forceUpdate());
        return () => unsubscribe();
    }, []);

    // FriendList.js
    const [, forceUpdate] = useReducer(v => v + 1, 0);
    useEffect(() => {
        const unsubscribe = store.subscribe(() => forceUpdate());
        return () => unsubscribe();
    }, []);
  ```

  - 두 js 모두 같은 로직으로 구성되었고 아래부분에 렌더링 하는 부분은 다르게 이뤄져있다.
  - subscribe 함수를 이용하게되면 Reducer가 호출되는 시점에서 subscribe를 통해 정의한 함수를 호출 및 동작할 수 있게 된다.
  - 이후 Timeline 상태값을 변경하면 FriendList 도 같이 리렌더링 되는데 이를 방지하기 위해 로직을 추가해 줘야한다.

  ```JavaScript
    // Timeline.js
    useEffect(() => {
        let prevTimeLine = store.getState().timeline;
        const unsubscribe = store.subscribe(() => {
            if (prevTimeLine !== timeline) {
                forceUpdate();
            }
            prevTimeLine = timeline;
        });
        return () => unsubscribe();
    }, []);

    // FriendList.js
    useEffect(() => {
        let prevFriends = store.getState().friends;
        const unsubscribe = store.subscribe(() => {
            if (prevFriends !== friends) {
                forceUpdate();
            }
            prevFriends = friends;
        });
        return () => unsubscribe();
    }, []);
  ```

  - 이전 값과 비교하여 timeline 을 건들였는지 friend를 건들였는지 확인해주는 로직을 추가해줘야 한다.
  - 이러한 행동을 방지하기위해 react-redux 패키지를 이용햐면 편하다.

### 6.4.2 react-redux 패키지 사용하기

  - npm install react-redux 를 실행한다.
  - Provider 컴포넌트를 리액트 최상위 컴포넌트로 정의한다.
  - Provider 컴포넌트 하위 컴포넌트는 리덕스 상태값이 변경되면 자동으로 컴포넌트 함수가 호출되도록 할 수 있다.

  ```JavaScript
    import store from "./common/store"
    import { Provider } from "react-redux"
    <Provider store={store}>
        <div>
            <FriendMain />
            <TimelineMain />
        </div>
    </Provider>
  ```

  - react-redux 패키지를 사용해서 상태값을 변경해볼 경우

  ```javaScript
    const friends = useSelector(state => state.friend.friends);
    const dispatch = useDispatch();

    // 예시 1

    const number = useSelector(state => state.counter.number);
    const diff = useSelector(state => state.counter.diff);
  ```

  - useSelector 함수와 useDispatch 함수를 사용할 수 있다.
  - useSelector
    - 리덕스 스토어의 상태를 조회 할 땐 만약 상태가 바뀌지 않았으면 리렌더링하지 않는다.
    - 예시 1에서 두 변수중 한개의 상태값만 변경되도 두 변수 모두 다시 렌더링이 되지만 이를 방지하기 위해 useSelector의 두번째 매개변수를 활용한다.
    - useSelector의 두번째 인자는 equalityFn 으로 이전 값과 현재값을 비교해서 다른지 판단해주는 함수이다.
    - redux 내장 함수인 shallowEqual 을 두번째 인자로 넣어주면 객체의 가장 최신값들을 비교해준다.

  - useDispatch
    - 액션 함수를 실행시키는데 사용된다.
    - 액션 함수를 실행시켜 저장된 함수의 상태값을 변경하는데 사용

## 6.5 reselect 패키지로 선택자 함수 만들기

  - 원본 데이터를 다양한 형태로 가공해서 사용할 수 있게 도와줌
  - 리덕스 데이터를 리액트 컴포넌트에서 필요한 데이터로 가공하는 용도로 많이 사용

  ```javaScript
    export const getTodoList = createSelector(getTodos, (todos) =>
      todos.todoList.filter((todo) => !todo.isCompleted)
    );
  ```

  - createSelector를 사용하여 매개변수로 들어온 getTodos 값이 변하지 않으면 계산을 수행하지 않는다.
  - 메모제이션 기능을 이용하여 이전값과 비교하여 변경되면 변경된값을 연산을 수행하고 아닌 경우 이전값을 그대로 사용한다.
  - 상태값 외에도 속성값을 입력 받을 수 있다.

  ```javaScript
    <FriendMain ageLimit={30} />
    <FriendMain ageLimit={15} />

    // FriendMain
    export default function FriendMain({ ageLimit }) {
        const friendsWithAgeLimit = useSelector(state => 
        getFriendsWithAgeLimit(state, ageLimit)
        );
    }
  ```

  - 위에서 `ageLimit={30}` 과 `ageLimit={15}` 에서는 reselect 의 메모제이션 기능이 제대로 동작하지 않는다.
  - 렌더링 될 때마다 두 인스턴스는 같은 선택자 함수를 다른 속성값으로 호출한다.
  - reselect 는 이전 결과값을 저장했다가 비교하는 역할을 해주는데 reselect 입장에서는 30과 15의 값이 들어오게 되고 이중 어느 값이 변경되는지 판단을 못하는 것 같다.
  - 이를 방지하기 위해서 각 컴포넌트 인스턴스별로 독립된 메모제이션 기능을 제공하기 위해 reselect 함수도 여러 인스턴스로 만들어 줘야한다.

  ```javascript
    export const makeGetFriendsWithAgeLimit = (0 => {
        return createSelector([getFriends, getAgeLimit]), (friends, ageLimit) =>
        friends.filter(friend => friend.age <= ageLimit)
    });

    export default function FriendMain({ ageLimit }) {
        const getFriendsWitchAgeLimit = useMemo(makeGetFriendsWithAgeLimit, []);
        const friendsWithAgeLimit = useSelector(state =>
        getFriendsWithAgeLimit(state, ageLimit))
    };
  ```

  - useMemo를 이용해 각 함수의 주소값을 고정한 후 개별적인 reselect 메모제이션 기능을 사용한다.