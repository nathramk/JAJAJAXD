from django.conf.urls import url, include
from rest_framework import routers

from .usercashier_view import UsercashierViewSet


router = routers.DefaultRouter()

router.register(r'usercashiers', UsercashierViewSet)

urlpatterns = [

    url(r'^', include(router.urls)),

]
