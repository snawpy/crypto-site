from .models import Crypto
from .serializers import CryptoSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication

# from rest_framework.decorators import permission_classes
# from rest_framework.decorators import authentication_classes
# from rest_framework.decorators import api_view

class CryptoListCreate(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication, )
    # permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = Crypto.objects.all()
    serializer_class = CryptoSerializer

# @api_view(['GET'])
# @authentication_classes((TokenAuthentication,))
# @permission_classes((IsAuthenticated,))
# def CryptoListTest(request):
#     # authentication_classes = (TokenAuthentication, )
#     # permission_classes = (IsAuthenticated, )
#     queryset = Crypto.objects.all()
#     serializer_class = CryptoSerializer
