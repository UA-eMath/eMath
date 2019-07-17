from database.models import Para,InternalLink
from rest_framework import viewsets
from database.Serializers.internalLink_serializers import InternalLinkSerializers

class getInternalLinkViewSet(viewsets.ReadOnlyModelViewSet):
	#TODO need para id


	serializer_class = InternalLinkSerializers

	def get_queryset(self):
		id = self.request.query_params.get('id',None)


		if id is not None:
			parent_Para = Para.objects.get(id=id)
			queryset = parent_Para.internal_parent_id.all()
		else:
			queryset = InternalLink.objects.all()

		return queryset