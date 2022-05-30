from rest_framework import views
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from presentation.models import Level, RootLevel
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer


class TexShortcutUpdate(views.APIView):
    parser_classes = (JSONParser, )
    serializer_class = RootLevelSerializer
    level_serializer = LevelSerializer

    def put(self, request, *args, **kwargs):
        book = Level.objects.get(pk=kwargs.get("pk")).get_root().root
        cmd_obj = request.data
        [[filename, modified_shortcut]] = cmd_obj.items()
        try:
            if modified_shortcut is None:
                book.tex_shortcut.pop(filename)
            else:
                book.tex_shortcut[filename] = modified_shortcut
            book.save()
            return Response(status=204, data="Edit success!")
        except:
            return Response(status=500, data="Failed to modify commands.")