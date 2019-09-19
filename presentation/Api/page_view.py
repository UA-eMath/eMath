from presentation.models import Level,Para
from rest_framework import viewsets
from presentation.Serializers.para_serializers import ParaSerializers
from rest_framework.response import Response


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = ParaSerializers

	def  list(self, request, *args, **kwargs):
		queryset = self.get_queryset()

		return  Response(self.serilalizeNestList(queryset))

	def serilalizeNestList(self,array):
		result = []
		for item in array:
			if isinstance(item,list):
				result.append(self.serilalizeNestList(item))
			else:
				data = self.get_serializer(item).data
				result.append(data)
		return result

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
			#insert Level object inside para list
			mergedList = self.mergeAndSort(root.get_children(),root.para_set.all())

			#recursive insertion
			for obj in mergedList:
				if obj.__class__.__name__ == 'Para':
					paras.append(obj)
				else:
					blockParas = self.getParas(obj)
					if blockParas != []:
						paras.append(blockParas)

			return paras


	def mergeAndSort(self,block,paras):
		res = []
		i = 0
		j = 0
		while i < len(block) and j < len(paras):
			if block[i].position < paras[j].position:
				res.append(block[i])
				i += 1
			else:
				res.append(paras[j])
				j += 1

		for item in block[i:]:
			res.append(item)

		for item in paras[j:]:
			res.append(item)
		return res











