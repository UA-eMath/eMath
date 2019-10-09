from rest_framework import serializers
from presentation.models import Para


class ParaSerializers(serializers.ModelSerializer):
	class Meta:
		model = Para
		fields = ('__all__')
		depth = 1

	# def create(self, validated_data):
	# 	return Para(**validated_data)
	#
	# def update(self, instance, validated_data):
	# 	instance.content = validated_data.get('content', instance.content)
	# 	instance.position = validated_data.get('position', instance.position)
	# 	instance.caption = validated_data.get('caption', instance.caption)
	# 	instance.para_parent = validated_data.get('para_parent',instance.para_parent)
	# 	instance.save()
	# 	return instance