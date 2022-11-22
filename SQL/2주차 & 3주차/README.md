# SQL 시작하기

- SELECT 문으로 데이터 검색하기
- WHERE 문으로 조건에 맞는 데이터 검색하기
- ORDER BY 문으로 데이터 정렬하기
- 와일드카드로 문자열 검색하기
- 데이터 그룹화 다루기
- 테이블 생성하고 데이터 조작하기
- SQL Server에서 다루는 자료형 정리하기

## SELECT 문으로 데이터 검색하기

- SELECT 데이터베이스에서 데이터를 검색하는 구문

  - 구조
    > SELECT <col> FROM [table] WHERE [value]
  - col

    - 테이블에서 조회 하고 싶은 데이터의 필드 리스트를 col 에 넣고 여러개를 원할 경우 콤마(,)로 구분
    - 테이블 전체를 조회할 경우 _ 사용 => SLECT _ FROM
      > SELECT top 1 from ~ 조회된 데이터의 1행 반환
      > SELECT top @n from ~ 조회된 데이터의 변수 행만큼 반환
      > SELECT count(\*) from ~ 조회된 데이터의 ROW 카운트 반환(몇개의 데이터가 있는지 조회)

  - table
    - 데이터가 저장된 테이블 이름을 적는다.
    - 스키마명 적용하여 기술 가능.
    - [table] AS [별칭] 으로 별명으로 사용 가능
    - 링크드 조회시 [링크명].[DB명].[스키마명].[테이블명] 적음.

## WHERE 문으로 조건에 맞는 데이터 검색하기

- 원하는 조건에 맞는 행을 검색하는 필터 역할

  - value

    - 필요한 정보만 조회 할 수 있도록 필터 적용
    - =, >=, <=, >, < 사용
    - AND, OR, IN, NOT IN 사용
    - Like 명령을 사용한 구문 검색 사용 가능(와일드 카드)
    - 범위 검색시 Between 사용 가능

  - 다양한 연산자

    | 연산자  | Column B                                    |
    | ------- | ------------------------------------------- |
    | ALL     | 모든 비교 집합이 TRUE이면 TRUE              |
    | AND     | 두 부울 표현식이 모두 TRUE이면 TRUE         |
    | ANY     | 비교 집합 중 하나라도 TRUE이면 TRUE         |
    | BETWEEN | 피연산자가 범위 내에 있으면 TRUE            |
    | EXISTS  | 하위 쿼리에 행이 포함되면 TRUE              |
    | IN      | 피연산자가 리스트 중 하나라도 포함되면 TRUE |
    | LIKE    | 피연산자가 패턴과 일치하면 TRUE             |
    | NOT     | 부울 연산자를 반대로 실행                   |
    | OR      | 하나의 부울식이 TRUE 이면 TRUE              |
    | SOME    | 비교 집합 중 일부가 TRUE 이면 TRUE          |

    - 여러 값을 동일한 열에 비교해야할 경우 (IN Operater)
      > SELECT _ FROM nasdaq_company WHERE symbol = 'AAPL' or symbol = 'MSFT' or symbol = 'TSLA'
      > SELECT _ FROM nasdaq_company WHERE symbol in ('AAPL', 'MSFT', 'TSLA')
      > 위 두개는 같은 효과를 가짐

  - WHERE Like '%value%'
    - %조건% : 앞뒤 어느 문자열이 와도 상관없이 조건문에 포함된 데이터 반환
    - \_(underscore) : 어떤 것이든 한 문자 허용
    - [(text)] : []안에 적힌 글자만 허용
    - [^(text)] : ^뒤에 적힌 글자를 제외한 글자들 허용

## ORDER BY 문으로 데이터 정렬하기

- 데이터를 정렬하기 위해서 사용하는 역할

> SELECT [COL] FROM [TABLE] WHERE [COL] = [조건 값] ORDER BY [COL][asc, desc]

- ASC : 오름 차순 (낮은 수부터 높은 수로)
- DESC : 내림 차순 (높은 수부터 낮은 수로)
- 2개이상 열로 정렬할 경우 앞에 나오는 조건을 먼저 통과 시킨 후 그 중에서 같은 값이 있을 경우 뒤의 조건으로 정렬시킨다.

- OFFSET : 검색결과에서 지정한 행 개수만큼 건너뛰고 출력
  > SELECT \* FROM nasdaq_company ORDER BY symbol OFFSET 1000 ROWS => 1001번째 행부터 검색, ORDER BY 구문이랑 같이 사용해 줘야함
- FETCH NEXT : 몇개를 출력한지 지정해 주는 명령어 OFFSET과 같이사용해야 한다.
  > SELECT \* FROM nasdaq_company ORDER BY symbol OFFSET 1000 ROWS FETCH NEXT 10 ROWS ONLY

## 와일드카드로 문자열 검색하기

- 쿼리는 정확하게 조건을 입력하여 사용 한다.
- 조건을 몰라 일부만을 검색하기도 해야하기 때문에 LIKE를 이용하여 와일드카드로 지정된 패턴과 일치하는 문자열, 날짜, 시간 등으로 검색한다.

> SELECT [열] FROM [테이블] WHERE [열] LIKE [조건값]

