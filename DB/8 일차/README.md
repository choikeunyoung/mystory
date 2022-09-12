# QuerySet API
  - gt == WHERE id > 4
    - Entry.objects.filter(id__gt=4) greater than
    - Entry.objects.filter(id__gte=4) greater than equal
    - Entry.objects.filter(id__lt=4) less than
    - Entry.objects.filter(id__lte=4) less than equal
  
  - in == WHERE(Query) IN
    - Entry.objects.filter(id__in=[1, 3, 4]) => SELECT ... WHERE id IN (1, 3, 4);
    - Entry.objects.filter(headline__in='abc') => SELECT ... WHERE headline IN ('a','b','c');
  
  - startswith == LIKE %
    - Entry.objects.filter(headline__startswith='Lennon') => SELECT ... WHERE headline LIKE 'Lennon%';
  
  - istartswith == ILIKE % (대소문자 구분안함)
    - Entry.objects.filter(headline_istartswith='Lennon') => SELECT ... WHERE headline ILIKE 'Lennon%';
  
  - contains
    - Entry.objects.filter(headline__contains='Lennon') => SELECT ... WHERE headline LIKE '%Lennon%';
    - Entry.objects.filter(headline__icontains='Lennon') => SELECT ... WHERE headline LIKE '%Lennon%';
  
  - range
    - import datetime
    start_date = datetime.date(2005, 1, 1)
    end_date = datetime.date(2005, 3, 31)
    Entry.objects.filter(    )
  
  - 복합 활용 (서브 쿼리)
    - inner_qs = Blog.objects.filter(name__contains='Cheddar')
    - entries = Entry.objects.filter(blog__in=inner_qs)
  
  - 활용
    - Entry.objects.all()[0] => SELECT ... WHERE LIMIT 1;
    - Entry.objects.all()[n:m] => SELECT ... WHERE LIMIT OFFSET
  
  - 활용
    - Entry.objects.order_by('id') => SELECT ... ORDER BY id ASC;
    - Entry.objects.order_by('-id') => SELECT ... ORDER BY id DESC;

# ORM
  - Foreign Key(외래키)
    - 키를 사용하여 부모 테이블의 유일한 값을 참조 (참조 무결성)
      - 데이터베이스 관계 모델에서 관련된 2개의 테이블 간의 일관성
    - 외래 키의 값이 반드시 부모 테이블의 기본 키일 필요는 없지만 유일한 값이어야 함

  - models.ForeignKey 필드
    - 2개의 필수 위치 인자
      - Model class : 참조하는 모델
      - on_delete : 외래 키가 참조하는 객체가 삭제되었을 때 처리 방식
        - CASECADE : 부모 객체가 삭제 됐을 때 이를 참조하는 객체도 삭제 (댓글 삭제)
        - PROTECT : 삭제되지 않음
        - SET_NULL : NULL 설정
        - SET_DEFAULT : 기본 값 설정

```python
    class Genre(models.Model):
        name = models.CharField(max_length=30)

    class Artist(models.Model):
        name = models.CharField(max_length=30)
        debut = models.DateField()
    
    class Album(models.Mode):
        name = models.CharField(max_length=30)
        genre = models.ForeignKey('Genre',
    on_delete=models.CASCADE)
        artist = models.ForeignKey('Artist',on_delete=models.CASCADE)
```

  - 참조와 역참조

```python
    # 1. 참조
    album = Album.objects.get(1)
    album.artist
    album.genre
    # album.name

    # 2. 역참조
    genre = Genre.objects.get(1)
    genre.album_set.all() # album의 인스턴스가 담긴 쿼리셋 => 1:N 이기 때문
```