# Generated by Django 3.2.8 on 2021-10-30 13:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(upload_to='avatars')),
                ('registered_at', models.DateField(auto_now=True)),
                ('country', models.CharField(max_length=50)),
                ('age', models.IntegerField(default=0)),
                ('is_staff', models.BooleanField(default=False)),
                ('lost', models.IntegerField()),
                ('win', models.IntegerField()),
                ('have been injured during vacation', models.BooleanField(default=False)),
                ('arrived with amount off people in hotel', models.IntegerField(default=0)),
                ('has an insurance', models.BooleanField(default=False)),
                ('hotel room number', models.CharField(max_length=5)),
                ('favorite slot', models.CharField(max_length=15)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Player',
                'verbose_name_plural': 'Players',
            },
        ),
    ]