from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.username


class LeaderBoard(models.Model):
    player = models.ForeignKey('Character',on_delete=models.CASCADE, related_name = 'player')
    time = models.ForeignKey('Time',on_delete=models.CASCADE, related_name = 'time')
    level = models.ForeignKey('Level', on_delete=models.CASCADE, related_name= 'levels')

    def __str__(self):
        return f'{self.player} : {self.time} seconds on level {self.level}'


class Character(models.Model):
    name = models.CharField(max_length=15, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='players')

    def __str__(self):
        return f'{self.user.username} selected {self.name}'


class Level(models.Model):
    name = models.PositiveIntegerField(null=True, blank=True, default=None)

    def __str__(self):
        return f'Level: {self.name}'


class Time(models.Model):
    time = models.FloatField(null=True, blank=True, default=None)
    player = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True, related_name='times')
    level = models.ForeignKey(Level, on_delete=models.CASCADE, null=True, blank=True, related_name='times')

    def __str__(self):
        return f'{self.player.username} completed level {self.level.name} in {self.time} seconds'

