# Conditional Rendering

  - COndition: 조건을 의미함
  - Conditional Rendering: 조건부 렌더링
  - 어떠한 조건에 따라서 렌더링이 달라지는 것
  - True 이면 버튼을 보여주고 False이면 가리는 것 등을 의미
```JSX
function UserGreeting(props) {
    return <h1>다시 오셨군요!</h1>;
}

function GuestGreeting(props) {
    return <h1>회원가입을 해주세요.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
// 조건에 따라 렌더링 결과가 달라짐!
    if (isLoggedIn) {
        return <UserGreeting /> ;
    }
    return <GuestGreeting />;
}
```

## Element Variable

  - Rendering 해야하는 Component를 변수로 취급하는 것
```JavaScript
let button;
if (isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
} else {
    button = <LoginButton onClick={handoleLoginClick} />;
}

return (
    <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
    </div>
)
```
  - LogoutButton Component를 button 이라는 변수에 넣어서 사용하는 것을 Element Variable 이라고 한다.

## Inline Condition

  - 코드를 별도로 분리하지 않고 필요한 곳에 직접 집어넣는 것
  - 조건문을 코드안에 집어넣는 것
  - Inline If
    - If 문을 넣는것이 아닌 && 연산자 사용 (양 쪽 모두 True 인 경우 True)
    - 앞의 조건이 True 이면 뒤에 값에 앞의 값을 넣어서 출력 되는 형식
```JSX
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;

    return (
        <div>
            <h1>안녕하세요!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    현재 {unreadMessages.length}개의 읽지 않은 메세지가 있습니다.
                </h2>
            } 
        </div>
    )
}
// 출력되면 현재 10개의 읽지 않은 메세지가 있습니다. 출력
```

  - Inline If-Else
    - condition ? true : false (조건이 참이면 앞의 값 거짓이면 뒤의 값)
    > props.isLoggedIn ? "로그인" : "로그인하지 않은"
    >
    > props.isLoggedIn 의값이 참이면 로그인 거짓이면 로그인하지 않은 출력
    - 문자열 뿐만 아니라 다른 변수들도 사용이 가능!!
    
```JSX
function MainPage(props) {
    const [showWarning, setShowWarning] = useState(false);

    const handleToggleClick = () => {
        setShowWarning(prevShowWarning => !prevShowWarning);
    }

    return (
        <div>
            <WarningBanner warning={showWarning} />
            <button onClick={handleToggleClick}>
                {showWarning ? "감추기" : "보이기"}
            </button>
        </div>
    )
}
```
        
  - null을 리턴하면 렌더링을 하지 않는다.
  - Component 에서 null을 리턴하더라도 Lifecycle이 죽는 것이 아니다.