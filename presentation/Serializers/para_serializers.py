from rest_framework import serializers
from presentation.models import Para


class ParaSerializers(serializers.ModelSerializer):
	class Meta:
		model = Para
		fields = ('__all__')
		depth = 1
