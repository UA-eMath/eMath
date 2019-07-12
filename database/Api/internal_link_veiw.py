from database.models import Para
from rest_framework import viewsets
from database.Serializers.internalLink_serializers import InternalLinkSerializers

class getInternalLinkViewSet(viewsets.ReadOnlyModelViewSet):
	#TODO need para id

	parent_Para = Para.objects.filter(id=7)[0]

	queryset = parent_Para.internal_parent_id.all()

	serializer_class = InternalLinkSerializers