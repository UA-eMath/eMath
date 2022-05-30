from rest_framework import viewsets
from rest_framework.response import Response
from presentation.models import Level, RootLevel
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer


class TexShortcutUpdateViewSets(viewsets.ModelViewSet):
    serializer_class = RootLevelSerializer
    level_serializer = LevelSerializer

    queryset = RootLevel.objects.all()

    def retrieve(self, request, *args, **kwargs):
        book = Level.objects.get(pk=kwargs.get("pk")).get_root().root
        commands = getattr(book, 'tex_shortcut')

        return Response(data=commands, status=200)
