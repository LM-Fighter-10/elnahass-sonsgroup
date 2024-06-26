# Generated by Django 4.2 on 2023-08-25 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webApp", "0017_remove_client_primary_contact_client_fax_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Customers",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=30)),
                ("email", models.EmailField(max_length=40)),
                ("phone", models.CharField(max_length=20)),
                ("outline_Desc", models.TextField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name="client",
            name="address",
        ),
        migrations.RemoveField(
            model_name="client",
            name="description",
        ),
        migrations.RemoveField(
            model_name="client",
            name="email",
        ),
        migrations.RemoveField(
            model_name="client",
            name="fax",
        ),
        migrations.RemoveField(
            model_name="client",
            name="phone",
        ),
        migrations.RemoveField(
            model_name="project",
            name="duration",
        ),
    ]
