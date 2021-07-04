from rest_framework import views
from rest_framework.response import Response
from presentation.models import Usermod, Person
from django.contrib.auth.models import User
from presentation.Serializers.user_serializer import UserSerializer


class GetCurrentUser(views.APIView):
    def get(self, request, *args, **kwargs):
        """
        Determine the current user by their token, and return their data
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)