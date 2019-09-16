from presentation.models import Level,Para
from rest_framework import viewsets
from presentation.Serializers.para_serializers import ParaSerializers


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = ParaSerializers

	def get_queryset(self):
		page_num = self.request.query_params.get('page',None)
		level_id = self.request.query_params.get('id',None)


		if page_num is not None:
			pages = Level.objects.filter(isPage=True)[int(page_num)-1]
		elif level_id is not None:
			pages = Level.objects.filter(isPage=True,id=level_id).first()
		else:
			#return first page
			pages = Level.objects.filter(isPage=True)[0]

		return self.getParas(pages)

	def getParas(self,root):
		# TODO
		paras = []

		while root.get_children() or root.para_set.all():
			mergedList = self.mergeAndSort(root.get_children(),root.para_set.all())
			for obj in mergedList:
				if obj.__class__.__name__ == 'Para':
					paras.append(obj)
				else:
					for i in self.getParas(obj) or []:
						paras.append(i)

			return paras


	def mergeAndSort(self,a1,a2):
		res = []
		i = 0
		j = 0
		while i < len(a1) and j < len(a2):
			if a1[i].position < a2[j].position:
				res.append(a1[i])
				i += 1
			else:
				res.append(a2[j])
				j += 1

		for item in a1[i:]:
			res.append(item)

		for item in a2[j:]:
			res.append(item)
		return res












