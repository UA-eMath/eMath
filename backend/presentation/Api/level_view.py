from presentation.models import Level
from rest_framework import viewsets
from presentation.Serializers.level_serializers import LevelSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

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
		# get last position
		children_list = Level.objects.get(id=request_data['parent']).get_children().order_by('position')
		last_level = children_list.last()
		if not request_data['position']:
			if last_level == None:
				new_position = 0
			else:
				new_position = last_level.position + 1

			request_data['position'] = new_position

		#insert
		#Update children position when insert between nodes.
		#TODO Update sub level position
		elif int(request_data['position']) <= last_level.position:
			cached_list = children_list[int(request_data['position']):]
			for child in cached_list:
				child.position += 1
				child.save()


		serializer = self.serializer_class(data=request_data)
		serializer.is_valid(raise_exception=True)
		serializer.save()

		self._updatePageNumber(Level.objects.get(id=request_data['parent']).get_root())

		return Response(serializer.data, 200)

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


	def destroy(self, request,pk=None):
		try:
			level = Level.objects.get(pk=pk)

		except ObjectDoesNotExist:
			return Response("level id(" + pk +") is not found", 404)

		level.delete()
		return Response("Level is successfully deleted.", 204)


	#PUT http://localhost:8000/Level/**/
	#PATCH http://localhost:8000/Level/**/
	def update(self, request,*args, **kwargs):
		response = super().update(request,*args, **kwargs)
		response.data = {'status': 'successfully update'}
		return response