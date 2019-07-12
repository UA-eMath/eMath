from rest_framework import serializers
from database.models import Para


class ParaSerializers(serializers.ModelSerializer):
	class Meta:
		model = Para
		fields = (
			'__all__')
