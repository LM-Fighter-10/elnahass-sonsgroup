# Generated by Django 4.2 on 2023-08-10 01:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="project",
            name="isHome",
        ),
    ]
