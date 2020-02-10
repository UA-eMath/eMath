from rest_framework import serializers
from presentation.models import RootLevel,Level


class RootLevelSerializer(serializers.ModelSerializer):

    class Meta:
        model = RootLevel
        fields = ("__all__")

    def create(self, validated_data):
        return RootLevel.objects.create(**validated_data)
