from presentation.models import Level, Para
from rest_framework import viewsets
from presentation.Serializers.level_serializers import LevelSerializer
from presentation.Serializers.para_serializers import ParaReadSerializers
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from itertools import chain
from presentation.Api.utils import *
from .utils import getParas


class LevelViewset(viewsets.ModelViewSet):
    serializer_class = ParaReadSerializers
    queryset = Level.objects.all()

    # GET http://localhost:8000/Level/
    def list(self, request, *args, **kwargs):
        return Response(LevelSerializer(self.queryset, many=True).data)

    # GET http://localhost:8000/Level/**/
    def retrieve(self, request, *args, **kwargs):
        level = get_object_or_404(self.queryset, pk=self.kwargs["pk"])
        queryset = getParas(level)
        # empty page
        if queryset == []:
            return Response(self.serilalizeNestList(queryset))

        # bad request
        if not queryset:
            return Response('Level id is not provided', 500)
        return Response(self.serilalizeNestList(queryset))
        # return Response(LevelSerializer(level).data)

    def serilalizeNestList(self, array):
        result = []
        for item in array:
            if isinstance(item, list):
                result.append(self.serilalizeNestList(item))
            else:
                data = self.get_serializer(item).data
                result.append(data)
        return result

    def create(self, request, *args, **kwargs):
        request_data = request.data.copy()
        # automated add position and pageNum, default increase one level under parent node
        #append
        # get children list(either level or para)
        try:
            children_list = Level.objects.get(
                id=request_data['parent']).get_children().order_by('position')
            children_para_list = Level.objects.get(
                id=request_data['parent']).para_set.all().order_by('position')
            #get last position.
            last_position = len(children_list) + len(children_para_list) - 1
        except:
            return Response('Fail to get children list', 500)

        if request_data.get('position') is None or request_data.get(
                'position') == '':
            request_data['position'] = last_position + 1
        #insert
        #Update children position when insert between nodes. Mainly implemented by reserving position for new level
        elif int(request_data['position']) <= last_position:
            cached_list = list(chain(children_list, children_para_list))
            for child in cached_list:
                if child.position >= int(request_data['position']):
                    child.position += 1
                    child.save()
        serializer = LevelSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self._updatePageNumber(
            Level.objects.get(id=request_data['parent']).get_root())
        return Response(serializer.data, 200)

    def destroy(self, request, *args, **kwargs):
        try:
            level = Level.objects.get(pk=self.kwargs["pk"])
            root = level.get_root()
            parent_level = level.parent
        except ObjectDoesNotExist:
            return Response("level id(" + self.kwargs["pk"] + ") is not found",
                            404)

        level.delete()
        #TODO
        #updatePosition(parent_level);
        self._updatePageNumber(root)

        return Response("Level is successfully deleted.", 200)

    #PUT http://localhost:8000/Level/**/
    #PATCH http://localhost:8000/Level/**/
    def update(self, request, *args, **kwargs):
        #move node
        #position : -1 left or 1 right or 0 make a branch
        # target : dropped node id
        #child : dragged node id
        # save new title and tocTitle for the given level
        new_title = request.data.get('title')
        new_toctitle = request.data.get('tocTitle')
        new_isPage = request.data.get('isPage')
        if new_title:
            try:
                level = Level.objects.get(pk=self.kwargs["pk"])
                root = level.get_root()
                parent_level = level.parent
            except ObjectDoesNotExist:
                return Response(
                    "level id(" + self.kwargs["pk"] + ") is not found", 404)
            if (new_title):
                level.title = new_title
            if (new_toctitle != ""):
                level.tocTitle = new_toctitle
            else:
                level.tocTitle = new_title
            if (new_isPage):
                level.isPage = new_isPage
            level.save()

        if request.data.get("position") != None:
            child = Level.objects.get(pk=self.kwargs["pk"])

            #update position of appendix is prohibited
            if child.position == -1:
                return Response(data="Please don't move this branch",
                                status=400)

            target = Level.objects.get(pk=request.data.get('target'))
            position = int(request.data.get('position'))

            #validattion check
            if target.isPage == True and position == 0:
                return Response(data='You cannot move a branch under a page.',
                                status=400)

            #cannnot move a sub level inside level editor
            level = child.parent
            while not level.is_root_node():
                if level.isPage:
                    return Response(
                        data='You cannot move a content block at toc tree',
                        status=400)
                level = level.parent

            updatePosition(child, target, position)

            response = Response(child.position)
        else:
            response = super().update(request, *args, **kwargs)

        if request.data.get("action") != None:
            action = request.data.get("action")  # two actions: up: -1, down: 1
            current = Level.objects.get(pk=self.kwargs["pk"])
            parent = current.parent
            children_nums = len(parent.get_children()) + len(
                parent.para_set.all())
            if current.position == children_nums - 1 and action == -1:  # if last part in current level, you should only move up
                current.position -= 2
                current.save()
                response = Response(data="Successfully move the level up!",
                                    status=200)
            elif current.position >= 0 and current.position < (
                    children_nums -
                    1):  # if (children_nums - 1) > position >= 0
                current.position += action  # can move up or down
                current.save()
                response = Response(data="Successfully move the level up!",
                                    status=200)
            elif current.position == -1 and action == 1:  # if the first level in current level, you should only move down
                current.position += 1
                current.save()
                response = Response(data="Successfully move the level up!",
                                    status=200)
            else:
                response = Response(data="Position is incorrect.", status=500)

        self._updatePageNumber(
            Level.objects.get(pk=self.kwargs["pk"]).get_root())
        return response

    def _updatePageNumber(self, root):
        page_number = 1

        def _recursivelyUpdatePageNum(root, page_number):
            # base
            if root.isPage:
                root.pageNum = page_number
                root.save()
                return page_number + 1

            if root.position >= 0:
                for child in root.get_children().order_by("position"):
                    #skip appendix(position : -1)
                    if child.position >= 0:
                        page_number = _recursivelyUpdatePageNum(
                            child, page_number)

            return page_number

        _recursivelyUpdatePageNum(root, page_number)
        return
