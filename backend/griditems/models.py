from django.db import models


# Create your models here.
class Griditems(models.Model):
    item_ch = models.CharField(max_length=200)
    item_eng = models.CharField(max_length=200)
    item_describe = models.CharField(max_length=500)


class dict_map(models.Model):
    dict_ch = models.CharField(max_length=200)
    dict_eng = models.CharField(max_length=200)
