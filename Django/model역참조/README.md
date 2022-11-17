# 모델에서 외래키를 역참조해 정렬


  - 모델에서 외래키 관계인 Store에서 Review의 개수를 이용하여 정렬을 하고싶었다.

``` python
# models.py

class Store(models.Model):
    name = models.TextField(max_length=30)
    lat = models.TextField()
    lon = models.TextField()    
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_stores', default=1)
    # 판매 품목
    items = models.TextField()
    # 상세 위치
    detail = models.TextField()
    following_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='following_stores')

def user_directory_path(instance, filename):
    return f'images/{instance.store.team.name}/{instance.store.detail}/{instance.store.name}/{filename}'

class StoreImage(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='store_image')
    image = ProcessedImageField(upload_to=user_directory_path, blank=True,
                                processors=[ResizeToFill(1200, 960)],
                                format='JPEG',
                                options={'quality': 80})

class Review(models.Model):
    tags = models.ManyToManyField('Tag', related_name='tag_articles', blank=True)
    store_name = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='store_reviews', blank=True, null=True)
    restaurant_name = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='restaurant_reviews', blank=True, null=True)
    content = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_reviews')
    grade = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
```

  - index 페이지에 view를 통해서 외래키를 역참조하여 정렬한 것을 보고싶어서 방법을 찾아봄

``` python
def index(request):
    teams = Team.objects.all()
    articles = Article.objects.order_by('-pk')
    ex_news = news().replace("<b>", "").replace("<\/b>", "").replace("&quot;", "'").replace("&apos;", "'")
    temp_news = json.loads(ex_news)
    context = {
        "teams": teams,
        "articles":articles[:8],
        "temp_news": temp_news,
    }
    return render(request, "articles/index.html", context)
```

  - related_name__(필드이름) => related_name 을 사용하여 역참조를 한 후 _ 2개를 사용하면 외래키의 테이블을 역으로 불러와 정렬할 수 있다.
  - cnt_reviews라는 변수에 Review 모델을 가져옴

``` python
store_review = Store.objects.annotate(cnt_reviews=Count('store_review')).order_by('-cnt_reviews')[:5]
```

  - 정렬이 잘 나오는 결과를 볼 수 있었으며 좀더 복잡한 방식으로 외래키를 참조한 정렬도 가능한 것을 알 수 있었다.

[참고사이트](https://a-littlecoding.tistory.com/38)