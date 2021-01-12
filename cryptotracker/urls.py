from django.urls import path
from . import views

urlpatterns = [
    # path('api/cryptotracker/', views.CryptoListCreate.as_view()),

    path('', views.CryptoListCreate.as_view()),

    
    # path('', views.CryptoListTest),
]