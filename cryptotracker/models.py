from django.db import models

class Crypto(models.Model):
    name = models.CharField(max_length=100)
    ticker = models.CharField(max_length=5)
    quantity = models.DecimalField(max_digits=30, decimal_places=15)
    bought_in_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bought_in_currency = models.CharField(max_length=3, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # User = blabla to be added after finish tut


class AllCoinsExternal(models.Model):
    coins = models.TextField()
    # coins = models.JSONField() #todo when switch over to mysql from sqlite