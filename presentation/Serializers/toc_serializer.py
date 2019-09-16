from rest_framework import serializers
from presentation.models import Level


class RecursiveField(serializers.Serializer):
	def to_representation(self, value):
		serializer = self.parent.parent.__class__(value, context=self.context)
		return serializer.data


class Toc_serializer(serializers.ModelSerializer):
	children = RecursiveField(many=True)
	class Meta:
		model = Level
		fields = ('title','tocTitle','id','children','isPage')
