from rest_framework import serializers
from presentation.models import Bibliography


class BibliographySerializers(serializers.ModelSerializer):
    class Meta:
        model = Bibliography
        fields = '__all__'

    def create(self, validated_data):
        return Bibliography.objects.create(**validated_data)
