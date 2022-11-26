function MyButton(props) {
    const [isClicked, setIsClicked] = React.useState(false);

    return React.createElement(
        'button',
        { onClick: () => setIsClicked(true) },
        isClicked ? 'Clicked!' : 'Click here!'
    )
}
// root id 값을 가진 값을 가져옴
const domContainer = document.querySelector("#root");
// 
ReactDOM.render(React.createElement(MyButton), domContainer);