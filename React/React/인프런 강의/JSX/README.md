# JSX
  
  - JS(JavaScript)의 약자
  - JSX(A syntax extension to JavaScript): 자바 스크립트의 확장 문법

```JSX
const element = <h1>Hello, world!</h1>;
```
  - 역할
    - 내부적으로 XML/HTML 코드를 JavaScript로 변환해주는 역할

```JSX
React.createElement(
    type, // element의 유형 div, button 등등
    [props], // 속성값들이 들어가야함 className id 등
    [...children] // element가 포함한 내용으로 이해하면 될듯?
)
// JSX를 사용한 코드
class Hello extends React.Component {
    // render 함수를 통하여 실제 화면에 렌더링중
    render() {
        return <div>Hello {this.props.toWhat}</div>;
    }
}

ReactDOM.render(
    <Hello toWhat="World" />,
    document.getElementById("root")
);
// JSX를 사용하지 않고 사용한 JS 코드

class Hello extends React.Component {
    // render 함수를 통하여 실제 화면에 렌더링중
    render() {
        return React.createElement("div", null, `Hello ${this.props.toWhat}`);
    }
}

ReactDOM.render(
    React.createElement(Hello, { toWhat: "World" }, null),
    document.getElementById("root")
);
```

  - 한개 더 예시를 보면

```JSX
// JSX 사용한 코드
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
)
// JSX 사용하지 않은 코드
const element = React.createElement(
    "h1",
    { className: "greeting" },
    "Hello, world!"
)
// React.createElement() 결과
const element = {
    tyep: "h1",
    props: {
        className: 'greeting',
        children: "Hello, world!"
    }
}
```
  - JSX를 사용하는게 필수는 아니지만 가독성과 코드길이가 짧아지기 때문에 사용하는 것을 추천!!

  - 장점
   - 코드의 간결성
```JSX
// JSX 사용
<div>Hello, {name}</div>
// JSX 사용 X
React.createElement("div", null, `Hello, ${name}`);
```
   - 버그를 발견하기 쉬움
   - Injection Attacks 방어 => 문자나 입력창에 소스코드를 입력하여 해킹하는 것을 방지 (title을 변수로 받기때문)
```JSX
// JS 사용
const title = response.potentiallyMaliciousInput;
// JSX 사용
const element = <h1>{title}</h1>;
```

   - 중간에 JS 코드를 사용하고 싶은 경우 {JavaScript} 중괄호를 해주면 사용가능하다.

```JSX
// 예제 1
const name = "근영";
const element = <h1>안녕, {name}</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
);
```

   - 태그의 속성(attribute)에 값을 넣는 방법

```JSX
// 큰따옴표 사이 문자열을 넣거나
    const element = <div tabIndex="0"></div>;
// 중괄호 사이에 자바스크립트 코드를 넣으면 됨!
    const element = <img src={user.avatarUrl}></img>
```

   - 자식(Children)을 정의하는 방법

```JSX
const element = (
    <div>
        <h1>안녕하세요</h1>
        <h2>열심히 리액트를 공부해 봅시다</h2>
    </div>
)
```

  - 모든 리액트 실습은 npx react-create-app 을통하여 생성한 후 작동한다.
  - 위치를 start-app 폴더로 옮겨서 실행해야 한다!