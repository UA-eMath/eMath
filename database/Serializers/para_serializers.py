from rest_framework import serializers
from database.models import Para

class ParaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Para
        fields = (
            'content',
            'position',
            'para_type',
            'caption',
            'para_upper')
