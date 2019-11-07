# Generated by Django 2.2.1 on 2019-11-07 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('presentation', '0009_auto_20191106_1405'),
    ]

    operations = [
        migrations.AlterField(
            model_name='level',
            name='root',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='presentation.RootLevel'),
        ),
        migrations.AlterField(
            model_name='rootlevel',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='author', to='presentation.Person'),
        ),
        migrations.AlterField(
            model_name='rootlevel',
            name='contributor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contributors', to='presentation.Person'),
        ),
    ]
