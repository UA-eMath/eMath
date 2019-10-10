from rest_framework import serializers
from presentation.models import Para,Level
from presentation.Serializers.level_serializers import LevelSerializer

class ParaReadSerializers(serializers.ModelSerializer):
	para_parent = LevelSerializer
	class Meta:
		model = Para
		fields = ('id','content','position','caption','para_parent')
		depth = 1


class ParaSerializers(serializers.ModelSerializer):
	para_parent = LevelSerializer
	class Meta:
		model = Para
		fields = ('id','content','position','caption','para_parent')

	def create(self, validated_data):

		para_parent_data = validated_data.pop('para_parent')
		newPara = Para.objects.create(para_parent=para_parent_data,**validated_data)
		return newPara



	#
	# def update(self, instance, validated_data):
	# 	instance.content = validated_data.get('content', instance.content)
	# 	instance.position = validated_data.get('position', instance.position)
	# 	instance.caption = validated_data.get('caption', instance.caption)
	# 	instance.para_parent = validated_data.get('para_parent',instance.para_parent)
	# 	instance.save()
	# 	return instance