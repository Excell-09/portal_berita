from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CommentSerializer
from django.contrib.auth.models import User
from news.models import News
# Create your views here.


@api_view(["post"])
def postComment(request,id):
    data = request.data

    try:
        user = User.objects.get(username=data["user"])
    except User.DoesNotExist:
        return Response(data="user not found!",status=status.HTTP_404_NOT_FOUND)
    
    try:
        news = News.objects.get(id=id)
    except:
        return Response(data="news not found!",status=status.HTTP_404_NOT_FOUND)

    data["user"] = user.pk
    data["news"] = news.pk
    commentSerializer = CommentSerializer(data=data)

    if not commentSerializer.is_valid():
        return Response(data=commentSerializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    commentSerializer.save()

    return Response(data="comment posted!",status=status.HTTP_201_CREATED)
