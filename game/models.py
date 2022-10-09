from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.username


class ScoreList(models.Model):
    player = models.ForeignKey(CustomUser,on_delete=models.CASCADE, related_name = 'scores')
    time = models.ForeignKey('Time',on_delete=models.CASCADE, related_name = 'time')
    score = models.ForeignKey('Score', on_delete=models.CASCADE, related_name = 'scores')


    def __str__(self):
        return f'{self.owner} : {self.time} : {self: score} points'


class Time(models.Model):


class Score(models.Model):
    score = models.IntegerField()


class Time(models.Model):
    time = models.PositiveIntegerField()