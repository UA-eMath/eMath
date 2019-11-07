from rest_framework import serializers
from presentation.models import RootLevel,Level


class NodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Level
        fields = ("__all__")
        depth = 2