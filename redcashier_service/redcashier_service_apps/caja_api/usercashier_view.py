from rest_framework import serializers, viewsets
#from django.db.models import Q
#from operator import __or__ as OR
#from functools import reduce

from redcashier_service_apps.caja.models.usercashier import Usercashier


class UsercashierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usercashier
        # fields = ('url', 'username', 'email', 'is_staff')
        fields = "__all__"


class UsercashierViewSet(viewsets.ModelViewSet):
    queryset = Usercashier.objects.all()
    serializer_class = UsercashierSerializer
