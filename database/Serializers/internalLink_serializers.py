from rest_framework import serializers
from database.models import InternalLink

class InternalLinkSerializers(serializers.ModelSerializer):
	class Meta:
		model = InternalLink
		fields = (
			'__all__')
