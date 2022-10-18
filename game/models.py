from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.username


class Level(models.Model):
    number = models.PositiveIntegerField(null=True, blank=True, default=None)

    def __str__(self):
        return f'Level: {self.number}'


class TimeTrial(models.Model):
    player = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True, related_name='times')
    level = models.ForeignKey(Level, on_delete=models.CASCADE, null=True, blank=True, related_name='times')
    time = models.FloatField(null=True, blank=True, default=None)
    full_run = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.player.username} completed {self.level} in {self.time} seconds'
