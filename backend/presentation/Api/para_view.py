from presentation.models import Para
from rest_framework import viewsets
from presentation.Serializers.para_serializers import ParaSerializers
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class ParaViewSet(viewsets.ModelViewSet):
	serializer_class = ParaSerializers
	queryset = Para.objects.all()


	def retrieve(self, request, pk=None):

		para = get_object_or_404(self.queryset, pk= pk)

		return Response(self.serializer_class(para).data)


	# def create(self, request, *args, **kwargs):







