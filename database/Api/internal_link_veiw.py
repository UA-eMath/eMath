from database.models import Level,Para,InternalLink,ExternalLink
from rest_framework import viewsets,permissions
from database.Serializers.internalLink_serializers import InternalLinkSerializers
from rest_framework.response import Response

class getInternalLinkViewSet(viewsets.ReadOnlyModelViewSet):
	#TODO need para id

	parent_Para = Para.objects.filter(id=7)[0]

	queryset = parent_Para.internal_parent_id.all()

	serializer_class = InternalLinkSerializers