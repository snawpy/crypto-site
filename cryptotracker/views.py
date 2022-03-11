from cryptotracker.models import AllCoinsExternal, Crypto
from .serializers import CryptoSerializer, AllCoinsSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
import json


class AllCrypto(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        crypto = AllCoinsExternal.objects.get(pk=1)
        serializer = AllCoinsSerializer(crypto, many=False)
        return Response(json.loads(serializer.data["coins"]))