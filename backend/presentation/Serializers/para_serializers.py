from rest_framework import serializers
from presentation.models import Para
from presentation.Serializers.level_serializers import LevelReferSerializer


class ParaReadSerializers(serializers.ModelSerializer):
    para_parent = LevelReferSerializer

    class Meta:
        model = Para
        fields = ('id', 'content', 'position', 'para_parent')
        depth = 1


class ParaReferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Para
        fields = (['id'])


class ParaSerializers(serializers.ModelSerializer):
    para_parent = LevelReferSerializer

    class Meta:
        model = Para
        fields = ('id', 'content', 'position', 'para_parent')

    def create(self, validated_data):
        para_parent_data = validated_data.pop('para_parent')
        newPara = Para.objects.create(para_parent=para_parent_data,
                                      **validated_data)
        return newPara
