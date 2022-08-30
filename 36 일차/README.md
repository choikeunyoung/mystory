**스타일을 입히기 위해서는 대상이 필요하며 Markup 을 통해서 대상을 지정해준다. 주로 div와 span을 사용한다.**

# CSS 기본 스타일
  - 크기 단위
    - px(픽셀)
      - 모니터 해상도의 한 화소인 "픽셀" 기준
      - 픽셀의 크기는 변하지 않기 때문에 고정적인 단위
    - %
      - 백분율 단위
      - 가변적인 레이아웃에서 자주 사용
    - em
      - (바로 위, 부모 요소에 대한) 상속의 영향을 받음
      - 배수 단위, 요소에 지정된 사이즈에 상대적인 사이즈를 가짐
    - rem
      - (바로 위, 부모요소에 대한) 상속의 영향을 받지 않음
      - 최상위 요소(html)의 사이즐르 기준으로 배수 단위를 가짐
    - 크기 단위(viewport)
      - 웹 페이지 방문한 유저에게 보이는 웹 컨텐츠의 영역(디바이스 화면)
      - 상대적인 크기에 따라 사이즈가 결정됨
      - vw, vh, vmin, vmax
    - 색상 단위
      - 색상 키워드(background-color: red;)
        - 대소문자 구분 하지 않음
        - red, blue, black , gray 과 같이 특정 색을 직접 글자로 나타냄
      - RGB 색상(background-color: rgb(0, 255, 0);)
        - 16진수 표기법 혹은 함수 표기법으로 특정 색을 표현
      - HSL 색상(background-color: hsl(0, 100%, 50%);)
        - 색상 채도, 명도를 통해 특정 색을 표현하는 방식

    - 색상 키워드
    - RGB 색상
      - '#' + 16진수로 표현
      - rgb() 함수 표현법
    - HSL 색상
      - 색상, 채도, 명도
    - a 는 alpha()투명도

    - 텍스트 
      - 서체(font-family), 서체 스타일(font-style, font-weight 등)
      - 자간(letter-spacing), 단어 간격(word-sapcing)
    - 컬러(color), 배경(background-images, background-color)
    - 기타 HTML 태그별 스타일링
      - 목록(li), 표(table)

## CSS Selectors
  - 기본 선택자
    - 전체 선택자, 요소 선택자
    - 클래스 선택자, 아이디 선택자, 속성 선택자
  - 요소 선택자
    - HTML 태그를 직접 선택
  - 클래스 선택자
    - 마침표(.)문자로 시작하며, 해당 클래스가 적용된 항목을 선택
  - 아이디(id) 선택자
    - '#' 문자로 시작하며, 해당 아이디가 적용된 항목을 선택
    - 일반적으로 한 문서에 한개만 존재
  
  - CSS 적용 우선순위 (cascading order)
    1. 중요도(importance) : 사용시 주의
    > !important
    2. 우선 순위(Specificy)
      - 인라인 > id > class, 속성, pseudo-class > 요소, pseudo-element
    3. CSS 파일 로딩 순서

```python
    # * : 가장 쉽고 모든 것에 해당된다.
    # 요소 선택 : * 보다는 덜한데...
    # 클래스 : 요소보다는 덜한데...
    # id : 문서 하나!
    # 인라인 스타일 : 굳이 사용한다면 우선순위가 높은 것이길...
    # !important : 이거 쓰면 다 망가져...
```
  - CSS 상속
    - CSS 는 상속을 통해 부모 요소의 속성을 자식에게 상속한다.
      - 속성 중에는 상속이 되는 것과 되지 않는 것들이 있다.
      - 되는 것 : Text 관련 요소 => font, color, text-align, opacity, visibility
      - 되지 않는 것 : Box model 관련 요소 => weight, height, margin, padding, border, box-sizing, display, position 관련 요소

  - CSS 원칙
    - 모든 요소는 네모(박스모델)이고, 위에서부터 아래로, 왼쪽에서 오른쪽으로 쌓인다. ( 좌측 상단에 배치 )
    - 크기와 배치가 달라질 수 밖에 없다.
    - Inline Direction : 한줄 배치
    - block Direction : 블록으로 쌓인다
    - Margin : 여백
    - Border : 테두리 영역
    - Content : 글이나 이미지 등 실제 요소 들어가는 곳
    - Padding : 내부 여백
  - Box model 구성 (margin/padding) (시계 방향으로 대입)
```CSS
    .margin-1{
        margin: 10px; (모두 마진 10px)
    }
    .margin-2{
        margin: 10px 20px; (상하 10px, 좌우 20px)
    }
    .margin-3{
        margin: 10px 20px 30px; (상 10px, 하 30px, 좌우 20px)
    }
    .margin-4{
        margin: 10px 20px 30px 40px; (상 10px 하 30px 좌 40px 우 20px)
    }
```
  - BOX model (border)

```CSS
  .border {
    border-width: 2px;
    border-style: dashed;
    border-color: black;
  }
```

## CSS Display
  - display : block
    - 줄 바꿈이 일어나는 요소
    - 화면 크기 전체의 가로 폭을 차지한다.
    - 블록 레벨 요소 안에 인라인 레벨 요소가 들어갈 수 있음

  - display : inline
    - margin-top, margin-bottom 을 줄 수 없다.
    - 줄 바꿈이 일어나지 않는 행의 일부 요소
    - content 너비만큼 가로 폭을 차지한다.
    - width, height, margin-top, margin-bottom을 지정할 수 없다.
    - 상하 여백은 line-height로 지정한다
    
  - 대표적인 블록 레벨 요소
    > div / ul, ol, li / p / hr/ form 등

  - 대표적인 인라인 레벨 요소
    > span / a / img / input, label / b, em, i, strong 등

  - text-align => text 요소에 사용하는 정렬 (block 에 사용 X)
  - margin => block 요소에 사용하는 것
  
  - display : inline-block
    - block 과 inline 레벨 요소의 특징을 모두 가짐
    - inline처럼 한 줄에 표시할 수 있고, block처럼 width, height, margin 속성을 모두 지정할 수 있음

  - display : none
    - 해당 요소를 화면에 표시하지 않고, 공간조차 부여되지 않음
    - 이와 비슷한 visibility : hidden은 해당 요소가 공간은 차지하나 화면에 표시만 하지 않는다.