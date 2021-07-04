from presentation.models import Person, Usermod, RootLevel, Level
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from presentation.Serializers.person_serializer import PersonSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
import django.db.utils
import json


class IsAuthenticatedOrCreate(permissions.BasePermission):
    # permission override, to prevent login before registration
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            if view.action == "create":
                return True
            else:
                return False
        else:
            return True


class PersonViewSet(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()
    permission_classes = (IsAuthenticatedOrCreate, )

    def list(self, request, *args, **kwargs):
        return Response(PersonSerializer(self.queryset, many=True).data, 200)

    # GET ://service/person/{PERSON_ID}/
    def retrieve(self, request, *args, **kwargs):
        queryset = Person.objects.get(pk=kwargs.get("pk"))
        serializer = PersonSerializer(queryset)
        return Response(serializer.data, status=200)

    # POST ://service/person/
    def create(self, request, *args, **kwargs):
        request_data = request.data.copy()
        # create an person object
        first_name = request_data.get('firstName', "")
        middle_name = request_data.get('middleName', "")
        last_name = request_data.get('lastName', "")
        person_data = {
            'first_name': first_name,
            'middle_name': middle_name,
            'last_name': last_name
        }
        type = request_data.get('type', None)
        access = request_data.get('access', None)
        if (type):
            person_data['type'] = type
        if (access):
            person_data['access'] = {"book": [access]}
        # create user if given enough information
        username = request_data.get('username', None)
        email = request_data.get('email', "")
        password = request_data.get('password', None)
        if (username and password):
            try:
                if (type in ['Student', 'Tester']):
                    user = User.objects.create_user(username,
                                                    email,
                                                    password,
                                                    is_active=True)
                else:
                    user = User.objects.create_user(username,
                                                    email,
                                                    password,
                                                    is_active=False)
                Usermod.objects.create(allowLogin=True, user=user)
                person_data['user'] = user.pk
                serializer = self.serializer_class(data=person_data)
                serializer.is_valid()
                serializer.save()
                serializerData = dict(serializer.data)
                if (type not in ['Student', 'Tester']):
                    serializerData["msg"] = "Pending admin approval."
                if (type == 'Tester'):
                    rootLevel = get_object_or_404(RootLevel, pk=access)
                    rootLevel.tester = {
                        'id': user.id,
                        'username': user.username,
                    }
                    rootLevel.save()
                return Response(serializerData, 200)
            except django.db.utils.IntegrityError:
                return Response({'msg': f'{username} exists.'}, 200)
            except Exception:
                if (user):
                    user.delete()
                return Response(
                    {
                        "msg":
                        "Internal server error when creating a person object."
                    }, 500)
        return Response({"msg": "Internal server error."}, 500)

    # PUT ://service/person/{PERSON_ID}/
    def update(self, request, *args, **kwargs):
        request_data = request.data.copy()
        person = Person.objects.get(pk=kwargs.get("pk"))

        new_first_name = request_data.get('firstName', None)
        new_middle_name = request_data.get('middleName', None)
        new_last_name = request_data.get('lastName', None)
        new_email = request_data.get('email', None)
        if (new_first_name):
            person.displayName = new_first_name
        if (new_middle_name):
            person.github = new_middle_name
        if (new_last_name):
            person.github = new_last_name
        if (new_email):
            person.user.email = new_email
            person.user.save()
        person.save()
        return Response("Person information updated successfully", 204)