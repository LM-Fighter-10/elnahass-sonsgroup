# Generated by Django 4.2 on 2023-08-10 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0003_project_ishome"),
    ]

    operations = [
        migrations.AddField(
            model_name="image",
            name="thumbnail",
            field=models.BooleanField(default=False),
        ),
    ]
