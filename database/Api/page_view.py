from database.models import Level,Para,InternalLink,ExternalLink
from rest_framework import viewsets,permissions
from database.Serializers.para_serializers import ParaSerializers
from rest_framework.response import Response


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
	p = Level.objects.filter(isPage=True,id=2)[0]

	queryset = p.para_next.all()


	serializer_class = ParaSerializers