from django.db import models
'''
dell1234
'''
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
        unit_type : name of unit; e.g. Chapter, Section

    '''

    level_number = models.IntegerField()
    position =  models.IntegerField()
    next_level = models.ForeignKey(
        'self',
        on_delete = models.CASCADE,
        null = True,
        blank=True
    )
    isPage = models.BooleanField()
    title = models.CharField(max_length = 100,null= True,blank=True)
    header = models.CharField(max_length = 100,null = True,blank=True)
    unit_type = models.CharField(max_length=30)
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
    author = models.ManyToManyField('Person',related_name= "author")
    contributor = models.ManyToManyField('Person',related_name= "contributors",null=True,blank=True)

    date = models.DateField()




class Person(models.Model):
    first_name = models.CharField(max_length=20)
    middle_name = models.CharField(max_length=20,null=True,blank=True)
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
    para_type = models.CharField(max_length= 15)
    caption = models.CharField(max_length = 100, null=True,blank=True)

    upper_level = models.ForeignKey(Level, on_delete=models.CASCADE)
    #upper_mini_compositor = models.ForeignKey('MiniCompositor', on_delete=models.CASCADE,null=True)

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

    class Meta:
        ordering = ('position',)



class Link(models.Model):

    '''

    This class represents a Link structure

        url : url

    '''

    url = models.URLField(max_length = 200, null = True,blank=True)
    external_link = models.ManyToManyField('Link')



# class MiniCompositor(models.Model):
#
#     '''
#     This class represents a mini compositor structure.
#
#         category : category of mini compositor. e.g. example, proof, def, theorem
#         position : position of mini compositor in upper structure
#
#     '''
#
#     category = models.CharField(max_length=30)
#     position = models.IntegerField()
#
#
#     class Meta:
#         ordering = ('position',)