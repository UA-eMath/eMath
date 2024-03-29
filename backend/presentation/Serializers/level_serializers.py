from rest_framework import serializers
from presentation.models import Level


class LevelReferSerializer(serializers.ModelSerializer):
	class Meta:
		model = Level
		fields = (['id'])


class LevelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Level
		fields = '__all__'

	def create(self,validated_data):
		try:
			level_parent = validated_data.pop('parent')
		except:
			return Level.objects.create(**validated_data)

		newLevel = Level.objects.create(parent=level_parent,**validated_data)

		return newLevel