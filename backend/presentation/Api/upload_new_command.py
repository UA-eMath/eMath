from rest_framework import views
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from presentation.models import Level, RootLevel
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer
import re
'''
Api request:
		PUT http://localhost:8000/uploadNewCommand/[book id]/
		body: file: xxx.tex
		Headers:
			Content-Disposition:   form-data;filename="xxx.tex"
'''


def parseNewCommandFromFile(file_content):
    new_command = r"^(\\newcommand\{\\.*\}(\[[0-9]*\])+(\{.*\})).*(\%.*)"
    pattern = re.compile(new_command)
    matched_commands = []
    tex = file_content.splitlines()
    for line in tex:
        matchObj = re.search(pattern, line)
        if matchObj:
            new = matchObj.group(1)
            comment = matchObj.group(4)
            matched_commands.append({"tex": new, "note": comment[1:]})
    return matched_commands


class UploadNewCommand(views.APIView):
    parser_classes = [
        FileUploadParser,
    ]
    serializer_class = RootLevelSerializer
    level_serializer = LevelSerializer

    def post(self, request, *args, **kwargs):
        tex = ""
        file_obj = request.data['file']
        for chunk in file_obj.chunks():
            chunk_string = str(chunk, 'utf-8')
            tex += chunk_string
        # parse file into {"tex":"\newcommand","note",""}
        tex_array = parseNewCommandFromFile(tex)
        tex_to_be_added = {file_obj.name: tex_array}
        book = Level.objects.get(pk=kwargs.get("pk")).get_root().root
        commands = getattr(book, 'new_command')

        if commands.get(file_obj.name):
            return Response(status=500, data="Tex file already exists")
        try:
            updated_commands = {**commands, **tex_to_be_added}
            book.new_command = updated_commands
            book.save()
            return Response(status=204, data="Save success!")
        except:
            return Response(status=500, data="Failed to upload commands")
