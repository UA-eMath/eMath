from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib.postgres.fields import JSONField

'''
yaozhilu
dell1234
'''


# Create your models here.
class Level(MPTTModel):
	'''
	This class represents a level structure.

		level_number : level number of unit
		position : position of this unit in corresponded level (units in each level should be ordered)
		next_level : point to next level table
		isPage : if all children under this node contains a page
		title : full title of unit, may contain latex
		tocTitle : Title shows in table of content
		unit_type : name of unit; e.g. Chapter, Section

	'''

	position = models.IntegerField()
	pageNum = models.IntegerField(blank=True, null=True)
	parent = TreeForeignKey(
		'self',
		on_delete=models.CASCADE,
		null=True,
		blank=True,
		related_name="children"
	)

	isPage = models.BooleanField()
	title = models.CharField(max_length=100, null=True, blank=True)
	tocTitle = models.CharField(max_length=100, null=True, blank=True)
	unit_type = models.CharField(max_length=30,null=True, blank=True)
	html_title = models.CharField(max_length=100, null=True, blank=True)
	author = models.ForeignKey('Person', related_name="author",null=True, blank=True,on_delete=models.CASCADE)
	contributor = models.ForeignKey('Person', related_name="contributors", null=True,blank=True,on_delete=models.CASCADE)
	date = models.DateField(null=True, blank=True)

	class MPTTMeta:
		order_insertion_by = ['position']


class Person(models.Model):
	first_name = models.CharField(max_length=20)
	middle_name = models.CharField(max_length=20, null=True, blank=True)
	last_name = models.CharField(max_length=20)


def default_para_dict():
	return {"type" : "", "data": ""}

class Para(models.Model):
	'''
	This class represents a paragraph structure.

			content :
			An Json object. It must contains tree children: "text", "Table", "list". They indicates object types.
				"text" is one plain paragraph
				"table" is nested JSON structure of a table
				"list"  is a nested array

			position : position of this paragraph in upper structure
			caption : caption of this paragraph

	'''

	content = JSONField(default=default_para_dict)
	position = models.IntegerField(null=True, blank=True)
	caption = models.CharField(max_length=100, null=True, blank=True)

	para_parent = models.ForeignKey(
		Level,
		on_delete=models.CASCADE,
	)

	class Meta:
		ordering = ('position',)


class ExternalLink(models.Model):
	'''

	This class represents an external link structure
		parent_e_id: links from para
		content: chars contain a hyperlink
		url: links' url
		target: if the link will be opened in a new browser tab

	'''

	parent_e_id = models.ForeignKey(Para, on_delete=models.CASCADE, related_name='external_parent_id')
	content = models.CharField(max_length=150)
	url = models.URLField()
	target = models.BooleanField()
