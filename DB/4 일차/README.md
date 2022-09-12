# CASE
  - CASE문은 특정 상황에서 데이터를 변환하여 활용할 수 있음
  - ELSE를 생략하는 경우 NULL값이 저장됨
```SQL
    CASE
        WHEN 조건식 THEN 식
        WHEN 조건식 THEN 식
        ELSE 식

    SELECT
        id,
        CASE
            WHEN gender = 1 THEN '남자'
            WHEN gender = 2 THEN '여자'
        END
    FROM healthcare
    LIMIT 5;
    -- id CASE
    -- -- ----
    -- 1 남자
    -- 2 여자
    -- 3 여자
    -- 4 남자
    -- 5 여자

    SELECT 
        id,
        CASE
            WHEN smoking = 1 THEN '비흡연자'
            WHEN smoking = 2 THEN '흡연자'
            WHEN smoking = 3 THEN '헤비스모커'
            ELSE '무응답'
        END
    FROM healthcare
    LIMIT 50;

    -- 나이에 따라서 구분
    -- 청소년 (~18), 청년(~40), 중장년(~90)

    SELECT
        first_name,
        last_name,
        CASE
            WHEN age <= 18 THEN '청소년'
            WHEN age <= 40 THEN '청년'
            WHEN age <= 90 THEN '중장년'
            ELSE '노년'
        END
    FROM users
    LIMIT 10;
```
# 서브쿼리
  - 서브 쿼리는 특정한 값을 메인 쿼리에 반환하여 활용하는 것
  - 실제 테이블에 없는 기준을 이용한 검색이 가능함
  - 이부분채워야함!!

  - 단일행 서브쿼리
    - 서브쿼리의 결과가 0 또는 1개인 경우
    - 단일행 비교 연산자와 함께 사용하는 경우
```SQL
    -- users에서 가장 나이가 작은 사람의 수는?
    -- 1
    SELECT age, COUNT(*)
    FROM users
    GROUP BY age
    ORDER BY age
    LIMIT 1;

    -- 확인해보기
    SELECT MIN(age)
    FROM users;
    -- MIN(age)
    -- --------
    -- 15

    SELECT COUNT(*)
    FROM users
    WHERE age = 15;
    -- COUNT(*)
    -- --------
    -- 39

    SELECT COUNT(*)
    FROM users
    WHERE age = (SELECT MIN(age) FROM users);
    -- COUNT(*)    위 부분이 서브쿼리
    -- --------
    -- 39

    -- users에서 평균 계좌 잔고가 높은 사람의 수는?
    SELECT COUNT(*)
    FROM users
    WHERE balance > (SELECT AVG(balance) FROM users);

    -- users에서 유은정과 같은 지역에 사는 사람의 수는?

    SELECT 
        country
    FROM users
    WHERE last_name='유' AND first_name = '은정'

    SELECT
        COUNT(*)
    FROM users
    WHERE country = (SELECT country FROM users WHERE last_name = '유' AND first_name = '은정');

    -- 전체 인원과 평균 연봉, 평균 나이를 출력하세요
    SELECT
        COUNT(*),
        AVG(balance)
        AVG(age)
    FROM users;

    SELECT
        (SELECT COUNT(*) FROM users) AS 총인원,
        (SELECT AVG(balance) FROM users) AS 평균연봉;
    FROM users;

    -- UPDATE에서 활용
    UPDATE users
    SET balance = (SELECT AVG(balance) FROM users);
```

  - 다중행 서브쿼리
    - 서브쿼리 결과가 2개 이상인 경우
    - 다중행 비교 연산자와 함께 사용(IN, EXISTS, ALL, ANY, SOME 등 사용)

```SQL
    -- users에서 이은정과 같은 지역에 사는 사람의 수는?
    SELECT country
    FROM users
    WHERE last_name = '이' AND first_name = '은정';

    SELECT COUNT(*)
    FROM users
    WHERE country = (SELECT country FROM users
    WHERE last_name = '이' AND first_name = '은정');
    -- COUNT(*)
    -- --------
    -- 115

    -- 이부분 채워!!

    -- IN을 사용하여 여러 행의 값들에서 존재하는지 등을 뽑아와야 한다.
    SELECT COUNT(*)
    FROM users
    WHERE country IN (SELECT country FROM users
    WHERE last_name = '이' AND first_name = '은정');
    -- COUNT(*)
    -- --------
    -- 218

    -- 특정 성씨에서 가장 어린 사람들의 이름과 나이
    SELECT first_name,last_name, age
    FROM users
    WHERE age = (SELECT MIN(age) FROM users GROUP BY last_name ORDER BY last_name ASC);

    -- 특정 성씨별로 가장 적은 나이
    SELECT
        last_name,
        MIN(age)
    FROM users
    GROUP BY last_name;

    -- 특정 성씨별로 가장 적은 나이 사람 모두
    SELECT
        last_name,
        first_name,
        age
    FROM users
    WHERE (last_nam, age) IN (SELECT last_name, MIN(age) FROM users GROUP BY last_name) ORDER BY last_name;
```

  - 다중컬럼 서브쿼리
    - 특정 성씨에서 가장 어린 사람들의 이름과 나이
```SQL
    SELECT
        last_name,
        first_name,
        age
    FROM users
    WHERE (last_name, age) IN (
        SELECT last_name, MIN(age)
        FROM users
        GROUP BY last_name)
    ORDER BY last_name;
```