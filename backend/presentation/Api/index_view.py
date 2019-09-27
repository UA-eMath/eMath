from presentation.models import Level
from presentation.Serializers.root_serializer import NodeSerializer
from rest_framework import viewsets,permissions

class RootViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Level.objects.root_nodes()

	permission_classes = [
		permissions.AllowAny
	]

	serializer_class = NodeSerializer