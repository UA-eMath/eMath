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




    '''
    level_number = models.IntegerField()
    position =  models.IntegerField()
    next_level = models.ForeignKey(
        'self',
        on_delete = models.CASCADE,
        null = True
    )
    isPage = models.BooleanField()
    title = models.CharField(max_length=100)


    class meta:
        abstract = True


class Book(Level):
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

class Chapter(Level):
    

