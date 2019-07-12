from database.models import Level,Para
from rest_framework import viewsets,permissions
from database.Serializers.para_serializers import ParaSerializers
from rest_framework.response import Response


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
	#TODO need page number or id
	pages = Level.objects.filter(isPage=True,id=4)[0]

	queryset = pages.para_set.all()


	serializer_class = ParaSerializers