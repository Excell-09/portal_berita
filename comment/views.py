from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CommentSerializer
# Create your views here.

@api_view(["post"])
def postComment(request):
    return Response(data="post comment",status=status.HTTP_201_CREATED)
