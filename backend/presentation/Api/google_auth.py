import requests
from rest_framework import views, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from presentation.Serializers.user_serializer import UserSerializerWithToken
from django.conf import settings
from django.contrib.auth import login
from rest_framework_jwt.settings import api_settings

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

        # always login using a default student account
        username = "student"
        try:
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
            else:
                user = User.objects.create_user(username=username,
                                                is_active=True)
            # login user programmatically
            login(request, user)
            # return jwt token
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            payload = jwt_payload_handler(user)
            return Response(
                {
                    "allowLogin": True,
                    "token": jwt_encode_handler(payload),
                    "access": {}
                }, 200)
        except User.DoesNotExist:
            return Response(
                {
                    "allowLogin":
                    False,
                    "msg":
                    f"{username} does not exist, please create the default student account first."
                }, 200)
        except:
            return Response(
                {
                    "allowLogin": False,
                    "msg": "Internal server error."
                }, 500)
