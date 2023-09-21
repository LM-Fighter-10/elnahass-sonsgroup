# Generated by Django 4.2 on 2023-08-30 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0018_customers_remove_client_address_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="client",
            name="my_projects",
            field=models.ManyToManyField(
                blank=True, editable=False, related_name="projects", to="webApp.project"
            ),
        ),
    ]
