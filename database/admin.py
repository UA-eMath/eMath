from django.contrib import admin

# Register your models here.
from .models import *
    #Level, Book, Person, Para, MiniCompositor, MathDisplay, Link

admin.site.register(Level)
admin.site.register(Person)
admin.site.register(Para)
admin.site.register(MathDisplay)
admin.site.register(MiniCompositor)
admin.site.register(Link)
admin.site.register(Book)

