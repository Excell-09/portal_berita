# Generated by Django 4.2.1 on 2023-05-20 03:32

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('news', '0004_alter_news_id'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='News',
            new_name='Newss',
        ),
    ]
