from rest_framework import serializers
from database.models import Level


class NodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Level
        fields = ('tree_id','position','isPage','title','header','unit_type','html_title','author','contributor','date')

