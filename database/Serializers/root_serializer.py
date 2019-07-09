from rest_framework import serializers
from database.models import Level


class NodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Level
        fields = ('id','title','header','author')
        depth = 1
