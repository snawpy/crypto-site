# from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from .serializers import UserSerializer, PasswordSerializer, RegistrationSerializer
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes, authentication_classes




# ModelViewSet provides default t post, get, put, delete, rather not have all these endpoints open for user so prefer using others
# endpoints below to handle register etc
# class UserViewSetOld(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = (AllowAny, )
    # return Response({"hehe": "meow"})
    # https://stackoverflow.com/questions/28314173/using-django-rest-framework-to-serialize-custom-data-types-and-return-response


# ------------------------------------------- Registers -------------------------------------------------------------------------------------------------------------

#  ------------------  register v2 ------------------
# viewset.Viewset nice for group of functions on same object names:
class UserViewSetV2(viewsets.ViewSet):
    permission_classes = (AllowAny, )

    def register(self, request):

        print(request.data)
        user_data = {
            "username": request.data["email"],
            "password": request.data["password"],
            "email": request.data["email"]
        }

        # serializer = UserSerializer(data=request.data)     
        serializer = UserSerializer(data=user_data)
        # raise_exception=True return proper http response ir 400 instead of 200 if error
        # if serializer.is_valid(raise_exception=True):
        if serializer.is_valid(raise_exception=True):
            newClient = serializer.save()
            return Response({"Is valid register v2": serializer.data })
        else:
            # print(serializer.errors))
            # return Response(serializer.errors.values(), status=status.HTTP_400_BAD_REQUEST)
            return Response({"Serializer Not valid!": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)




# ------------------------------------------- Logged in user -------------------------------------------------------------------------------------------------------------

class CurrentUser(viewsets.ViewSet):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def update_email_and_username(self, request):
        new_email = request.data["email"]
        update_params = {
            "username": new_email, 
            "email": new_email
        }

        ## add email validation and maybe create new serializer just for it like we have with pw
        serializer = UserSerializer(instance=request.user, data=update_params, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success"})
        else:
            return Response({"status": "error"})

    def update_password(self, request):
        # https://stackoverflow.com/questions/38845051/how-to-update-user-password-in-django-rest-framework
        # pacholik answer

        serializer = PasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            if request.user.check_password(old_password):
                request.user.set_password(serializer.data.get("new_password"))
                request.user.save()
                return Response({"status": "success"})
            else:
                return Response({"status": "success", "message": "Password did not match"})
        else:
            return Response({"status": "serializer not valid"})


    def update_details(self, request):

        # todo: should just do this in the serializer
        update_params = {
            "username": request.data["email"], 
            "email": request.data["email"],
            "first_name": request.data["first_name"],            
            "last_name": request.data["last_name"]
        }

        serializer = UserSerializer(instance=request.user, data=update_params, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success"})
        else:
            return Response({"status": "error"})
