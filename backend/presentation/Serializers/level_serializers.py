from rest_framework import serializers
from presentation.models import Level


class LevelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Level
        fields = (['id'])
