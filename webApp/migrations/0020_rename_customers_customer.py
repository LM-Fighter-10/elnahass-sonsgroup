# Generated by Django 4.2 on 2023-08-31 02:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0019_alter_client_my_projects"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Customers",
            new_name="Customer",
        ),
    ]
