-- 실습용 테이블 생성

CREATE TABLE users (
    id INT,
    NAME TEXT,
    role_id INT
);

INSERT INTO users VALUES
    (1, '관리자', 1),
    (2, '김철수', 2),
    (3, '이영희', 2);

-- 1|관리자|1
-- 2|김철수|2
-- 3|이영희|2

CREATE TABLE role (
    id INT,
    title TEXT
);

INSERT  INTO role VALUES
    (1, 'admin'),
    (2, 'staff'),
    (3, 'student');

-- 1|admin
-- 2|staff
-- 3|student

CREATE TABLE articles (
    id INT,
    title TEXT,
    content INT,
    user_id
);

INSERT INTO articles VALUES
    (1, '1번글', 111, 1),
    (2, '2번글', 222, 2),
    (3, '3번글', 333, 1),
    (4, '4번글', 444, NULL);

-- 1|1번글|111|1
-- 2|2번글|222|2
-- 3|3번글|333|1
-- 4|4번글|444|

SELECT * FROM users;
SELECT * FROM role;
SELECT * FROM articles;

-- INNER JOIN

SELECT * FROM users JOIN role ON users.role_id = role.id;

-- 1|관리자|1|1|admin
-- 2|김철수|2|2|staff
-- 3|이영희|2|2|staff

SELECT * FROM users JOIN role ON users.role_id = role.id WHERE role_id = 2;

-- 2|김철수|2|2|staff
-- 3|이영희|2|2|staff

SELECT * FROM users JOIN role ON users.role_id = role.id ORDER BY users.NAME DESC;

-- 1|관리자|1|1|admin
-- 2|김철수|2|2|staff
-- 3|이영희|2|2|staff

-- OUTER JOIN

SELECT * FROM articles LEFT OUTER JOIN users ON articles.user_id = users.id;
-- 1|1번글|111|1|1|관리자|1
-- 2|2번글|222|2|2|김철수|2
-- 3|3번글|333|1|1|관리자|1
-- 4|4번글|444||||

-- NULL 제거

SELECT * FROM articles LEFT OUTER JOIN users ON users.id = articles.user_id WHERE articles.user_id != '';

-- 1|1번글|111|1|1|관리자|1
-- 2|2번글|222|2|2|김철수|2
-- 3|3번글|333|1|1|관리자|1

-- 혹은

SELECT * FROM articles LEFT OUTER JOIN users ON users.id = articles.user_id WHERE articles.user_id IS NOT NULL;

-- FULL OUTER JOIN

SELECT * FROM articles FULL OUTER JOIN users ON users.id = articles.user_id;

-- 1|1번글|111|1|1|관리자|1
-- 2|2번글|222|2|2|김철수|2
-- 3|3번글|333|1|1|관리자|1
-- 4|4번글|444||||
-- ||||3|이영희|2

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