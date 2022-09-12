class MyClass:
    class_variable = '클래스변수'

    def __init__(self):
        self.instance_variable = '인스턴스 변수'
     # 인스턴스 메소드
    def instance_method(self):
        return self, self.instance_variable
    @classmethod
    def class_method(self):
        return self, self.class_variable
    @staticmethod
    def static_method():
        return ''

c1 = MyClass()
print("인스턴스 변수 호출", c1.instance_variable)
    # 인스턴스 변수 호출 인스턴스 변수
print('인스턴스 메서드 호출', c1.instance_method())
    # 인스턴스 메서드 호출 (<__main__.MyClass object at >)
print('클래스 메서드 호출', c1.class_method())
    
print('스태틱 메서드 호출', c1.static_method())