from django.db import models

# Create your models here.
class Customer(models.Model):
    # 客户
    name = models.CharField(max_length = 200)
    # 联系电话
    phonenumber = models.CharField(max_length = 200)
    # 地址
    address = models.CharField(max_length=200)