# Generated by Django 2.2.1 on 2019-07-18 20:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0004_auto_20190715_1338'),
    ]

    operations = [
        migrations.RenameField(
            model_name='internallink',
            old_name='target',
            new_name='linkTo',
        ),
        migrations.RenameField(
            model_name='level',
            old_name='header',
            new_name='tocTitle',
        ),
    ]