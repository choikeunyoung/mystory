# Join
  - 관계형 데이터베이스의 가장 큰 장점이자 핵심적인기능
  - 일반적으로 데이터베이스는 하나의 테이블에 많은 데이터를 저장하는 것이 아닌 여러 테이블로 나눠 저장하게 되며, 여러 테이블을 결합(Join)하여 출력하여 활용
  - 일반적으로 레코드는 기본(PK)나 외래키(FK) 값의 관계에 의해 결합함
  - Join을 사용할 경우 테이블 수 -1 만큼 조인한다

  -INNER JOIN : 조건에 일치하는(동일한 값이 있는) 행만 반환
  > SELECT * FROM 테이블1 [INNER] JOIN 테이블2 ON 테이블1.column = 테이블2.column;
  
  ![1](images/1.PNG)

```sql
    - 사용자와 각각의 역할을 출력하시오
    SELECT *
    FROM users JOIN role
        ON users.role_id = role.id;

    -- 1|관리자|1|1|admin
    -- 2|김철수|2|2|staff
    -- 3|이영희|2|2|staff

    - staff(2) 사용자(users)를 역할과 함께 출력하시오
    SELECT staff FROM users JOIN role
        ON users.role_id = role.id
    WHERE role.id = 2;

    -- 2|김철수|2|2|staff
    -- 3|이영희|2|2|staff

    - 이름을 내림차순으로 출력하세요.
    SELECT * FROM users JOIN role
        ON users.role_id = role.id
    ORDER BY users.name DESC;
```
  - OUTER JOIN : 동일한 값이 없는 데이터도 반환할 때 사용
  > SELECT * FROM 테이블1 [LEFT|RIGHT|FULL] OUTER JOIN 테이블2 ON 테이블1.column = 테이블2.column

  ![2](images/2.PNG)

```sql
    -- LEFT OUTER JOIN
    SELECT *
    FROM articles LEFT OUTER JOIN users
        ON articles.user_id = users.id;
    -- 1|1번글|111|1|1|관리자|1
    -- 2|2번글|222|2|2|김철수|2
    -- 3|3번글|333|1|1|관리자|1
    -- 4|4번글|444||||

    -- 위 결과값에서 NULL 제거 시

    SELECT * FROM articles LEFT OUTER JOIN users ON users.id = articles.user_id WHERE users.id != "";

    -- 혹은

    SELECT * FROM articles LEFT OUTER JOIN users ON users.id = articles.user_id WHERE articles.user_id IS NOT NULL;

    -- 1|1번글|111|1|1|관리자|1
    -- 2|2번글|222|2|2|김철수|2
    -- 3|3번글|333|1|1|관리자|1

    -- FULL OUTER JOIN

    SELECT *
    FROM articles FULL OUTER JOIN users
        ON articles.user_id = users.id;

    -- 1|1번글|111|1|1|관리자|1
    -- 2|2번글|222|2|2|김철수|2
    -- 3|3번글|333|1|1|관리자|1
    -- 4|4번글|444||||
    -- ||||3|이영희|2

    -- FULL OUTER JOIN 은 LEFT 더하고 아래 RIGHT 를 더해주는 형식! 나머지 빈 공간은 NULL
```

  - CROSS JOIN : 모든 가능한 경우의 수의 JOIN 
  > SELECT * FROM 테이블1 CROSS JOIN 테이블2;

```sql
SELECT * FROM users CROSS JOIN role;

-- 1|관리자|1|1|admin
-- 1|관리자|1|2|staff
-- 1|관리자|1|3|student
-- 2|김철수|2|1|admin
-- 2|김철수|2|2|staff
-- 2|김철수|2|3|student
-- 3|이영희|2|1|admin
-- 3|이영희|2|2|staff
-- 3|이영희|2|3|student
```

# Join 과 SubQuery 차이점
  - 서브 쿼리는 복잡한 SQL 쿼리문에 많이 사용된다.
  - Join 의 경우 여러 개의 쿼리를 필요로 하지 않는다.
  - Join 의 경우 쿼리문이 복잡해지더라도 서브 쿼리에 비하여 읽어내기가 수월함.

  - 서브 쿼리를 조인으로 대체가능 한 경우
    - 내부 쿼리가 단일 값을 반환하거나 1개의 열과 1개의 행을 반환하는 경우 서브쿼리 => Join 으로 대체 가능함 ( 스칼라 서브쿼리 ) 
    - IN 연산자 내부에 서브 쿼리가 있는 경우 조인으로 변경 가능함. ( NOT IN 도 포함 )
    - EXISTS 와 NOT EXISTS 연산자 안에 있는 서브쿼리

  - 서브 쿼리를 조인으로 대체할 수 없는 경우
    - GROUP BY가 있는 FROM의 쿼리