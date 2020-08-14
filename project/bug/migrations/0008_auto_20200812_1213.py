# Generated by Django 3.0.8 on 2020-08-12 12:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bug', '0007_auto_20200811_2005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bug',
            name='assigned_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assigned', to=settings.AUTH_USER_MODEL),
        ),
    ]