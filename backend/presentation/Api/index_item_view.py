from rest_framework import viewsets
from rest_framework.response import Response
from presentation.models import Level, RootLevel, Para
from presentation.Serializers.rootLevel_serializer import RootLevelSerializer
from presentation.Serializers.level_serializers import LevelSerializer

index_to_col = {
    "Index Item": "index_item",
    "Symbol Index Item": "symbol_index",
    "Author Index Item": "author_index"
}


def addToTree(node, path, id):
    if len(path) == 1:
        parents = []
        if isinstance(id, list):
            for i in id:
                try:
                    para = Para.objects.get(pk=i)
                    parents.append(para.para_parent.pk)
                except Para.DoesNotExist:
                    continue
        else:
            parents.append(Para.objects.get(pk=id).para_parent.pk)

        return node.append({
            "title": path[0],
            "tocTitle": path[0],
            "id": id,
            "value": path[0],
            "levelParent": parents,
            "children": []
        })

    next_node = next((i for i in node if i['title'] == path[0]), False)
    # found
    if next_node:
        addToTree(next_node["children"], path[1:], id)
    else:
        next_node = {
            "title": path[0],
            "tocTitle": path[0],
            "id": None,
            "value": path[0],
            "levelParent": None,
            "children": []
        }
        node.append(next_node)
        addToTree(next_node["children"], path[1:], id)


class IndexItemViewSets(viewsets.ModelViewSet):
    serializer_class = RootLevelSerializer
    level_serializer = LevelSerializer

    queryset = RootLevel.objects.all()

    # get one book's index item tree
    def retrieve(self, request, *args, **kwargs):
        para_id = kwargs.get("pk")
        index_type = self.request.query_params.get("type")

        if index_type:
            col_to_append = index_to_col.get(index_type)
            if self.request.query_params.get("byPara"):
                # find path by para id
                root_level = Para.objects.get(
                    pk=para_id).para_parent.get_root().root
                indexItem = getattr(root_level, col_to_append).get("treeData")

                pathList = []
                for path in indexItem:
                    if indexItem[path]:
                        pathList.append(path)

                return Response(data=pathList, status=200)

            root_level = Level.objects.get(pk=para_id).get_root().root
            indexItem = getattr(root_level, col_to_append).get("treeData")
            index_item_tree = []
            # e.g. {path:id, id:a!b!c!d}
            for path in indexItem:
                key = indexItem[path]
                addToTree(index_item_tree, path.split("!"), key)

            index_item_tree = sorted(index_item_tree,
                                     key=lambda i: i["tocTitle"])

            return Response(data=index_item_tree, status=200)

        else:
            return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request_data = request.data.copy()

        if request_data.get("add"):
            referred_id = request_data.get("referredId")
            path = request_data.get("path")

            col_to_append = index_to_col.get(request_data.get("add"))
            root_level = Para.objects.get(
                pk=referred_id).para_parent.get_root().root

            indexItem = getattr(root_level,
                                col_to_append)["treeData"].get(path)
            if indexItem:
                indexItem.append(referred_id)
            else:
                getattr(root_level,
                        col_to_append)["treeData"][path] = [referred_id]

            root_level.save()
            return Response(data=getattr(root_level,
                                         col_to_append)["treeData"],
                            status=200)
        else:
            return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        index_type = self.request.query_params.get("type")
        path = self.request.query_params.get("path")
        para_id = kwargs['pk']

        if index_type:
            root_level = Para.objects.get(
                pk=para_id).para_parent.get_root().root
            col_to_append = index_to_col.get(index_type)
            indexItem = getattr(root_level, col_to_append).get("treeData")
            indexItem[path].remove(int(para_id))

            if indexItem[path] == []:
                del indexItem[path]

            root_level.save()

            return Response(data="Item removed.")
        else:
            return super().destroy(request, *args, **kwargs)
