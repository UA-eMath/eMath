from rest_framework import serializers
from presentation.models import Label, Para
from presentation.Serializers.para_serializers import ParaReferSerializer


class LabelSerializers(serializers.ModelSerializer):
    linked_para = ParaReferSerializer

    class Meta:
        model = Label
        fields = '__all__'
        # fields = ('id', 'content', 'linked_para', 'linked_level', 'root')

    def create(self, validated_data):
        if 'linked_para' in validated_data:
            linked_para_data = validated_data.pop('linked_para')
            newLabel = Label.objects.create(linked_para=linked_para_data,
                                            **validated_data)
        else:
            linked_level_data = validated_data.pop('linked_level')
            newLabel = Label.objects.create(linked_level=linked_level_data,
                                            **validated_data)

        return newLabel
