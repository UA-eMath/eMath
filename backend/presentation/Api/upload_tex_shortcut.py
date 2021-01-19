from rest_framework import views
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from presentation.models import Level, RootLevel
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer
import re
'''
Api request:
		PUT http://localhost:8000/uploadTex/[book id]/
		body: file: xxx.cwl
		Headers:
			Content-Disposition:   form-data;filename="xxx.cwl"
'''


def parseTexShortcutFromFile(file_content):
    tex_shortcut = r"(\\[^\{]+)(\{.*\})*"
    pattern = re.compile(tex_shortcut)
    matched_shortcuts = []
    tex = file_content.splitlines()
    for line in tex:
        matchObj = re.search(pattern, line)
        if matchObj:
            tex = matchObj.group(1)
            note = matchObj.group(2)
            matched_shortcuts.append({"tex": tex, "note": note})
    return matched_shortcuts


class UploadTexShortcut(views.APIView):
    parser_classes = (FileUploadParser, )
    serializer_class = RootLevelSerializer
    level_serializer = LevelSerializer

    def put(self, request, *args, **kwargs):
        tex = ""
        file_obj = request.data['file']
        for chunk in file_obj.chunks():
            chunk_string = str(chunk, 'utf-8')
            tex += chunk_string
        # parse file into {"tex":"\newcommand","note",""}
        tex_array = parseTexShortcutFromFile(tex)
        tex_to_be_added = {file_obj.name: tex_array}
        book = Level.objects.get(pk=kwargs.get("pk")).get_root().root
        commands = getattr(book, 'tex_shortcut')

        if commands.get(file_obj.name):
            return Response(status=500, data="Tex file already exists")
        try:
            updated_commands = {**commands, **tex_to_be_added}
            book.tex_shortcut = updated_commands
            book.save()
            return Response(status=204, data="Save success!")
        except:
            return Response(status=500, data="Failed to upload commands")
