from django.db import models
from django.contrib.auth.models import User


class Player(models.Model):
    user = models.OneToOneField(
        User, related_name="player", on_delete=models.CASCADE)
    avatar = models.ImageField(name="avatar", upload_to='avatars')
    registration_date = models.DateField(name="registered_at", auto_now=True)
    country = models.CharField(name="country", max_length=50, null=False)
    age = models.IntegerField(name="age", default=0)
    is_senior = models.BooleanField(name="is_senior", default=False)
    total_lost = models.IntegerField(name="lost")
    total_won = models.IntegerField(name="win")
    injured = models.BooleanField(name="injured", default=False)
    with_amount = models.IntegerField(
        name="with_amount", default=0)
    insurance = models.BooleanField(name="insurance", default=False)
    hotel_room = models.CharField(
        name="hotel_room", null=False, max_length=5)
    favorite_slot = models.CharField(max_length=15, name="favorite_slot")
    balance = models.IntegerField(name="balance", default=0)

    class Meta:
        verbose_name = 'Player'
        verbose_name_plural = 'Players'

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} #{self.user.id}"


class Feedback(models.Model):
    owner = models.ForeignKey(
        User, related_name="feedback", on_delete=models.CASCADE)
    text = models.CharField(max_length=999, name="text", null=False)
    rating = models.IntegerField(max_length=1, default=5)

    class Meta:
        verbose_name = 'Feedback'
        verbose_name_plural = 'Feedbacks'

    def __str__(self):
        return f"{self.owner.first_name} {self.owner.last_name}'s feedback"