- %로 특정 문자열을 포함하는 문자열 검색하기

  - 특정한 문자를 포함하는지 여부는 %로 검색한다.
  - 0개 이상의 문자열과 대치하고 %의 위치에 따라서 특정 문자열이 포함된 문자열 검색이 가능

  - A% : A로 시작하는 모든 문자열

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE 'A%'

  - %A : A로 끝나는 모든 문자열

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE '%A'

  - %A% : A를 포함하는 모든 문자열

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE '%A%'

  - 특정 문자열을 제외하고 데이터를 검색하려면 NOT LIKE 사용

    > SELECT \* FROM nasdaq_company WHERE symbol NOT LIKE '%A%'

  - % 가 들어있는 문장을 검색하고 싶을 경우

    > SELECT \* FROM 테이블 WHERE col LIKE '%%%' (X)

  - % 는 0개 이상의 문자를 의미하는 예약어기 때문에 불가능하다.
  - ESCAPE라는 방법을 사용한다.

    > SELECT \* FROM 테이블 WHERE col LIKE '%#%%' ESCAPE '#'
    > 위 방법을 사용할 경우 #이 빠지게 되며 '#%' > '%' 를 검색할 수 있게된다

  - ESCAPE 는 #,&,!,/ 다양한 문자를 사용할 수 있지만 실제검색하는 데이터에 있는 문자가 들어있으면 검색이 제대로 안된다.

- \_로 특정 문자열을 포함하는 특정 길이 문자열 검색하기

  - 해당 문자열을 포함하는 특정 길이문자열을 검색하는데 사용

  - A\_ : A로 시작하면서 뒤의 글자가 무엇이든 상관없으며 전체 글자 수는 2개인 문자열

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE 'A\_'

  - \_A : A로 끝나면서 앞의 문자는 무엇이든 상관없으며 전체 글자수는 2개인 문자열

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE '\_A'

  - \_A\_ : 세 글자 중 가운데 글자만 A이며 앞뒤로는 무엇이든 상관없는 문자열
    > SELECT \* FROM nasdaq_company WHERE symbol LIKE '\_A\_'

- \_와 %를 조합하여 사용자가 원하는 데이터의 문자열을 가져올 수 있다.

  - A_C로 시작하는 symbol 검색 : 이후 문자열은 무엇이든 가능
    > SELECT \* FROM nasdaq\*company WHERE symobol LIKE 'A_C%'
  - \_\_F로 시작하는 symbol 검색 : 이후 문자열 무엇이든 가능
    > SELECT \* FROM nasdaq_company WHERE symobol LIKE '\_\_F%'
  - A로 시작하는 symbol 검색 : 마지막 문자열만 L\_이면 무엇이든 가능
    > SELECT \* FROM nasdaq_company WHERE symobol LIKE 'A%L\_'

- []로 문자나 문자 범위를 지정해 문자열 검색

  - 문자나 문자 범위를 지정해 문자열을 검색하는 [] 를 사용한다

  - 1번 문자가 A, 2번 문자가 A or B or C 인 symbol 검색

    > SELECT _ FROM nasdaq_company WHERE symbol LIKE 'A[A, B, C]'
    > 또는
    > SELECT _ FROM nasdaq_company WHERE symbol LIKE 'A[A-C]'

  - A로 시작하며 2번째 문자가 A-C or G or M-R 인 symbol 검색

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE 'A[A-C, G, M-R]'

  - 문자나 범위 제외한 문자열 검색하기 => []은 NOT이 아닌 ^을 사용
  - [^a]%는 첫 글짜가 A가 아닌 모든 문자열 검색한다.

  - A로 시작하며 2번째 문자가 A,B,C가 아닌 문자열을 검색
    > SELECT _ FROM nasdaq_company WHERE symbol LIKE 'A[^A, ^B, ^C]'
    > 또는
    > SELECT _ FROM nasdaq_company WHERE symbol LIKE 'A[^a-c]'

- 다양한 방법으로 와일드카드 사용

  - A로 시작하면서 2번째 문자는 C, P를 포함하고 3번째 문자는 T를 포함하지 않으며 마지막 문자는 W로 끝나는 문자열 검색

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE 'A[C, P][^t]%W'

  - 1번째 문자는 A, 2번쨰 문자는 A-C, 3번쨰 문자는 아무거나, 4번째 문자는 0인 문자열

    > SELECT \* FROM nasdaq_company WHERE symbol LIKE 'A[A-C]\_0%'

## 데이터 그룹화 다루기

- 데이터를 검색할 때 공통 그룹의 정보를 확인해야 하는데 데이터를 그룹화 하는 방법이 GROUP BY 문이다.
- GROUP BY 문과 HAVING 문을 사용해서 그룹화 한다.

  > SELECT [열] FROM [테이블] WHERE [열] = [조건값] GROUP BY [열] HAVING [열] = [조건값]
  >
  > GROUPY BY : 데이터를 그룹화하는 구문
  >
  > [열] 그룹화 기준의 열 이름을 지정한다. 1개 이상 그룹화할 수 있다.
  >
  > [HAVING] : WHERE 와 비슷한 기능을 하며 그룹화된 결과의 필터링 기능을 한다.
  >
  > [조건값] : HAVING 필터에 적용할 조건값을 입력한다.
