from presentation.models import Level,Para
from rest_framework import viewsets
from presentation.Serializers.para_serializers import ParaReadSerializers
from rest_framework.response import Response


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = ParaReadSerializers

	def  list(self, request, *args, **kwargs):
		queryset = self.get_queryset()

		#empty page
		if queryset ==  []:
			return Response(self.serilalizeNestList(queryset))

		#bad request
		if not queryset:
			return Response('Page number/level id is not provided',500)

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
		level_id = self.request.query_params.get('id',None)
		page_num = self.request.query_params.get('page', None)
		root = self.request.query_params.get('root', None)

		#next/pre page
		if page_num is not None and page_num != 0:
			root_level = Level.objects.get(id = root)
			if root_level is not None:
				page = root_level.get_root().get_descendants().filter(isPage=True, pageNum=page_num).first()
		#fist page/ open window
		elif level_id is not None:
			page = Level.objects.get(id=level_id)

			if page.is_root_node():
				page = page.get_children().filter(pageNum=1).first()
				print(page)

			if not page.isPage:
				return None
		else:
			return None

		if page == None:
			return []
		return self.getParas(page)

	def getParas(self,root):
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












