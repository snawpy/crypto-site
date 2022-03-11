from rest_framework import serializers
from .models import Crypto, AllCoinsExternal
import json

#  todo - add userId to link these to users nar mean
class CryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crypto
        fields = ('id','name', 'ticker', 'quantity', 'bought_in_price', 'bought_in_currency')


class AllCoinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllCoinsExternal
        fields = ('coins',)
