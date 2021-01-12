from django.urls import path, include
# from . import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from .views import CurrentUser, UserViewSetV2 #UserViewSetOld,

# router = routers.SimpleRouter() # todo check vs  DefaultRouter
# router.register('', UserViewSetOld)


urlpatterns = [
    path('login/', obtain_auth_token),
    
    path('current-user/', CurrentUser.as_view({'get': 'get'})),
    path('current-user/update-email', CurrentUser.as_view({'put': 'update_email_and_username'})),
    path('current-user/update-password', CurrentUser.as_view({'put': 'update_password'})),
    path('current-user/update-details', CurrentUser.as_view({'put': 'update_details'})),


    path('registerv2', UserViewSetV2.as_view({'post': 'register'})),
    
    # currently used to register (want to move it to its own seperate end point)
    # path('', include(router.urls))
]