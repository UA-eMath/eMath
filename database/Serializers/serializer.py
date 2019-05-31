from rest_framework import serializers
from database.models import Level,Book


class RootSerializer(serializers.ModelSerializer):

    class meta:
        model = Level
        fields = ('title','level_number','unit_type','position','isPage','header')




    def update(self, instance, validated_data):
        instance.title = validated_data.get('title',instance.title)
        instance.level_number = validated_data.get('level_number',instance.level_number)
        instance.unit_type = validated_data.get('unit_type',instance.unit_type)
        instance.position = validated_data.get('position',instance.position)
        instance.isPage = validated_data.get('isPage',instance.isPage)
        instance.header = validated_data.get('header',instance.header)
        instance.save()

        return instance


