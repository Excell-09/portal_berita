from django.urls import path
from .views import postComment
urlpatterns = [
    path("comment/<str:id>",postComment)
]
