# Generated by Django 4.2 on 2023-09-19 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0023_rename_short_desc_project_shortdesc"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="shortDesc",
            field=models.TextField(blank=True, max_length=300),
        ),
    ]
