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
        root_id = request.query_params.get('rootID', None)
        if root_id is not None:
            label_queryset = Label.objects.filter(root=root_id)
            return Response(LabelSerializers(label_queryset, many=True).data)
        else:
            # return Response('Root id or label content is not provided', 500)
            return Response(LabelSerializers(self.queryset, many=True).data)

    # GET http://localhost:8000/Label/**/
    def retrieve(self, request, *args, **kwargs):
        label_id = self.kwargs["pk"]
        label_queryset = Label.objects.filter(id=label_id)
        label = get_object_or_404(label_queryset)
        level = label.linked_level
        para = label.linked_para
        link_to, linked_id, isPage = "", -1, False
        if level:
            isPage = level.isPage
            linked_id = level.id
            link_to = "level"
        else:
            isPage = para.para_parent.isPage
            linked_id = para.id
            link_to = "para"
        return Response({
            "id": label_id,
            "title": label.content,
            "linkedID": linked_id,
            "isPage": isPage,
            "linkTo": link_to
        })

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
                root = Para.objects.get(id=para_id).para_parent.get_root().root
            else:
                root = Level.objects.get(id=level_id).get_root().root
        except ObjectDoesNotExist:
            return Response("Object's id is not found", 404)

        request_data['root'] = root.id

        serializer = self.serializer_class(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 200)

    def put(self, request, *args, **kwargs):
        label_id = request.data['params'].get('id', None)
        content = request.data['params'].get('content', None)
        try:
            label = Label.objects.get(id=label_id)
            label.content = content
            label.save()
        except:
            return Response("Label update fails.", 500)

        return Response("Label is successfully updated.", 204)

    def destroy(self, request, *args, **kwargs):
        try:
            label = Label.objects.get(pk=self.kwargs["pk"])
        except ObjectDoesNotExist:
            return Response(
                "Label id(" + self.kwargs["pk"] + ") is not found.", 404)

        label.delete()
        return Response("Label is successfully deleted.", 200)
