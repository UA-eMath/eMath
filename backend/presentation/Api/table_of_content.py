from presentation.models import Level
from rest_framework import viewsets, permissions
from presentation.Serializers.toc_serializer import Toc_serializer
from rest_framework.response import Response


class TOCViewSet(viewsets.ReadOnlyModelViewSet):
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset:
            return Response('root id is not provided', 500)

        return Response(Toc_serializer(queryset).data)

    def get_queryset(self):
        root_id = self.request.query_params.get("id", None)

        if root_id is not None:
            root_level = Level.objects.get(id=root_id)
            return root_level
        else:
            return None
