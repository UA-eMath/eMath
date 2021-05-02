from presentation.models import Usermod
from django.contrib.auth.models import User
from presentation.Serializers.usermod_serializer import UsermodSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response


class UsermodViewSet(viewsets.ModelViewSet):
    serializer_class = UsermodSerializer
    permission_classes = [permissions.AllowAny]

    # GET ://service/person/{PERSON_ID}/
    def retrieve(self, request, *args, **kwargs):
        try:
            user = User.objects.get(username=kwargs.get("pk"))
            usermod = Usermod.objects.get(user=user.pk)
            serializer = UsermodSerializer(usermod)
            return Response(serializer.data, 200)
        except User.DoesNotExist:
            return Response(
                {
                    "allowLogin": False,
                    "msg": f"{username} does not exist."
                }, 200)
        except Usermod.DoesNotExist:
            return Response(
                {
                    "allowLogin": False,
                    "msg":
                    "Usermod info missing, please contact administrator."
                }, 200)
        except:
            return Response(
                {
                    "allowLogin": False,
                    "msg": "Internal server error."
                }, 500)
