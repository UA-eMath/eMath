from django.db import models

# Create your models here.
class Level(models.Model):
    '''
    This class represents a level structure.

        level_number : level number of unit

        position : position of this unit in corresponded level (units in each level should be ordered)

        next_level : point to next level table

        isPage : if all children under this node contains a page

        title : title of unit

        header : header of unit, could be null

        name : name of unit; e.g. Chapter, Section

    '''
    level_number = models.IntegerField()
    position =  models.IntegerField()
    next_level = models.ForeignKey(
        'self',
        on_delete = models.CASCADE,
        null = True
    )
    isPage = models.BooleanField()
    title = models.CharField(max_length = 100)
    header = models.CharField(max_length = 100,null = True)

    para = models.ForeignKey(
        'Para',
        on_delete = models.CASCADE,
    )

    math_display = models.ForeignKey(
        'MathDisplay',
        on_delete = models.CASCADE,
    )

    mini_Compo = models.ForeignKey(
        'MiniCompositor',
        on_delete = models.CASCADE,

    )

    class meta:
        abstract = True
        ordering = ('position')


class Book(Level):
    '''
    This class represents a book structure extend level class.

        html_title : Version of title for the browser title bar

        authors : List of all authors of the book

        contributors : List of all contributors to the book; e.g. programmers, graphic designers, etc.

        date : Date
    '''

    html_title = models.CharField(max_length=100)
    authors = models.ForeignKey(
        'Authors',
        on_delete= models.CASCADE
    )
    contributors = models.ForeignKey(
        'Contributors',
        on_delete = models.CASCADE
    )

    date = models.DateField()


class Para(models.Model):

    '''
    This class represents a paragraph structure.

            content :
            external_link
            position
            para_type : format of paragraph; e.g. Text, Table(in Json), List(in Json)
            caption
            internal_link

    '''

    content = models.TextField()
    external_link = models.ManyToManyField('Link')
    position = models.IntegerField()
    para_type = models.CharField(max_length= 15)
    caption = models.CharField(max_length = 100, null=True)
    internal_link = models.ForeignKey(
        Level,
        on_delete = models.CASCADE
    )

    class Meta:
        ordering = ("position")


class MathDisplay(models.Model):
    '''
    This class represents a


    '''

    position = models.IntegerField()
    content = models.TextField()

    class Meta:
        ordering = ("position")



class Link(models.Model):
    '''
    This class represents a


    '''

    url = models.URLField(max_length = 200, null = True)



class MiniCompositor(models.Model):
    '''
    This class represents a


    '''

    category = models.CharField(max_length=30)
    position = models.IntegerField()
    para = models.ForeignKey(
        Para,
        on_delete = models.CASCADE,
    )

    math_display = models.ForeignKey(
        MathDisplay,
        on_delete = models.CASCADE,
    )

    class Meta:
        ordering = ("position")
