from django.urls import path
from . import views

urlpatterns = [
    path('all-crypto/', views.AllCrypto.as_view()),
        # path('', views.CryptoListTest),
]