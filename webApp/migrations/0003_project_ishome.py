# Generated by Django 4.2 on 2023-08-10 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0002_remove_project_ishome"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="isHome",
            field=models.BooleanField(default=False),
        ),
    ]
