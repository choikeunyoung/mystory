# 객체지향 프로그래밍

# 클래스
  - 한 클래스의 모든 인스턴스라도 똑같은 값을 가지고 있는 속성
  - 클래스 선언 내부에서 정의
  - <classnamne>.<name> 으로 접근 및 할당

```python
    class Circle:
        pi = 3.14

    c1 = Circle()
    print(Circle.pi)
    c2 = Circle()

```

   - 인스턴스와 클래스 간의 이름 공간
     - 클래스를 정의화면, 클래스와 해당하는 이름 공간 생성
     - 인스턴스를 만들면, 인스턴스 객체가 생성되고 이름 공간 생성
     - 인스턴스를

   - 클래스 메소드
     - 클래스가 사용할 메소드
     - @classmethod 데코레이터를 사용하여 정의 (데코레이터 : 함수를 어떤 함수로 꾸며서 새로운 기능 부여)
     - 호출 시, 첫번째 인자로 클래스(cls)가 전달됨
   
   - 스태틱 메소드
     - 인스턴스 변수, 클래스 변수를 전혀 다루지 않는 메소드

   - 언제 사용하는가?
     - 속성을 다루지 않고 단지 기능

```python
    class MyClass

        @classmethod << 이 부분이 classmethod
        def class_method(cls, arg1, ...)
    MyClass.static_method(...)
```

```python
    class MyClass:
        class_variabe = '클래스변수'

        def __init__(self):
            self.instance_variable = '인스턴스 변수'

        # 인스턴스 메소드
        def instance_method(self):
            return self, self.instance_variable

        @classmethod
        def class_method(cls):
            return cls, cls.class_variable

        @staticmethod
        def static_method():
            return '스태틱'

    c1 = MyClass()
    print("인스턴스 변수 호출", c1.instance_variable)
    # 인스턴스 변수 호출 인스턴스 변수
    print('인스턴스 메서드 호출', c1.instance_method())
    # 인스턴스 메서드 호출 (<__main__.MyClass object at 0x0000013ADEDD6D00>, '인스턴스 변수')
    print('클래스 메서드 호출', c1.class_method())
    # 클래스 메서드 호출 (<class '__main__.MyClass'>, '클래스변수')
    print('스태틱 메서드 호출', c1.static_method())
    # 스태틱 메서드 호출 스태틱
```

   - 상속 관련 함수와 메소드
     - super() : 자식클래스에서 부모클래스를 사용하고 싶은 경우

   - 상속 정리
     - 파이썬의 모든 클래스는 object로부터 상속됨
     - 부모 클래스의 모든 요소(속성, 메소드)가 상속됨
     - super()를 통해 부모 클래스의 요소를 호출할 수 있음
     - 메소드 오버라이딩을 통해 자식 클래스에서 재정의 가능함
     - 상속관계에서의 이름 공간은 인스턴스, 

   - 다중 상속
     - 두개 이상의 클래스를 상속 받는 경우
     - 상속 받은 모든 클래스의 요소를 활용 가능함
     - 중복된 속성이나 메서드가 있는 경우 상속 순서에 의해 결정됨

   - 다형성 이란?
     - 여러 모양을 뜻하는 그리스어
     - 동일한 메서드

