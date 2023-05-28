from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import AuthenticationSerializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email


        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["POST"])
def register(request):
    data = request.data
    
    newUser = AuthenticationSerializers(data=data)
    
    if not newUser.is_valid():
        return Response(data=newUser.errors,status=status.HTTP_200_OK)
    
    newUser.save()
    user = User.objects.get(username=newUser.data["username"])
    user.set_password(data["password"])
    user.save()
    return Response(data="register succesfully!",status=status.HTTP_200_OK)


@api_view(["POST"])
def logout(request):
    token = RefreshToken(request.data['refresh'])
    token.blacklist()
    return Response(data="Logout!",status=status.HTTP_200_OK)
