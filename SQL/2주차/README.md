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
