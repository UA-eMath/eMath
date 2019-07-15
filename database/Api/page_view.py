from database.models import Level
from rest_framework import viewsets
from database.Serializers.para_serializers import ParaSerializers


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = ParaSerializers

	def get_queryset(self):
		page_num = self.request.query_params.get('page',None)
		level_id = self.request.query_params.get('id',None)

		#TODO may contain bug
		if page_num is not None:
			pages = Level.objects.filter(isPage=True).order_by('pageNum')[int(page_num)-1]
		elif level_id is not None:

			pages = Level.objects.filter(isPage=True,id=level_id).first()
		else:
			pages = Level.objects.filter(isPage=True)[0]

		queryset = pages.para_set.all()

		return queryset