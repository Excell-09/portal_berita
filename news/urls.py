from  django.urls import path
from . import views

urlpatterns = [
    path('news/<str:id>',views.NewsApiId.as_view()),
    path("news",views.NewsApi.as_view()),
]

