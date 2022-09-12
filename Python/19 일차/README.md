# 완전탐색 (Exhaustive Search)
  1. 무식하게 풀기(Brute-force)
   - 모든 경우의 수를 탐색하여 문제를 해결하는 방식
   - 무식하게 밀어붙인다는 뜻
   - 가장 단순한 풀이 기법이며, 단순 조건문과 반복문을 이용해서 풀 수 있다.
   - 복잡한 알고리즘 보다는, 아이디어를 어떻게 코드로 구현할 것인지가 중요하다.

  2. 뎉타 탐색(Delta Search)
   - 이차원 리스트의 인덱스의 조작을 통해서 상하좌우 탐색을 한다.
   - 행과 열의 변량인 -1, +1을 델타(delta)라고 한다.

```python
    delta = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for i in range(4):
        for j in range(4):
            # i , j => 0, 0 ~ 3, 3
            # i , j = 1, 1
            for d in delta:
                print(i + d[0], j + d[1])
```

   - 이차원 리스트의 상하좌우 탐색 정리

```python
    dx = [-1, 1, 0 ,0]
    dy = [0, 0, -1, 1]

    # 이차원 리스트 순회
    for x in range(n):
        for y in range(m):
            for i in range(4): # 델타값을 이용해 상하좌우 이동
                nx = x + dx[i]
                ny = y + dy[i]
                if 0 <= nx < n and 0 <= ny < m: # 범위를 벗어나지 않을 경우 실행
                    x = nx
                    y = ny
```