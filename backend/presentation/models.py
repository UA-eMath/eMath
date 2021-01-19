from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib.postgres.fields import JSONField

from .constant.basic_command import new_commands
'''
yaozhilu
dell1234
'''


def default_dict():
    return {"treeData": {}}


def basic_command():
    return new_commands


def basic_shortcut():
    return {}


# Create your models here.


class RootLevel(models.Model):

    html_title = models.CharField(max_length=100, null=True, blank=True)
    author = models.ForeignKey('Person',
                               related_name="author",
                               null=True,
                               blank=True,
                               on_delete=models.SET_NULL)
    contributor = models.ForeignKey('Person',
                                    related_name="contributors",
                                    null=True,
                                    blank=True,
                                    on_delete=models.SET_NULL)
    date = models.DateField(null=True, blank=True)
    index_item = JSONField(default=default_dict)
    symbol_index = JSONField(default=default_dict)
    author_index = JSONField(default=default_dict)
    new_command = JSONField(default=basic_command)
    tex_shortcut = JSONField(default=basic_shortcut)


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
    parent = TreeForeignKey('self',
                            on_delete=models.CASCADE,
                            null=True,
                            blank=True,
                            related_name="children")

    isPage = models.BooleanField()
    title = models.CharField(max_length=100, null=True, blank=True)
    tocTitle = models.CharField(max_length=100, null=True, blank=True)
    unit_type = models.CharField(max_length=30, null=True, blank=True)
    root = models.OneToOneField(RootLevel,
                                on_delete=models.CASCADE,
                                null=True,
                                blank=True)

    class MPTTMeta:
        order_insertion_by = ['position']


class Person(models.Model):
    first_name = models.CharField(max_length=20)
    middle_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20)


def default_para_dict():
    return {"data": ""}


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

    para_parent = models.ForeignKey(
        Level,
        on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ('position', )


class ExternalLink(models.Model):
    '''

	This class represents an external link structure
		parent_e_id: links from para
		content: chars contain a hyperlink
		url: links' url
		target: if the link will be opened in a new browser tab

	'''

    parent_e_id = models.ForeignKey(Para,
                                    on_delete=models.CASCADE,
                                    related_name='external_parent_id')
    content = models.CharField(max_length=150)
    url = models.URLField()
    target = models.BooleanField()
