from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from griditems.models import Griditems
from griditems.serializers import GriditemsSerializer
from rest_framework import renderers
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .jieba import trans_into_db_word, excel_into_db


class GriditemsFilter(django_filters.FilterSet):
    class Meta:
        model = Griditems
        fields = ('item_ch', 'item_eng',)


class GriditemsViewSet(viewsets.ModelViewSet):
    queryset = Griditems.objects.all()
    serializer_class = GriditemsSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_class = GriditemsFilter
    search_fields = ('item_ch', 'item_eng',)
    ordering_fields = ('item_ch', 'item_eng',)


@api_view(['GET','POST'])
def jiebafenci(request):
    """"""
    """"""
    if request.method == 'GET':
        wordlist = trans_into_db_word(request.GET.get('word'))
        return Response(wordlist)


@api_view(['POST'])
@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        up_file = request.data['file']
        new_file = './'+up_file.name
        try:
            with open(new_file, 'wb+') as destination:
                for chunk in up_file.chunks():
                    destination.write(chunk)
                destination.close()
                return  Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def DumpInto(request):
    if request.method == 'POST':
        print(request.body)
        filename = eval(request.body.decode()).get('filename')
        ftype = eval(request.body.decode()).get('type')
        ret = excel_into_db(filename, ftype)
        if ret:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)




