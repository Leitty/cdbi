from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from griditems import views
from rest_framework_jwt.views import obtain_jwt_token

router = DefaultRouter()
router.register('griditems', views.GriditemsViewSet)

urlpatterns = [
    url(r'^jieba/$', views.jiebafenci),
    url('^', include(router.urls)),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^upload/$', views.upload_file),
    url(r'^dumpin/$', views.DumpInto)
]

