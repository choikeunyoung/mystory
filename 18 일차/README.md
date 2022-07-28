# 딕셔너리
  
  1. 해시 테이블
   - 딕셔너리 자료구조가 파이썬에 내장 되어 있다. (Non-sequence & Key-Value)
```python    
    {
        "name" : "Kyle",
        "gender" : "male",
        "address" : "Seoul"
        # Key는 immutable(변경 불가능)
    }
```
   - 해시 함수 : 임의 길이의 데이터를 고정 길이의 데이터로 매핑
   - 해시 : 해시 함수를 통해 얻어진 값

   ![1](images/1.png)

   - 파이썬 리스트와 딕셔너리 비교

   ![2](images/)

   - 딕셔너리 사용은 언제 할까?
     - 1. 리스트를 사용하기 힘든 경우
     - 2. 데이터에 빠른 접근 탐색이 필요한 경우
     - 3. 현실 세계의 대부분 데이터를 다룰 경우

  2. 딕셔너리 기본 문법
   - 선언
```python
    a = {
        "name" : "Kyle",
        "gender" : "male",
        "address" : "Seoul"
    }
    print(a)
    
```
   - 삽입/수정
```python
    a = {
        "name" : "Kyle",
        "gender" : "male",
        "address" : "Seoul"
    }
    a["job"] = "coach"
    print(a)
```

  3. 딕셔너리 메서드