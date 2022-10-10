# untitled-block-game


# class Character(models.Model):
#     name = models.CharField(max_length=15, blank=True, null=True)
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='players')

#     def __str__(self):
#         return f'{self.user.username} selected {self.name}'


# class Level(models.Model):
#     number = models.PositiveIntegerField(null=True, blank=True, default=None)
#     name = models.IntegerField(null=True, blank=True, default=None)

#     def __str__(self):
#         return f'Level: {self.name}'