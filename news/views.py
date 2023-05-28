from rest_framework.response import Response
from rest_framework import status
from .models import News
from rest_framework.views import APIView
from .serializers import NewsSerializers
from django.contrib.auth.models import User
from comment.serializers import CommentSerializer
from comment.models import Comment
from authentication.serializers import AuthenticationSerializersToPublic
import cloudinary.uploader

class NewsApi(APIView):
    def get(self, request):
        
        category_query =  request.query_params["category"]

        
        if category_query == "all" :
            newsSerializers = NewsSerializers(News.objects.all().order_by("-updatedAt"),many=True)
            return Response(data=newsSerializers.data,status=status.HTTP_200_OK)
        else :
            newsSerializersWithCategory = NewsSerializers(News.objects.filter(categories=category_query).order_by("-updatedAt"),many=True)
            return Response(data=newsSerializersWithCategory.data,status=status.HTTP_200_OK)
        
       
    
    def post(self, request):
        data = request.data
        
        try:
            author = User.objects.get(username=data["author"])
        except User.DoesNotExist:
            return Response(data="user not found!",status=status.HTTP_404_NOT_FOUND)
                
        image = cloudinary.uploader.upload(data["imageUrl"])
        image_url = image["secure_url"]  # Retrieve the public URL of the uploaded image


        data["author"] = author.pk
        data["imageUrl"] = image_url   

        newsSerializers = NewsSerializers(data=data)

        if not newsSerializers.is_valid() :
            return Response(data=newsSerializers.errors,status=status.HTTP_400_BAD_REQUEST)
        
        newsSerializers.save()
        return Response(data="news created!",status=status.HTTP_201_CREATED)
    
    

class NewsApiId(APIView):
    def get(self,request,id):
        try:
            newsSerializers = NewsSerializers(News.objects.get(id=id))
        except:
            return Response(data="news not found!",status=status.HTTP_404_NOT_FOUND)   
        
        commentSerializers = CommentSerializer(Comment.objects.filter(news=newsSerializers.data["id"]).order_by("-id"),many=True)
        
        response_data = newsSerializers.data
        response_data["comments"] = commentSerializers.data 

        for comment in response_data["comments"]:
            comment["user"] = AuthenticationSerializersToPublic(User.objects.get(id=comment["user"])).data

        newsSerializersRelated = NewsSerializers(News.objects.filter(categories=response_data["categories"]).order_by("-updatedAt"),many=True).data
        response_data["related_news"] = newsSerializersRelated


        author = AuthenticationSerializersToPublic(User.objects.get(id=response_data["author"]))
        response_data["author"] = author.data
        
        return Response(data=response_data,status=status.HTTP_200_OK)    
    
    def put(self,request,id):
        data = request.data
        try:
            author = User.objects.get(username=data["author"])
        except User.DoesNotExist:
            return Response(data="user not found!",status=status.HTTP_404_NOT_FOUND)
        
        data["author"] = author.pk
        
        try:
            currentNews = News.objects.get(id=id)
            newsSerializers = NewsSerializers(currentNews,data=data)
        except:
            return Response(data="news not found!",status=status.HTTP_404_NOT_FOUND) 
        
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

        
        try:
            newsSerializers = News.objects.get(id=id)
        except:
            return Response(data="news not found!",status=status.HTTP_404_NOT_FOUND) 

        newsSerializers.delete()
        return Response(data="news deleted!",status=status.HTTP_204_NO_CONTENT)


