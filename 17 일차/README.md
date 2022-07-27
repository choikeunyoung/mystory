# 리스트 컴프리헨션


# 문자열
  1. 문자열 슬라이싱
   - 문자열은 immutable(변경 불가능한) 자료형 => 순회가능
```python
    s = 'abcdefghi'
    s[2:5] => 'cde'
    s[-6:-2] => 'defg"
    s[2:-4] => 'cde'
    s[2:5:2] => 'ce'
    s[-6:-1:3] => 'dg'
    s[2:5:-1] => ''
    s[5:2:-1] => 'fed'
    s[:3] => 'abc'
    s[5:] => 'fghi'
```
   - 문자열 길이를 알면 - index 값을 구하기 쉽다 

  2. 문자열 메서드
   - .split(기준 문자)
     - 문자열을 기준 문자로 나누어 리스트로 반환
     - 괄호안에 값이 없을 시 공백 기준으로 설정
```python
    word = "I play the piano"
    print(word.split())
    #["I","play","the","piano"]
```
   - .strip(제거할 문자)
     - 문자열 양쪽 끝 특정 문자를 모두 제거한 새로운 문자열 반환
     - 괄호안에 아무것도 넣지 않을 경우 자동으로 공백 제거
     - 제거할 문자를 여러 개 넣으면 모든 문자들을 제거

```python
    word = "Hello World "
    print(word.strip())
    # Hello World
    word = "aHello Worlda"
    print(word.strip("a"))
    # Hello World
    print(word.strip("Hd"))
    # ello Worl
    word = "Hello Worlddddddd "
    print(word.strip("d"))
```
   - .find(찾는 문자)
     - 특정 문자가 처음으로 나타나는 위치를 반환
```python
    word = "apple"
    print(word.find("p"))
    # 1
    print(word.find("k"))
    # -1
```
   - .index(찾는 문자)
     - 특정 문자가 처음으로 나타나는 위치를 반환
     - 찾는 문자가 없으면 오류 발생
```python
    print(word.find("p"))
    # 1
    print(word.find("k"))
    # ValueError : substring not found
```
  3. 아스키(ASCII) 코드