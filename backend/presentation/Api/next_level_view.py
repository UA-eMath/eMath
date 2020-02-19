from presentation.models import Para
from rest_framework import viewsets
from presentation.Serializers.para_serializers import ParaReadSerializers
from rest_framework.response import Response
from .utils import getParas

class getNextLevelViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = ParaReadSerializers

	def get_queryset(self):
		paraID = self.request.query_params.get('id', None)
		return Para.objects.get(pk=paraID).para_parent

	def getPageLevel(self,level):

		while not level.isPage:
			level = level.parent

		return level.id

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		nextLevel = getParas(queryset)

		pageId = self.getPageLevel(queryset)

		return Response({"context": self.serilalizeNestList(nextLevel),"pageID":pageId})


	def serilalizeNestList(self, array):
		result = []
		for item in array:
			if isinstance(item, list):
				result.append(self.serilalizeNestList(item))
			else:
				data = self.get_serializer(item).data
				result.append(data)
		return result





