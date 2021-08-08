from django.db import models
from django.db.models.fields import BooleanField
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
from .constant.basic_command import new_commands
'''
yaozhilu
dell1234
'''

ACCOUNT_TYPES = [('Author', 'Author'), ('Student', 'Student'), ('TA', 'TA'),
                 ('Tester', 'Tester')]


def default_dict():
    return {"treeData": {}}


def basic_command():
    return new_commands


def basic_shortcut():
    return {}


def default_access():
    return {"book": []}


def basic_dict():
    return {}


# Create your models here.


class RootLevel(models.Model):

    html_title = models.CharField(max_length=128, null=True, blank=True)
    author = models.ForeignKey('Person',
                               related_name="author",
                               null=True,
                               blank=True,
                               on_delete=models.SET_NULL)
    contributor = JSONField(default=basic_dict, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    index_item = JSONField(default=default_dict, null=True, blank=True)
    symbol_index = JSONField(default=default_dict, null=True, blank=True)
    author_index = JSONField(default=default_dict, null=True, blank=True)
    new_command = JSONField(default=basic_command, null=True, blank=True)
    tex_shortcut = JSONField(default=basic_shortcut, null=True, blank=True)
    cover_image = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    tester = JSONField(default=basic_dict, null=True, blank=True)


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
    title = models.CharField(max_length=128, null=True, blank=True)
    tocTitle = models.CharField(max_length=128, null=True, blank=True)
    unit_type = models.CharField(max_length=30, null=True, blank=True)
    root = models.OneToOneField(RootLevel,
                                on_delete=models.CASCADE,
                                null=True,
                                blank=True)

    class MPTTMeta:
        order_insertion_by = ['position']


class Person(models.Model):
    # middle_name and last_name can be null or blank, but not first_name
    # combine these 3 fields as the person's full name
    first_name = models.CharField(max_length=20, blank=True)
    middle_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    # use type to control the person's permissions
    type = models.CharField(max_length=20,
                            choices=ACCOUNT_TYPES,
                            default='Student')
    # Controls which rootLevel the person can access. If all, leave empty.
    access = JSONField(default=default_access)
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                null=True,
                                blank=True)


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


class Label(models.Model):
    '''
    This class represents a label structure
    '''
    content = models.CharField(max_length=128, null=True, blank=True)
    linked_para = models.OneToOneField(Para,
                                       on_delete=models.CASCADE,
                                       null=True,
                                       blank=True,
                                       related_name='label_linked_para')
    linked_level = models.OneToOneField(Level,
                                        on_delete=models.CASCADE,
                                        null=True,
                                        blank=True,
                                        related_name='label_linked_level')
    root = models.ForeignKey(RootLevel,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True,
                             related_name='root')

    class Meta:
        ordering = ('content', )


class Usermod(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    allowLogin = models.BooleanField(default=False)