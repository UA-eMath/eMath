from presentation.models import Level, Para
from rest_framework import viewsets
from presentation.Serializers.para_serializers import ParaReadSerializers
from rest_framework.response import Response
from .utils import getParas


class getPageViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ParaReadSerializers

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # empty page
        if queryset == []:
            return Response(self.serilalizeNestList(queryset))

        # bad request
        if not queryset:
            return Response(
                'The provided id is not for a page or page number/level id is not provided.',
                500)

        return Response(self.serilalizeNestList(queryset))

    def serilalizeNestList(self, array):
        result = []
        for item in array:
            if isinstance(item, list):
                result.append(self.serilalizeNestList(item))
            else:
                data = self.get_serializer(item).data
                result.append(data)
        return result

    def get_queryset(self):
        level_id = self.request.query_params.get('id', None)
        page_num = self.request.query_params.get('page', None)
        root = self.request.query_params.get('root', None)

        # next/pre page
        if page_num is not None and page_num != 0:
            try:
                root_level = Level.objects.get(id=root)
            except:
                return None
            if root_level is not None:
                page = root_level.get_root().get_descendants().filter(
                    isPage=True, pageNum=page_num).first()

        # fist page/ open window
        elif (level_id is not None):
            page = Level.objects.get(id=level_id)
            if page.is_root_node():
                page = page.get_descendants().filter(pageNum=1).first()

            if (page == None) or (not page.isPage):
                return None
        else:
            return None

        return getParas(page)
