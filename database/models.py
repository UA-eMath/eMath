from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

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
		title : title of unit
		header : header of unit, could be null
		unit_type : name of unit; e.g. Chapter, Section

	'''

	position = models.IntegerField()

	parent = TreeForeignKey(
		'self',
		on_delete=models.CASCADE,
		null=True,
		blank=True,
		related_name="children"
	)

	isPage = models.BooleanField()
	title = models.CharField(max_length=100, null=True, blank=True)
	header = models.CharField(max_length=100, null=True, blank=True)
	unit_type = models.CharField(max_length=30)
	html_title = models.CharField(max_length=100, null=True, blank=True)
	author = models.ManyToManyField('Person', related_name="author", blank=True)
	contributor = models.ManyToManyField('Person', related_name="contributors", blank=True)
	date = models.DateField(null=True, blank=True)

	class MPTTMeta:
		order_insertion_by = ['position']


class Person(models.Model):
	first_name = models.CharField(max_length=20)
	middle_name = models.CharField(max_length=20, null=True, blank=True)
	last_name = models.CharField(max_length=20)


class Para(models.Model):
	'''
	This class represents a paragraph structure.

			content : text of paragraph
			external_link : an external url
			position : position of this paragraph in upper structure
			para_type : format of paragraph; e.g. Text, Table(in Json), List(in Json)
			caption : caption of this paragraph
			internal_link : #

	'''

	content = models.TextField()
	position = models.IntegerField()
	para_type = models.CharField(max_length=15)
	caption = models.CharField(max_length=100, null=True, blank=True)

	para_parent = models.ForeignKey(
		Level,
		on_delete=models.CASCADE,
	)

	class Meta:
		ordering = ('position',)


class MathDisplay(models.Model):
	'''

	This class represents a math.display structure(latex)
		position :  position of math display in upper structure
		content : latex in string

	'''

	position = models.IntegerField()
	content = models.TextField()
	math_display_upper = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='math_display_next')

	class Meta:
		ordering = ('position',)


class InternalLink(models.Model):
	'''

	This class represents a internal Link structure

		parent_i_id: links from para
		target: links to Level
		content: chars contain a hyperlink

	'''
	parent_i_id = models.ForeignKey(Para, on_delete=models.CASCADE, related_name='internal_parent_id')
	target = models.OneToOneField(Level, on_delete=models.CASCADE, related_name='link_to')
	content = models.CharField(max_length=150)


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
