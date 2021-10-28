from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    # path('coins/', views.index),
    re_path(r'coins/.+', views.index),
    path('password/', views.index),
    path('account/', views.index),
    path('delete-account/', views.index),
    
    # prefer not cathup, allows any url to pass and cant do trailing slash / requires exact url
    # re_path(r'^(?:.*)/?$', views.index), 
]