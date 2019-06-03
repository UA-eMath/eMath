from database.models import *
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from database.Serializers.para_serializers import ParaSerializers

def MakePages(id):
    return Level.objects.root_node(id).get_descendants().filter(isPage = True)
    # for children in Level.objects.root_node(id).get_children():
    #     if children.isPage == True:
    #         print(1)
    #         pass

def page_content(request,title,id):
    '''

    :param request:
    :param id:  root node id
    :return:
    '''
    if request.method == "GET":
        a = MakePages(id)
        paras = Para.objects.filter(para_upper=a[0])

        serializer = ParaSerializers(paras,many=True)
        return JsonResponse(serializer.data, safe=False)