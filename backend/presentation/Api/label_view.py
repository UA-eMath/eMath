from rest_framework.status import HTTP_400_BAD_REQUEST
from presentation.models import Label, Para, Level, RootLevel
from rest_framework import viewsets
from rest_framework.decorators import action
from presentation.Serializers.label_serializers import LabelSerializers
from presentation.Serializers.level_serializers import LevelSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from presentation.Api.utils import *


class LabelViewSet(viewsets.ModelViewSet):
    serializer_class = LabelSerializers
    queryset = Label.objects.all()

    # GET http://localhost:8000/Label/
    def list(self, request, *args, **kwargs):
        return Response(LabelSerializers(self.queryset, many=True).data)

    # GET http://localhost:8000/Label/**/
    def retrieve(self, request, *args, **kwargs):
        label_queryset = Label.objects.filter(linked_para=self.kwargs["pk"])
        if not label_queryset.count():
            label_queryset = Label.objects.filter(
                linked_level=self.kwargs["pk"])
        label = get_object_or_404(label_queryset)
        return Response(LabelSerializers(label).data)

    # POST
    def create(self, request):
        request_data = request.data.copy()
        try:
            if 'linked_para' in request_data:
                para_id = request.data['linked_para']
            else:
                level_id = request.data['linked_level']
        except:
            return Response('Linked id is needed', HTTP_400_BAD_REQUEST)
        try:
            if 'linked_para' in request_data:
                para = Para.objects.get(id=para_id)
            else:
                level = Level.objects.get(id=level_id)
        except ObjectDoesNotExist:
            return Response("Object's id {} is not found".format(rootID), 404)
        serializer = self.serializer_class(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 200)

    def update(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, *args, **kwargs):
        pass

    def destroy(self, request, *args, **kwargs):
        try:
            label = Label.objects.get(pk=self.kwargs["pk"])
        except ObjectDoesNotExist:
            return Response(
                "Label id(" + self.kwargs["pk"] + ") is not found.", 404)

        label.delete()
        return Response("Label is successfully deleted.", 200)
