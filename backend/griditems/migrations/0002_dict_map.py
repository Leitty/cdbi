# Generated by Django 2.0.5 on 2018-05-29 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('griditems', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='dict_map',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dict_ch', models.CharField(max_length=200)),
                ('dict_eng', models.CharField(max_length=200)),
            ],
        ),
    ]
