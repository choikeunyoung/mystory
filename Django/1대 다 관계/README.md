# RDB에서의 관계

- 1:1 (프로필-User)

  - One-to-one relationships
  - 한 테이블의 레코드 하나가 다른 테이블의 레코드 단 한개와 관련된 경우

- 1:N (댓글과 사용자의 글)

  - one-to-many relationships
  - 한 테이블의 0개 이상의 레코드가 다른 테이블의 레코드 한 개와 관련된 경우
  - 기준 테이블에 따라(1:N, One-to-many relationships)이라고도 함

- M:N
  - Many-to-many relationships
  - 한 테이블의 0개 이상의 레코드가 다른 테이블의 0개 이상의 레코드와 관련된 경우
  - 양쪽 모두에서 1:N 관계를 가짐

# Foreign Key

- 특징

  - 키를 사용하여 부모 테이블의 유일한 값을 참조 (참조 무결성)
    - 참조 무결성 : 데이터베이스 관계 모델에서 관련된 2개의 테이블 간의 일관성
    - 외래키가 선언된 테이블의 외래 키 속성의 값은 해당 테이블의 기본 키 값으로 존재
  - 외래 키의 값이 반드시 부모 테이블의 기본 키 일 필요는 없지만 유일한 값이어야 한다.

- 1:N (Article - Comment) 댓글 - Model

  - 모델 관계 설정

    - 게시판의 게시글과 1:N 관계를 나타낼 수 있는 댓글 구현
    - 1:N 관계에서 댓글을 담당할 Article 모델은 1, Comment 모델은 N이 될 것
      - 게시글은 갯을을 0개 이상 가진다.
        - 게시글(1)은 여러 댓글(N)을 가진다.
        - 게시글(1)은 댓글을 가지지 않을 수도 있다.
      - 댓글은 반드시 하나의 게시글에 속한다.
        | id | content | created_at | updated_at | Article의 id |
        | --- | ----------- | ---------- | ---------- | ------------ |
        | 1 | 댓글 내용 1 | ... | ... | 1 |
        | 2 | 댓글 내용 2 | ... | ... | 3 |
        | 3 | 댓글 내용 3 | ... | ... | 3 |

> Django Relationship fields 종류
>
> OneToOneField() => A one-to-one relationship
>
> ForeignKey() => A one-to-many relationship
>
> ManyToManyField() => A many-to-many relationship

- ForeignKey(to, on_delete, \*\*options)

  - A one-to-many relationship을 담당하는 Django의 모델 필드 클래스
  - Django 모델에서 관계형 데이터베이스 외래 키 속성을 담당
  - 2개의 필수 위치 인자가 필요

    - 참조하는 model class
    - on_delete 옵션

  - ForeignKey arguments - on_delete

    - 외래 키가 참조하는 객체가 사라졌을 때, 외래 키를 가진 객체를 어떻게 처리할 지를 정의
    - 데이터 무결성을 위해서 매우 중요한 설정
    - on_delete 옵션 값
      - CASCADE : 부모 객체(참조 된 객체)가 삭제 됐을 때 이를 참조하는 객체도 삭제
      - PROTECT, SET_NULL, SET_DEFAULT ... 등 여러 옵션 값들이 존재
      - 수업에서는 CASCADE 값만 사용할 예정

  - Comment 모델 정의
    - 외래 키 필드는 ForeignKey 클래스를 작성하는 위치와 관계없이 필드의 마지막에 작성됨
    - ForeignKey() 클래스의 인스턴스 이름은 참조하는 모델 클래스 이름의 단수형(소문자)로 작성하는 것을 권장
