from rest_framework import serializers
from presentation.models import Level


class NodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Level
        fields = ('id','title','tocTitle','author')
        depth = 1
