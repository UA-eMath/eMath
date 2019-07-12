from database.models import Level
from rest_framework import viewsets
from database.Serializers.para_serializers import ParaSerializers


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
	#TODO need page number or id
	pages = Level.objects.filter(isPage=True,id=4)[0]

	queryset = pages.para_set.all()


	serializer_class = ParaSerializers