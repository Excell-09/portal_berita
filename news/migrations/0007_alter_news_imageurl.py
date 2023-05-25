# Generated by Django 4.2.1 on 2023-05-25 13:44

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0006_rename_newss_news'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='imageUrl',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='image'),
        ),
    ]
