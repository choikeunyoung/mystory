# 이차원 리스트
  1. 순회

   - 인덱스를 통해 각각 출력하면 가능하다

```python
    matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 0, 1, 2]
    ]
    print(matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3])
    print(matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3])
    print(matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3])
    # 1 2 3 4
    # 5 6 7 8 
    # 9 0 1 2
```

   - 이중 for문을 이용한 행 우선 순회 

```python
    matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 0, 1, 2]
    ]
    for i in range(3):
        for j in range(4):
            print(matrix[i][j], end=' ')
        print()
    # 1 2 3 4
    # 5 6 7 8 
    # 9 0 1 2
```

   - 이중 for문을 이용한 행 우선 순회

```python
    matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 0, 1, 2]
    ]
    for i in range(4):
        for j in range(3):
            print(matrix[j][i], end=' ')
        print()
    
    # 1 5 9
    # 2 6 0
    # 3 7 1
    # 4 8 2
```

   - 모든 요소의 합 구하기

```python
    matrix = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ]

    total = 0

    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            total += matrix[i][j]
``` 

  2. 전치
    - 행과 열을 서로 맞바꾸는 것을 의미한다.

  3. 회전
    - 이차원 리스트를 왼쪽, 오른쪽으로 90도 회전하는 경우가 존재