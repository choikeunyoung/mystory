# List

  - 같은 아이템들을 순서대로 모아둔 목록
  - Array 사용
    > const numbers = [1, 2, 3, 4, 5];

# Key
  
  - 각 객체나 아이템을 구분할 수 있는 고유한 값
  - 리스트에 존재하는 아이템을 구분하기 위한 문자열

## 여러 개의 Component 렌더링 하기
  
  - map 함수 사용 : 한 쪽의 아이템과 다른 한 쪽의 아이템을 짝지어주는 역할
    > const doubled = numbers.map((number) => number *2);

```JSX
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li>{number}</li>
);

ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);
```