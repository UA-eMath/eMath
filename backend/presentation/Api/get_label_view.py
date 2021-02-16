from rest_framework import viewsets
from rest_framework.response import Response
from presentation.models import Level, Label, Para
from presentation.Serializers.label_serializers import LabelSerializers
from presentation.Serializers.level_serializers import LevelSerializer
from django.shortcuts import get_object_or_404


class GetLabelViewSets(viewsets.ModelViewSet):
    serializer_class = LabelSerializers
    queryset = Label.objects.all()

    def list(self, request, *args, **kwargs):
        label_queryset = None
        level_id = request.query_params.get('levelID', None)
        para_id = request.query_params.get('paraID', None)

        if level_id is not None:
            label_queryset = Label.objects.filter(linked_level=level_id)
        elif para_id is not None:
            label_queryset = Label.objects.filter(linked_para=para_id)
        else:
            return Response('Para/level id is not provided', 500)

        label = get_object_or_404(label_queryset)
        return Response(LabelSerializers(label).data)