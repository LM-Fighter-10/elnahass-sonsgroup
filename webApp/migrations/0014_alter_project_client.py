# Generated by Django 4.2 on 2023-08-23 15:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0013_alter_client_my_projects"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="client",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="webApp.client",
            ),
        ),
    ]
