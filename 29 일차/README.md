# 기본 함수와 연산
  - 문자열 함수
    - SUBSTR(문자열, start, length) : 문자열 자르기
      - 시작 인덱스는 1, 마지막 인덱스는 -1
    - TRIM(문자열), LTRIM(문자열), RTRIM(문자열) : 문자열 공백 제거
    - LENGTH(문자열) : 문자열 길이
    - REPLACE(문자열, 패턴, 변경값) : 패턴에 일치하는 부분 변경
    - UPPER(문자열), LOWER(문자열) : 대소문자 변경
    - || : 문자열 합치기(concatenation)

```SQL
    SELECT * FROM users LIMIT 1;
    -- 문자열 합치기 ||
    -- (성+이름) 출력, 5명만
    SELECT
        last_name || first_name 이름,
        age,
        country,
        phone,
        balance
    FROM users
    LIMIT 5;

    -- 문자열 길이 LENGTH
    SELECT
        LENGTH(first_name),
        first_name
    FROM users
    LIMIT 5;

    -- 문자열 변경 REPLACE
    -- 016-7280-2855 => 01672802855

    SELECT
        first_name,
        phone,
        REPLACE(phone, '-', '')
    FROM users
    LIMIT 5;
```
  - 숫자 함수
    - ABS(숫자) : 절대 값
    - ROUND(숫자) : 반올림
    - SIGN(숫자) : 부호 (양수 1, 음수 -1, 0 0)
    - MOD(숫자1, 숫자2) : 숫자1을 숫자2로 나눈 나머지
    - CEIL(숫자), FLOOR(숫자), ROUND(숫자, 자리) : 올림, 내림, 반올림
    - POWER(숫자1, 숫자2) : 숫자1의 숫자2 제곱
    - SQRT(숫자) : 제곱근

```SQL
    SELECT MOD(5, 2)
    FROM users
    LIMIT 1;

    -- 올림, 내림, 반올림
    SELECT CEIL(3.14), FLOOR(3.14), ROUND(3.14)
    FROM users
    LIMIT 1;

    -- 9의 제곱근
    SELECT SQRT(9)
    FROM users
    LIMIT 1;

    -- 9^2
    SELECT POWER(9,2)
    FROM users
    LIMIT 1;
```
  - 산술 연산자
    - +, -, *, / 와 같은 산술 연산자와 우선 순위를 지정하는 () 기호를 연산에 활용 가능함

```SQL
    SELECT age+1 FROM users;
```

# GROUP BY
  - ALIAS
    - 칼럼명이나 테이블명이 너무 길거나 다른 명칭으로 확인하고 싶을 때는 ALIAS 활용
    - AS를 생략하여 공백으로 표현 가능
    - 별칭에 공백, 특수문자 등이 있는 경우 따옴표로 묶어서표기
```SQL
    SELECT last_name 성 FROM users;
    SELECT last_name AS 성 FROM users;
    SELECT last_name AS 성 FROM users WHERE 성= '김';
```
  - GROUP BY 는 결과가 정렬되지 않고 기존 순서와 바뀐다.
  - 정렬을 해서 보고 싶을 경우 ORDER BY를 활용!!
  - SELECT 문의 optional 절
  - 행 집합에서 요약 행 집합을 만듦
  - 선택된 행 그룹을 하나 이상 열 값으로 요약 행으로 만듬
  - **문장에 WHERE 절이 포함된 경우 반드시 WHERE 절 뒤에 작성해야 함**
  > SELECT * FROM 테이블이름 GROUP BY 
  
  - 지정된 컬럼의 값이 같은 행들로 묶임
  - 집계함수와 활용하였을 때 의미가 있음
  - 그룹화된 각각의 그룹이 하나의 집합으로 집계함수의 인수로 넘겨짐
  > SELECT * FROM users GROUP BY last_name

  - users에서 각 성(last_name)씨가 몇 명씩 있는지 조회한다면?

```SQL
    -- 성별 갯수
    SELECT last_name, COUNT(*) 
    FROM users
    GROUP BY last_name;

    -- GROUP BY에서 활용하는 컬럼을 제외하고는
    -- 집계함수를 쓰세요.
    SELECT last_name, age, COUNT(*)
    FROM users
    GROUP BY last_name;

    SELECT last_name, age
    FROM users
    WHERE last_name = '곽'

    -- GROUP BY WHERE를 쓰고 싶다.
    -- 100번 이상 등장한 성만 출력하고 싶음.
    SELECT last_name, COUNT(last_name)
    FROM users
    WHERE COUNT(last_name) > 100
    GROUP BY last_name;
    
    -- 오류가 발생한다. WHERE 로 실행하는 순서가 GROUP BY보다 앞에 있기 때문이다.

    -- 조건에 따른 GROUP 할려면 HAVING을 사용한다!
    SELECT last_name, COUNT(last_name)
    FROM users
    GROUP BY last_name
    HAVING COUNT(last_name) > 100;
```
  - SELECT 문장 실행 순서
    - FROM => WHERE => GROUP BY => HAVING => SELECT => ORDER BY
      - FROM 테이블을 대상으로
      - WHERE 제약조건에 맞춰서 뽑아
      - GROUP BY 그룹화 한다
      - HAVING 그룹 중에 조건과 맞는 것 만을
      - SELECT 조회하여
      - ORDER BY 정렬하고
      - LIMIT/OFFSET 특정 위치의 값을 가져온다.
  
  - ALTER TABLE
    1. 테이블 이름 변경
    2. 새로운 column 추가
    3. column 이름 수정
    4. column 삭제

```SQL
    -- 1. 테이블 이름 변경
    ALTER TABLE table_name
    RENAME TO new_name;

    -- 2. 새로운 column 추가
    ALTER TABLE table_name
    ADD COLUMN column_definition;

    -- 3. column 이름 수정
    ALTER TABLE table_name
    RENAME COLUMN current_name TO new_name;

    -- 4. column 삭제
    ALTER TABLE table_name
    DROP COLUMN column_name;
```