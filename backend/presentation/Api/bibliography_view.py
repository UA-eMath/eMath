from rest_framework import viewsets
from rest_framework.response import Response
from presentation.models import Bibliography
from presentation.Serializers.bibliography_serializers import BibliographySerializers


class BibliographyViewSet(viewsets.ModelViewSet):
    serializer_class = BibliographySerializers

    queryset = Bibliography.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(self.serializer_class(self.queryset, many=True).data)

    def retrieve(self, request, *args, **kwargs):
        bb_id = self.kwargs["pk"]
        bb = Bibliography.objects.get(id=bb_id)

        return Response(self.serializer_class(bb).data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 200)

    def put(self, request, *args, **kwargs):
        bb_id = request.data['params'].get('id', None)
        key = request.data['params'].get('key', None)
        content = request.data['params'].get('content', None)
        try:
            bb = Bibliography.objects.get(id=bb_id)
            if key:
                bb.key = key
            if content:
                bb.content = content
            bb.save()
        except:
            return Response("Bibliography update fails.", 500)

        return Response("Bibliography is successfully updated.", 204)

    def destroy(self, request, *args, **kwargs):
        try:
            bb = Bibliography.objects.get(pk=self.kwargs["pk"])
            bb.delete()
        except:
            return Response(
                "Bibliography id(" + self.kwargs["pk"] + ") is not found.",
                404)

        return Response("Bibliography is successfully deleted.", 200)