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

		#get last position.
		last_position = None
		if children_list.last():
			last_position = children_list.last().position
		if children_para_list.last():
			if last_position == None:
				last_position = children_para_list.last().position
			else:
				if children_para_list.last().position > last_position:
					last_position = children_para_list.last().position

		if last_position == None:
			last_position = -1

		if request_data.get('position') is None or request_data.get('position') == '':
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
		#move node
			#position : -1 left or 1 right
			# target : dropped node id
			#child : dragged node id
		if request.data.get("position") != None:
			child = Level.objects.get(pk=self.kwargs["pk"])
			target = Level.objects.get(pk= request.data.get('target'))
			position = int(request.data.get('position'))

			updatePosition(child,target,position)

			response = Response(child.position)
		else:
			response = super().update(request, *args, **kwargs)


		self._updatePageNumber(Level.objects.get(pk=self.kwargs["pk"]).get_root())
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