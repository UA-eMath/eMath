from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from presentation.Serializers.user_serializer import UserSerializerOther


class UserViewSets(viewsets.ModelViewSet):
    serializer_class = UserSerializerOther
    queryset = User.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(
            self.serializer_class(self.queryset, many=True).data, 200)

    def retrieve(self, request, *args, **kwargs):
        queryset = User.objects.get(pk=kwargs.get("pk"))
        serializer = self.serializer_class(queryset)
        return Response(serializer.data, status=200)
