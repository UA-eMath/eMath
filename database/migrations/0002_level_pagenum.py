# Generated by Django 2.2.1 on 2019-07-15 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='level',
            name='pageNum',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]