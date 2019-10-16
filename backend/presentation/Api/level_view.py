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
		parent_position = Level.objects.get(pk=request_data['parent']).position
		if not request_data['pageNum'] and request_data['isPage'] and parent_position != -1:
			# get new pageNum
			new_page_num = Level.objects.filter(isPage=True).order_by('-pageNum').first()
			if new_page_num == None:
				new_page_num = 1
			else:
				new_page_num = new_page_num.pageNum + 1

			request_data['pageNum'] = new_page_num

		if not request_data['position']:
			# get new position
			new_position = Level.objects.get(id=request_data['parent']).get_children().order_by('-position').first()
			if new_position == None:
				new_position = 0
			else:
				new_position = new_position.position + 1

			request_data['position'] = new_position


		serializer = self.serializer_class(data=request_data)

		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data, 200)

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