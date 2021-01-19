from rest_framework import views
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from presentation.models import Level, RootLevel
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer


class NewCommandUpdate(views.APIView):
    parser_classes = (JSONParser, )
    serializer_class = RootLevelSerializer
    level_serializer = LevelSerializer

    def put(self, request, *args, **kwargs):
        book = Level.objects.get(pk=kwargs.get("pk")).get_root().root
        commands = getattr(book, 'new_command')
        cmd_obj = request.data
        [[filename, modified_cmd]] = cmd_obj.items()
        try:
            book.new_command[filename] = modified_cmd
            book.save()
            return Response(status=204, data="Edit success!")
        except:
            return Response(status=500, data="Failed to modify commands.")
