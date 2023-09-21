# Generated by Django 4.2 on 2023-09-19 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0021_alter_project_options_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="description",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AlterField(
            model_name="project",
            name="short_desc",
            field=models.TextField(blank=True),
        ),
    ]
