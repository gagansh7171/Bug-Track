# Generated by Django 3.0.8 on 2020-08-11 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug', '0006_auto_20200808_1744'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='project_name',
            field=models.CharField(max_length=37, unique=True),
        ),
    ]
