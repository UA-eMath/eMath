from django.contrib import admin
from mptt.admin import MPTTModelAdmin

# Register your models here.
from .models import *
    #Level, Book, Person, Para, MiniCompositor, MathDisplay, Link

admin.site.register(Level,MPTTModelAdmin)
admin.site.register(Person)
admin.site.register(Para)
admin.site.register(ExternalLink)
admin.site.register(RootLevel)
