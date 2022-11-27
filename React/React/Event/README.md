# Event
  
  - 사건 => 버튼클릭, 입력 등
  - DOM과 React의 Event
```JSX
// DOM
<button onclick="activate()">
    Activate
</button>
// React
<button onClick={activate}>
    Activate
</button>
```
  - DOM은 "activate"라는 함수를 호출 문자열로 전달
  - React는 Camel 표기법 사용 함수 그대로 전달

## Event Handler

  - 사건을 처리하는 역할
  - Event Listener
```JavaScript
class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isToggleOn: true };
        // callback에서 'this'를 사용하기 위해 바인딩을 해줘야 한다.
        // 바인딩을 해주지 않을 경우 this 에서는 글로벌 변수를 가져오는데 글로벌 변수로 handleClick는 undefinded 이다
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? "켜짐" : "꺼짐" }
            </button>
        );
    }
}
```

  - 바인드 코드 사용이 귀찮을 경우
    1. Class fields syntax 사용
    2. Event를 다루는 곳에 Arrow function 사용
```javaScript
// Class fields syntax 사용
handleClick = () => {
    console.log("this is : ", this);
}
// Arrow function
render() {
    return (
        <button onClick={() => this.handleClick()}>
            클릭
        </button>
    );
}
```

  - 매개변수를 전달하는 방식
```JSX
<button onClick={(event) => this.deleteItem(id, event)}>삭제하기</button>
<button onClick={this.deleteItem.bind(this, id)}>삭제하기</button>
```