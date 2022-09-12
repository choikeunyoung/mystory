# CRUD ( Create, Read, Update, Delete)
  - INSERT : INSERT INTO 테이블이름 (column1, column2, ...) VALUES (value1, value2);
  - SELECT : SELECT * FROM 테이블이름 WHERE 조건;
  - UPDATE : UPDATE 테이블이름 SET column1=value1, column2=value2 WHERE 조건;
  - DELETE : DELETE FROM 테이블이름 WHERE 조건;
  - WHERE 절 비교 연산자
    - 비교 연산자
      - =, >, >=, <, <= 는 숫자 혹은 문자 값의  대/소, 동일 여부를 확인하는 연산자
    - 논리 연산자
      - AND : 앞에 조건과 뒤에 오는 조건이 모두 참인 경우
      - OR : 앞의 조건이나 뒤의 조건이 참인 경우
      - NOT : 뒤에 오는 조건의 결과를 반대로
  - SQL 사용할 수 있는 연산자
    - BETWEEN 값1 AND 값2 : 값1과 값2 사이의 비교 (값1 <= 비교값 <= 값2)
    - IN (값1, 값2, ...) : 목록 중에 값이 하나라도 일치하면 성공
    - LIKE 
      - 비교 문자열과 형태 일치 (아래서 자세히 다룸)
      - 와일드카드 (% : 0개 이상 문자, _ : 1개 단일 문자)
    - IS NULL / IS NOT NULL : NULL 여부를 확인할 때는 항상 = 대신 IS 사용
    - 부정 연산자
      - 같지 않다. (!=, ^=, <>)
      - ~와 같지 않다. (NOT column명 = )
      - ~보다 크지 않다. (NOT column명 >)

  - 연산자 우선순위
    1. 괄호 ()
    2. NOT
    3. 비교 연산자, SQL
    4. AND
    5. OR

# SQLite Aggregate Functions
  - Aggregate function (집계 함수)
    - 값 집합에 대한 계산을 수행하고 단일 값을 반환
    - 여러 행으로부터 하나의 결과값을 반환하는 함수
  - SELECT 문에서만 사용됨
    - 테이블 전체 행 수를 구하는 COUNT(*)
    - age 컬럼 전체 평균 값을 구하는 AVG(age)

  - COUNT : 그룹의 항목 수를 가져옴
    - 30세 이상인 사람들의 숫자
    > SELECT COUNT(*) FROM users WHERE age >= 30;

  - MIN : 
    - 전체 중에 가장 작은 나이
    > SELECT MIN(age) FROM users;
    - '이'씨 중에 가장 작은 나이
    > SELECT MIN(age),first_name FROM users WHERE last_name = '이';
    - '이'씨 중에 가장 작은 나이를 가진 사람의 이름과 계좌 잔고
    > SELECT MIN(age),first_name, balance FROM users WHERE last_name = '이';

  - AVG : 모든 값의 평균을 계산
    - 30살 이상인 사람들의 평균 나이
    > SELECT AVG(age) FROM users WHERE age >= 30;
    - 30살 이상인 사람들의 평균 잔액 조회
    > SELECT AVG(balance) FROM users WHERE age >= 30;

  - MAX : 
    - 계좌 잔액이 가장 높은 사람과 그 액수를 조회
    > SELECT first_name, MAX(balance) FROM users;
  - LIKE 
    - 패턴 일치를 기반으로 데이터를 조회하는 방법
    - SQLite는 패턴 구성을 위한 2개의 wildcards를 제공
      - %(percent sign) : 0 개 이상의 문자
      - _(underscore) : 임의의 단일 문자
      - wildcars 사용 예시
        > SELECT * FROM 테이블이름 WHERE 컬럼 LIKE '패턴';
        > 2% : 2로 시작
        > %2 : 2로 끝남
        > %2% : 어디든 2가 들어간다
        > _2% : 앞에 한글자가 들어가고 2로 시작하는 값
        > 1___ : 1로 시작하는 값 혹은 문자 4자리인 값
        > 2_%_% / 2__% : 2로 시작하고 적어도 3자리인 값
  - ORDER BY
    - 조회 결과 집합을 정렬
    - SELECT 문에 추가하여 사용
    - 정렬 순서를 위한 2개의 keyword를 제공
      - ASC - 오름차순 (default)
        - 나이 오름차순
        > SELECT first_name FROM users ORDER BY age ASC LIMIT 10;
        - 나이 순, 성 순으로 오름차순 정렬하여 상위 10개만 조회
        > SELECT * FROM users ORDER BY age, last_name LIMIT 10;

      - DESC - 내림차순
        - 계좌 잔액 순 내림차순
        > SELECT last_name, first_name, balance FROM users ORDER BY balance DESC LIMIT 10;
        - 계좌 잔액 내림차순, 성 오름차순
        > SELECT last_name, first_name, balance FROM users ORDER BY
        balance DESC, last_name ASC LIMIT 10; 
# **실습**
  - users 테이블에서 age 가 30 이상인 유저의 모든 컬럼 정보를 조회
  > SELECT * FROM users WHERE age>=30;

  - users 테이블에서 age 가 30 이상인 사람들의 이름
  > SELECT first_name FROM users WHERE age >= 30;

  - users 테이블에서 age 가 30 이상인 사람들의 이름 3명
  > SELECT first_name FROM users WHERE age >= 30 LIMIT 3;

  - users 테이블에서 age 가 30 이상, 성이 '김'인 사람만 조회
  > SELECT first_name FROM users WHERE last_name = '김' AND age >= 30;
  
  **주의!**
    - WHERE HEIGHT = 175 OR HEIGHT = 183 AND WEIGHT = 80
    > 키가 175 이거나, 키가 183 이면서 몸무게가 80인 사람
    - WHERE (HEIGHT = 175 OR HEIGHT = 183) AND WEIGHT = 80
    > 키가 175 이거나 183이고 몸무게가 80인 사람