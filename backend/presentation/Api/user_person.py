from rest_framework import views
from rest_framework.response import Response
from presentation.models import Usermod, Person
from django.contrib.auth.models import User
from presentation.Serializers.user_serializer import UserSerializer
from presentation.Serializers.person_serializer import PersonSerializer


class UserToPerson(views.APIView):
    def get(self, request, *args, **kwargs):
        try:
            who = request.user.username
            person = Person.objects.get(user=request.user.pk)
            serializer = PersonSerializer(person)
            return Response(serializer.data, 200)
        except KeyError as e:
            return Response({"msg": e.args}, 200)
        except Person.DoesNotExist:
            return Response(
                {
                    "msg":
                    "Cannot find corresponding person for " + str(who) + "."
                }, 200)
        except User.DoesNotExist:
            return Response(
                {
                    "msg":
                    "Cannot find corresponding user for " + str(who) + "."
                }, 200)
        except:
            return Response({"msg": "Internal server error."}, 500)

    def post(self, request, *args, **kwargs):
        try:
            user = request.data.get('username', None)
            if user:
                who = user
                person = Person.objects.get(user=User.objects.get(
                    username=user).pk)
                serializer = PersonSerializer(person)
                return Response(serializer.data, 200)
            else:
                raise KeyError("Incorrect post request.")
        except KeyError as e:
            return Response({"msg": e.args}, 200)
        except Person.DoesNotExist:
            return Response(
                {
                    "msg":
                    "Cannot find corresponding person for " + str(who) + "."
                }, 200)
        except User.DoesNotExist:
            return Response(
                {
                    "msg":
                    "Cannot find corresponding user for " + str(who) + "."
                }, 200)
        except:
            return Response({"msg": "Internal server error."}, 500)
