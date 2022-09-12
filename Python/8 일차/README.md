# 파이썬 응용/심화
  - List Comprehension
    - 표현식과 제어문을 통해 특정한 값을 가진 리스트를 간결하게 생성
```
      [<expression> for <변수> in <iterable>]
      [<expresssion> for <변수> in <iterable> if <조건식>]
```

```python
  cubic_list = []
  for number in range(1, 4):
    cubic_list.append(number**3)
  print(cubic_list)
  -----------------------------------
  [number**3 for number in range(1, 4)] # List Comprehension 으로 치환
```

  - Dictionary Comprehension
    - 표현식과 제어문을 통해 특정한 값을 가진 리스트를 간결하게 생성
```
      {key: value for <변수> in <iterable>}
      {key: value for <변수> in <iterable> if <조건식>}
```

```python
  cubic_list = []
  for number in range(1, 4):
    cubic_list.append(number**3)
  print(cubic_list)
  -----------------------------------
  {number : number**3 for number in range(1, 4)} # Dictionary Comprehension 으로 치환
```

  - lambda [parameter]
    - 표현식을 계산한 결과값을 반환하는 함수, 이름이 없는 함수여서 익명함수
    - return 문을 가질 수 없음
    - 간편 조건문 외 조건문이나 반복문을 가질 수 없음.
    - 함수를 정의해서 사용하는 것보다 간결하게 사용 가능
    - def를 사용할 수 없는 곳에서도 사용가능

```python
    numbers = [1, 2, 5, 10, 3, 9 ,12]

    result = []
    for number sin numbers:
        if number % 3 == 0:
            result.append(number)
    print(number)

    def multiple_3(n):
        return n % 3 == 0 # 조건이 참일경우 return
    print(list(map(multiple_3, numbers)))
    # 위 함수는 계속 사용되지 않고, map서만 사용된다.
    # 임시적인 함수를 만들기 위해 lambda를 사용
    
    # 람다 활용
    print(list(map(lambda n: n*3, numbers)))
```

  - filter(function, iterable)
    - 순회 가능한 데이터구조의 모든 요소에 함수 적용 후 그 결과가 True인 것들을 filter object로 반환

```python
numbers = [1, 2, 5, 10, 3, 9 ,12]

    result = []
    for number sin numbers:
        if number % 3 == 0:
            result.append(number)
    print(number)

    print(filter(lambda n: n%3==0, numbers))
    # <filter object at 0x000002245BD36EE0>
```

  - annotation
    - 동적 타입 언어인 파이썬에서 정적 타입으로 변경해주는 것이 아닌 그냥 설명

```python
# 변수 어노테이션
    a: int = 3 
    print(a)

    # 함수 어노테이션
    def add(x: int, y: int) -> int:
        return x + y 

    print(add(7, 4))
    print(add('hi ', 'hello'))

    # 함수 어노테이션
    def add2(x, y):
        return x + y 
    print(add2(7, 4))
```

# 패키지 설치 관리
  - 파이썬 표준 라이브러리(Python Standard Library, PSL)
    - 기본적으로 파이썬에 내장된 라이브러리

  - 파이썬 패키지 관리자(pip)
    - PyPI(Python Package Index)에 저장된 외부 패키지들 설치를 도와주는 패키지 관리 시스템
    - 패키지 설치 및 명령어 (최신 버전/ 특정 버전/ 최소 버전 등 다양한 버전 설치 가능)
    - 이미 설치된 패키지에 대해서는 알람을 띄우고 아무 행동도 하지 않음
      - pip install <패키지이름> => 패키지 설치
      - pip list => 설치된 패키지 리스트 출력
      - pip uninstall <패키지이름> => 패키지 삭제
      - pip show <패키지이림> => 패키지 정보 확인
      - pip freeze => 설치된 패키지의 비슷한 목록을 만들지만, pip install 에서 사용되는 형식으로 requirements.txt 으로 목록을 만들어줌.
      - pip install -r requirment.txt => 패키지 목록 일괄 설치
      - pip install --upgrade pip => pip 버전 업그레이드