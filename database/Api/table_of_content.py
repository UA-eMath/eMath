from database.models import Level
from rest_framework import viewsets,permissions
from database.Serializers.toc_serializer import Toc_serializer

class TOCViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Level.objects.filter(level=0)

	permission_classes = [
		permissions.AllowAny
	]


	serializer_class = Toc_serializer

	# def list(self, request, *args, **kwargs):
	# 	print("I am here")
	# 	return


