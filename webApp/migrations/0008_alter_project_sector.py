# Generated by Django 4.2 on 2023-08-10 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0007_alter_project_client"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="sector",
            field=models.CharField(max_length=50, null=True),
        ),
    ]
