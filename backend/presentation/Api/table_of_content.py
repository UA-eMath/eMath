from presentation.models import Level
from rest_framework import viewsets,permissions
from presentation.Serializers.toc_serializer import Toc_serializer

class TOCViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Level.objects.filter(level=0,isPage=False).order_by('position')
	permission_classes = [
		permissions.AllowAny
	]


	serializer_class = Toc_serializer





