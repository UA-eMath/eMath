from rest_framework import viewsets
from rest_framework.response import Response
from presentation.models import Level, RootLevel,Para
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer

from datetime import date


class RootLevelViewSets(viewsets.ModelViewSet):
	serializer_class = RootLevelSerializer
	level_serializer = LevelSerializer

	queryset = RootLevel.objects.all()

	def retrieve(self, request, *args, **kwargs):

		tree_type = self.request.query_params.get("type")

		if tree_type:
			root_level = Level.objects.get(pk=kwargs.get("pk")).get_root().root
			tree = getattr(root_level,tree_type)
			return Response(data=tree,status=200)

		else:
			return super().retrieve(request,*args,**kwargs)


	def update(self, request, *args, **kwargs):
		request_data = request.data.copy()
		index_to_col = {"Glossary": "glossary", "Symbol Index": "symbol_index", "Author Index": "author_index"}
		if request_data.get("add"):
			referred_id = request_data.get("referredId")
			col_to_append = index_to_col.get(request_data.get("add"))
			root_level = Para.objects.get(pk=referred_id).para_parent.get_root().root

			getattr(root_level,col_to_append)["treeData"].append({
				"title" : request_data.get("path"),
				"tocTitle":request_data.get("path"),
				"id":referred_id,
				"levelParent":Para.objects.get(pk=referred_id).para_parent.pk,
				"children":[]
			})
			root_level.save()
			return Response(data=getattr(root_level,col_to_append)["treeData"],status=200)
		else:
			return super().update(request, *args, **kwargs)

	def create(self, request, *args, **kwargs):
		request_data = request.data.copy()

		# 1. add a new Root Level
		if request_data.get("html_title") == None:
			request_data["html_title"] = request_data.get("title")

		# TODO: author and contributor

		if request_data.get("date") == None:
			request_data["date"] = date.today()

		root_level_serializer = self.serializer_class(data=request_data)
		root_level_serializer.is_valid(raise_exception=True)

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
		appendix_data = {"position": -1,
		                 "parent": root_node.id,
		                 "title": "Repository of Singleton",
		                 "tocTitle": "Repository of Singleton",
		                 "isPage": False}

		appendix_serializer = self.level_serializer(data=appendix_data)

		appendix_serializer.is_valid(raise_exception=True)
		appendix_serializer.save()

		return Response(data={"rootLevel": root_level_serializer.data,
		                      "rootNode": root_node_serializer.data,
		                      "appendix": appendix_serializer.data}, )

	def destroy(self, request, *args, **kwargs):
		root_node = Level.objects.get(pk=self.kwargs["pk"])
		root_level = root_node.root

		root_level.delete()
		root_node.delete()

		return Response("Level is successfully deleted.", 204)
