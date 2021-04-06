from rest_framework import serializers
from presentation.models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ("__all__")

    def create(self, validated_data):
        return Person.objects.create(**validated_data)