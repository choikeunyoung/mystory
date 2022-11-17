# 1. 게시글 생성

> 사용자에게 HTML Form 제공, 입력받은 데이터를 (ModelForm 로직으로 변경) 처리

```python
from django import forms
from .models import Myself

class MyselfForm(forms.ModelForm):

    class Meta:
        model = Myself
        fields = ['title','content']
```
# 1-1 urls.py

```python

```

# 1-2 views.py

```python
def create(reuqest):
    myself_form = MyselfForm()
    context = {
        'review_form' : myself_form
    }
    return render(reuqest, 'myself/new.html', context)
```