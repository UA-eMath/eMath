from presentation.models import Level,Para
from rest_framework import viewsets
from presentation.Serializers.level_serializers import LevelSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from itertools import chain
from presentation.Api.utils import *

class LevelViewset(viewsets.ModelViewSet):
	serializer_class = LevelSerializer
	queryset = Level.objects.all()

	# GET http://localhost:8000/Level/
	def list(self, request, *args, **kwargs):
		return Response(LevelSerializer(self.queryset,many=True).data)

	# GET http://localhost:8000/Level/**/
	def retrieve(self, request,  *args, **kwargs):

		level = get_object_or_404(self.queryset, pk= self.kwargs["pk"])
		return Response(LevelSerializer(level).data)


	def create(self, request, *args, **kwargs):
		request_data = request.data.copy()
		# automated add position and pageNum, default increase one level under parent node

		#append
		# get children list(either level or para)
		children_list = Level.objects.get(id=request_data['parent']).get_children().order_by('position')
		children_para_list = Level.objects.get(id=request_data['parent']).para_set.all().order_by('position')

		try:
			#get last position.
			last_position = max(
				i for i in [children_list.last().position, children_para_list.last().position] if i is not None)
		except:
			#empty node (max(none,none)), add one level child with position of -1 + 1 = 0
			last_position =  -1

		if request_data.get('position') is None:
			request_data['position'] = last_position + 1

		#insert
		#Update children position when insert between nodes. Mainly implemented by reserving position for new level
		elif int(request_data['position']) <= last_position:
			cached_list = list(chain(children_list,children_para_list))
			for child in cached_list:
				if child.position >= last_position:
					child.position += 1
					child.save()


		serializer = self.serializer_class(data=request_data)
		serializer.is_valid(raise_exception=True)
		serializer.save()

		self._updatePageNumber(Level.objects.get(id=request_data['parent']).get_root())

		return Response(serializer.data, 200)


	def destroy(self, request, *args, **kwargs):
		try:
			level = Level.objects.get(pk=self.kwargs["pk"])
			root = level.get_root()
			parent_level = level.parent
		except ObjectDoesNotExist:
			return Response("level id(" + self.kwargs["pk"] +") is not found", 404)

		level.delete()
		updatePosition(parent_level)
		self._updatePageNumber(root)

		return Response("Level is successfully deleted.", 204)

	#PUT http://localhost:8000/Level/**/
	#PATCH http://localhost:8000/Level/**/
	def update(self, request,*args, **kwargs):
		response = super().update(request,*args, **kwargs)

		if request.get("position") is not None:
			updatePosition(Level.objects.get(pk=self.kwargs["pk"]).parent,request.get("position"))
		if request.get("pageNum") is not None:
			self._updatePageNumber(Level.objects.get(pk=self.kwargs["pk"]).get_root())
		response.data = {'status': 'successfully update'}
		return response

	def _updatePageNumber(self,root):
		page_number = 1
		def _recursivelyUpdatePageNum(root,page_number):
			# base
			if root.isPage:
				root.pageNum = page_number
				root.save()
				return page_number + 1

			if root.position >=0:
				for child in root.get_children().order_by("position"):
					page_number = _recursivelyUpdatePageNum(child,page_number)

			return page_number
		_recursivelyUpdatePageNum(root, page_number)
		return