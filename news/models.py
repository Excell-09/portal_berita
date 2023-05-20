from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class News(models.Model):
    categories_news=(
        ("sport","Sport"),
        ("politics","Politics"),
        ("war","War"),
        ("economy","Economy"),
        ("technology","Technology"),
    )
    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    title=models.CharField(max_length=255)
    article=models.TextField()
    imageUrl=models.URLField()
    createdAt=models.DateTimeField(auto_now_add=True)
    updatedAt=models.DateTimeField(auto_now=True)
    categories=models.CharField(max_length=20,choices=categories_news)
    author=models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title