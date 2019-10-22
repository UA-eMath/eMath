from presentation.models import Level,Para
from rest_framework import viewsets
from presentation.Serializers.level_serializers import LevelSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from itertools import chain

class LevelViewset(viewsets.ModelViewSet):
	serializer_class = LevelSerializer
	queryset = Level.objects.all()

	# GET http://localhost:8000/Level/
	def list(self, request, *args, **kwargs):
		return Response(LevelSerializer(self.queryset,many=True).data)

	# GET http://localhost:8000/Level/**/
	def retrieve(self, request, pk=None):

		level = get_object_or_404(self.queryset, pk= pk)
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

		if not request_data['position']:
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


	def destroy(self, request,pk=None):
		try:
			level = Level.objects.get(pk=pk)
			root = level.get_root()
			parent_level = level.parent
		except ObjectDoesNotExist:
			return Response("level id(" + pk +") is not found", 404)

		level.delete()
		self._updatePosition(parent_level)
		self._updatePageNumber(root)

		return Response("Level is successfully deleted.", 204)

	#PUT http://localhost:8000/Level/**/
	#PATCH http://localhost:8000/Level/**/
	def update(self, request,*args, **kwargs):
		response = super().update(request,*args, **kwargs)

		if request.position:
			self._updatePosition(Level.objects.get(pk=request.id).parent)
		if request.pageNum:
			self._updatePageNumber(Level.objects.get(pk=request.id).get_root())
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

	def _updatePosition(self,parent):
		children_list = parent.get_children().order_by('position')
		children_para_list = parent.para_set.all().order_by('position')

		#merge two list
		cached_list = list(chain(children_list, children_para_list))
		cached_list = sorted(cached_list, key=lambda instance: instance.position)

		position = 0
		for child in cached_list:
			if child.position != position:
				child.position = position
				child.save()
			position += 1
		return