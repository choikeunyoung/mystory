# React Query

- fetching, caching, 서버 데이터의 동기화를 지원해주는 라이브러리
- React Application 서버 상태를 불러오고 캐싱하고 지속적 동기화 작업을 도와주는 라이브러리
- React Component 내부에서 간단하고 직관적으로 API 사용이 가능함
- 비동기 데이터 불러오는 과정에서 발생하는 문제를 해결해주는 역할

## 기본 세팅

```JSX
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// 아래와 같이 QueryClient에 defaultOptions를 설정해서 사용할 수도 있습니다.
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       suspense: true,
//     },
//   },
// })

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
			<ReactQueryDevtools /> // 선택사항
    </QueryClientProvider>
  )
}
```

- 최상위 컴포넌트 위에 QueryClientProvider로 감싸줘야 한다.

## 캐싱(Caching)

- 데이터의 복사본을 저장 후 동일한 데이터의 재접근 속도를 높이는 것이 캐싱이다!!
- 반복적인 비동기 데이터 호출을 방지 후 불필요한 API 콜을 줄이며 서버에 부하를 줄여주는 것이 React Query이다
- React Query 기본 제공 옵션들

```JSX
   refetchOnWindowFocus, // default : true
   refetchOnMount, // default : true
   refetchOnReconnect, // default : true
   staleTime, // default : 0
   cacheTime, // default : 5분 ( 60 * 5 * 1000)
```

1. 브라우저에 포커스가 들어온 경우 (refetchOnWindowFocus)
2. 새로운 컴포넌트 마운트가 발생한 경우 (refetchOnMount)
3. 네트워크 재연결이 발생한 경우 (refetchOnReconnect)
4. staleTime
   - staleTime은 데이터가 fresh -> stale 상태로 변경되는 데 걸리는 시간
   - fresh 상태일때 Refresh 트리거가 발생해도 Refetch 가 일어나지 않음
   - 기본값이 0 이기 때문에 설정하지 않으면 Refetch 트리거 발생시 무조건 Refetch 발생
5. cacheTime
   - 데이터가 inactive한 상태일 때 캐싱된 상태로 남아있는시간
   - 특정 컴포넌트가 unmount 되면 사용된 데이터는 inactive 상태로 바뀌고, cacheTime 만큼 유지됨
   - cacheTime 이후 데이터는 가비지 콜렉터로 수집되어 메모리에서 해제됨
   - cacheTime이 지나지 않았는데 해당 데이터를 사용하는 컴포넌트가 다시 mount 되면 새로운 데이터를 fetch 해오는 동안 캐싱된 데이터를 임시로 보여줌

## Client 데이터와 Server 데이터 간 분리

- Client Data : 모달 관련 데이터, 페이지 데이터 등등 ( Redux, Recoil등 전역 상태관리 라이브러리 통해 관리)
- Server Data : 사용자 정보, 비즈니스 로직 관련 정보 등등 ( 비동기 API 호출 데이터 )

```JSX
   const { data, isLoading } = useQueries(
       ['unique-key'],
       () => {
           return api({
               url: URL,
               method: 'GET',
           });
       },
       {
           onSuccess: (data) => {
               // 데이터 처리 로직
           }
       },
       {
           onError: (error) => {
               // error 처리 로직
           }
       }
   )
```

- 위와 같은 구조를 가지고 있다
- 이를 통해 Client 데이터는 상태 관리 라이브러리가 관리하고 Server 데이터는 React-Query가 관리하는 구조로 나눈다고 생각하면 된다.

## 대표적인 기능

- React-Query에서 data fetching을 위한 기능들
- useQuery(GET)
- useMutation(PUT, UPDATE, DELETE)

### useQuery

```JSX
const { data } = useQuery(
	queryKey,
	queryFunction,
	options,
)
```

- 첫 번째 파라미터로 unique key를 포함한 배열이 들어가며 동일한 쿼리를 불러올 때 유용하게 사용됨
- 첫 파라미터 배열의 첫 요소는 unique key로 사용되고 두 번째 요소는 query 함수 내부 파라미터로 값들이 전달됨
- 두 번째 파라미터로 실제 호출하고자 하는 비동기 함수가 들어가며 함수는 Promise를 반환하는 형태여야 한다.
- 최종 반환 값은 API의 성공, 실패 여부, 반환값을 포함한 객체이다

```JSX
   function Example() {
 const { isLoading, error, data } = useQuery({
   queryKey: ['repoData'],
   queryFn: () =>
     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
       (res) => res.json(),
     ),
 })

 if (isLoading) return 'Loading...'

 if (error) return 'An error has occurred: ' + error.message
}
```

- isLoading을 통해 로딩 여부, error을 통해 에러 발생 여부, data를 통해 성공 시 데이터 반환한다.

### useQuery 동기적 실행

- enabled 옵션을 통해 동기적으로 사용이 가능함
- 세 번째 인자로 다양한 옵션 값들이 들어가며 enabled에 값을 대입하면 해당 값이 true일 때 useQuery를 동기적 실행한다.

```JSX
const { data: todoList, error, isFetching } = useQuery("todos", fetchTodoList);
const { data: nextTodo, error, isFetching } = useQuery(
 "nextTodos",
 fetchNextTodoList,
 {
   enabled: !!todoList // true가 되면 fetchNextTodoList를 실행한다
 }
);
```

- useQuery를 비동기로 여러개 실행할 경우 묶어서 사용한다

```JSX
   const result = useQueries([
 {
   queryKey: ["getRune", riot.version],
   queryFn: () => api.getRunInfo(riot.version)
 },
 {
   queryKey: ["getSpell", riot.version],
   queryFn: () => api.getSpellInfo(riot.version)
 }
]);
```

### useMutation

```JSX
const { mutate } = useMutation(
  mutationFn,
  options,
);
```

- Mutation 을 통해 데이터 업데이트 및 캐시 업데이트 요청
- POST, PUT, DELETE 요청시 사용한다.
- 첫번째 인자는 Mutation Function으로 Promise를 반환하는 함수이다. (fetch, axios)
- 두번째 인자는 useMutation에 사용되는 옵션을 지정하는 객체

```JSX
import { useMutation, useQueryClient } from 'react-query';

// 데이터 업데이트 함수
function updateUser(userId, updatedData) {
  return fetch(`/api/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
  }).then((response) => response.json());
}

function UserProfileEditor({ userId }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((updatedData) => updateUser(userId, updatedData), {
    onSuccess: () => {
      // 데이터 업데이트 후 캐시를 재로드
      queryClient.invalidateQueries(['user', userId]);
    },
  });

  const handleSubmit = (updatedData) => {
    mutate(updatedData); // mutate는 자동으로 실행되지 않기 때문에 submit 시에 mutate 실행
  };
}
```
