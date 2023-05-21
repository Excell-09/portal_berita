from rest_framework.response import Response
from rest_framework import status
from .models import News
from rest_framework.views import APIView
from .serializers import NewsSerializers
from django.contrib.auth.models import User

class NewsApi(APIView):
    def get(self, request):
        newsSerializers = NewsSerializers(News.objects.all().order_by("-updatedAt"),many=True)
        return Response(data=newsSerializers.data,status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data

        try:
            author = User.objects.get(username=data["author"])
        except User.DoesNotExist:
            return Response(data="user not found!",status=status.HTTP_404_NOT_FOUND)
        
        data["author"] = author.pk
        print(data)

        newsSerializers = NewsSerializers(data=data)

        if not newsSerializers.is_valid() :
            return Response(data=newsSerializers.errors,status=status.HTTP_400_BAD_REQUEST)
        
        newsSerializers.save()
        return Response(data="news created!",status=status.HTTP_201_CREATED)
    
    

class NewsApiId(APIView):
    def get(self,request,id):
        newsSerializers = NewsSerializers(News.objects.get(id=id))
        return Response(data=newsSerializers.data,status=status.HTTP_200_OK)    
    
    def put(self,request,id):
        data = request.data
        try:
            author = User.objects.get(username=data["author"])
        except User.DoesNotExist:
            return Response(data="user not found!",status=status.HTTP_404_NOT_FOUND)
        
        data["author"] = author.pk
        
        currentNews = News.objects.get(id=id)
        newsSerializers = NewsSerializers(currentNews,data=data)
        if not newsSerializers.is_valid():
            return Response(data=newsSerializers.errors,status=status.HTTP_400_BAD_REQUEST)
        
        newsSerializers.save()
        return Response(data=newsSerializers.data,status=status.HTTP_200_OK)
    
    def delete(self,request,id):
        data = request.data
        try:
            author = User.objects.get(username=data["author"])
        except User.DoesNotExist:
            return Response(data="user not found!",status=status.HTTP_404_NOT_FOUND)


        newsSerializers = News.objects.get(id=id)

        newsSerializers.delete()
        return Response(data="news deleted!",status=status.HTTP_204_NO_CONTENT)


