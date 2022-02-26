import requests
from rest_framework import views, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from presentation.Serializers.user_serializer import UserSerializerWithToken
from django.conf import settings

GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'


class GoogleAuth(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        id_token = request.headers.get('Authorization')
        response = requests.get(GOOGLE_ID_TOKEN_INFO_URL,
                                params={'id_token': id_token})
        if not response.ok:
            return Response('id_token is invalid.', 401)

        audience = response.json()['aud']

        if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
            return Response('Invalid audience.', 401)

        # check if user exist
        username = request.data.get("name", None)
        username = username.replace(" ", "")
        try:
            user = User.objects.get(username=username)
            serializer = UserSerializerWithToken(user)
            return Response({
                "allowLogin": True,
                "userInfo": serializer.data
            }, 200)
        except User.DoesNotExist:
            return Response(
                {
                    "allowLogin": False,
                    "msg": f"{username} does not exist."
                }, 200)
        except:
            return Response(
                {
                    "allowLogin": False,
                    "msg": "Internal server error."
                }, 500)
