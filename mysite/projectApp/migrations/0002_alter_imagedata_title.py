# Generated by Django 3.2.9 on 2021-11-01 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagedata',
            name='title',
            field=models.CharField(max_length=32),
        ),
    ]