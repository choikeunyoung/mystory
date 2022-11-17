# 쿠키

- 세션
  - 사이트와 특정 브라우저 사이의 state(상태)를 유지시키는 것
  - 클라이언트가 서버에 접속하면 서버가 특정 session id를 발급하고, 클라이언트는 session id를 쿠키에 저장
    - 클라이언트가 다시 동일한 서버에 접속하면 요청과 함께 쿠키를 서버에 전달
    - 쿠키는 요청 때마다 서버에 함께 전송 되므로 서버에서 session id를 확인해 알맞은 로직을 처리
  - session id 는 세션을 구별하기 위해 필요하며, 쿠키에는 session id 만 저장
- 쿠키 Lifetime(수명)
  - Session cookie
    - 현재 세션이 종료되면 삭제
    - 브라우저 종료와 함께 세션이 삭제
  - Per
- Session in Django
  - DB sessions 저장 방식을 기본 값으로 사용
    - session 정보는 Django DB

# Login

- AuthenticationForm
  - 로그인을 위한 built-in form
    - 로그인을 하고자 하는 사용자 정보를 입력 받음(username, password)
    - ModelForm이 아닌 일반 Form을 상속 받고 있으며, request를 첫번째 인자로 취함
- login()
  - login(request, user, backend=None)
  - 인증된 사용자를 로그인
    - 유저의 ID를 세션에 저장하여 세션을 기록
  - HttpRequest 객체와 User 객체가 필요
    - 유저 정보는 반드시 인증된 유저 정보여야 함
      - authenticate()함수를 활용한 인증
      - AuthenticationForm을 활용한 is_valid
- 로그인 로직 작성
  - 일반적인 ModelForm 기반의 Create 로직과 동일하지만,
    - ModelForm 이 아닌 Form을 필수 인자 구성이 다름
    - DB에 저장하는 것 대신 세션에 유저를 기록하는 함수를 호출함
      - View 함수와 이름이 동일하여 변경하여 호출
      - 로그인 URL이 '/accounts/login/' 에서 변경되는 경우 settings.py LOGIN_URL을 변경하여야 한다.
- get_user()
  - AuthenticationForm의 인스턴스 메서드
  - 유효성 검사를 통과헀을 경우 로그인
- 세션 데이터 확인하기
  - 로그인 후 개발자 도구와 DB에서 django로부터 발급받은 세션을 확인
