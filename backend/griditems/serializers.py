from rest_framework import serializers
from .models import Griditems


class GriditemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Griditems
        fields = ('id', 'item_ch', 'item_eng', 'item_describe')

