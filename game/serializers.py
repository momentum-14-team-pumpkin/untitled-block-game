from rest_framework import serializers
from .models import CustomUser, TimeTrial, Level


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username')


class TimeTrialSerializer(serializers.ModelSerializer):
    player = serializers.SlugRelatedField(slug_field="username", read_only=True)
    level = serializers.SlugRelatedField(slug_field="number", read_only=True)

    class Meta:
        model = TimeTrial
        fields = ('id', 'player', 'level', 'time',)


class LevelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Level
        fields = ('id', 'number',)
