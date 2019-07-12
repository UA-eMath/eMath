from database.models import Level,Para,InternalLink,ExternalLink
from rest_framework import viewsets,permissions
from database.Serializers.para_serializers import ParaSerializers
from rest_framework.response import Response


class getPageViewSet(viewsets.ReadOnlyModelViewSet):

	queryset = Para.objects.all()


	serializer_class = ParaSerializers