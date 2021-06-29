from rest_framework import viewsets
from rest_framework.response import Response
from presentation.models import Level, RootLevel, Para, Person
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer
from presentation.Serializers.person_serializer import PersonSerializer
from datetime import date
import json


class RootLevelViewSets(viewsets.ModelViewSet):
    serializer_class = RootLevelSerializer
    level_serializer = LevelSerializer

    queryset = RootLevel.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(RootLevelSerializer(self.queryset, many=True).data)

    def retrieve(self, request, *args, **kwargs):

        tree_type = self.request.query_params.get("type")

        if tree_type:
            root_level = Level.objects.get(pk=kwargs.get("pk")).get_root().root
            tree = getattr(root_level, tree_type)
            return Response(data=tree, status=200)
        else:
            return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request_data = request.data.copy()
        rootLevel = RootLevel.objects.get(pk=self.kwargs["pk"])
        title = request_data.get("title")
        html_title = request_data.get("html_title")
        date = request_data.get("date")
        cover_image = request_data.get("cover_image")
        completed = request_data.get("completed")
        # create an Person object for atuhor
        author = Person.objects.get(id=request_data.get("authorID"))
        author.first_name = request_data.get("first_name")
        author.middle_name = request_data.get("middle_name")
        author.last_name = request_data.get("last_name")
        author.save()
        # TODO: update contributors
        if (html_title):
            rootLevel.html_title = html_title
        else:
            rootLevel.html_title = title
        if (author):
            rootLevel.author = author
        rootLevel.date = date
        if (cover_image):
            rootLevel.cover_image = cover_image
        rootLevel.completed = completed
        rootLevel.save()
        return Response("Book updated successfully!", 200)

    def create(self, request, *args, **kwargs):
        request_data = request.data.copy()
        # 1. add a new Root Level
        if request_data.get("html_title") == None:
            request_data["html_title"] = request_data.get("title")

        # create an Person object for atuhor
        author_serializer = PersonSerializer(
            data={
                'first_name': request_data.get("first_name"),
                'middle_name': request_data.get("middle_name"),
                'last_name': request_data.get("last_name")
            })
        author_serializer.is_valid()
        author_serializer.save()
        request_data["author"] = author_serializer.data["id"]
        # create an Person object for each contributor
        request_data["contributor"] = {}
        for i in range(request_data["contributors_num"]):
            contributor_serializer = PersonSerializer(
                data={
                    'first_name': request_data.get("contributor_first_" +
                                                   str(i)),
                    'middle_name': request_data.get("contributor_middle_" +
                                                    str(i)),
                    'last_name': request_data.get("contributor_last_" + str(i))
                })
            contributor_serializer.is_valid()
            contributor_serializer.save()
            request_data["contributor"][i] = json.dumps(
                contributor_serializer.data)

        if request_data.get("date") == None:
            request_data["date"] = date.today()

        root_level_serializer = self.serializer_class(data=request_data)
        root_level_serializer.is_valid()
        root_level = root_level_serializer.save()

        # 2. add root node level
        root_node_data = {"root": root_level.id}
        root_node_data["title"] = request_data.get("title")

        if request_data.get("tocTitle") == None:
            root_node_data["tocTitle"] = request_data.get("title")
        else:
            root_node_data["tocTitle"] = request_data.get("tocTitle")

        root_node_data["isPage"] = False
        root_node_data["position"] = len(Level.objects.root_nodes())

        root_node_serializer = self.level_serializer(data=root_node_data)
        root_node_serializer.is_valid(raise_exception=True)
        root_node = root_node_serializer.save()

        # 3. add Appendix
        appendix_data = {
            "position": -1,
            "parent": root_node.id,
            "title": "ISO",  #Repository of Singleton
            "tocTitle": "ISO",
            "isPage": False,
        }

        appendix_serializer = self.level_serializer(data=appendix_data)
        appendix_serializer.is_valid(raise_exception=True)
        appendix_serializer.save()
        return Response(data={
            "rootLevel": root_level_serializer.data,
            "rootNode": root_node_serializer.data,
            "appendix": appendix_serializer.data
        }, )

    def destroy(self, request, *args, **kwargs):
        root_node = Level.objects.get(pk=self.kwargs["pk"])
        root_level = root_node.root

        root_level.delete()
        root_node.delete()

        return Response("Level is successfully deleted.", 200)
