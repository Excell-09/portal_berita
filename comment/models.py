from django.db import models
from django.contrib.auth.models import User
from news.models import News

# Create your models here.
class Comment(models.Model):
    news=models.ForeignKey(News,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    comment=models.CharField(max_length=255)

    def __str__(self) -> str:
        return "{}. {} - {} = {}".format(self.id, self.news.title[:20],self.user,self.comment[:10])