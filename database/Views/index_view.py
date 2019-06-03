from django.shortcuts import render
from database.models import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from database.Serializers.root_serializer import NodeSerializer

# Create your views here.
def show_tree(request):
    return render(request, "level.html", {'levels': Level.objects.all()})


def index(request):
    if request.method == "GET":
        try:
            root_objects = Level.objects.root_nodes()

        except Level.DoesNotExist:
            return HttpResponse(status=404)


        serializer = NodeSerializer(root_objects,many=True)

        return JsonResponse(serializer.data,safe=False)


    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = NodeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)
        return JsonResponse(serializer.errors,status=400)



