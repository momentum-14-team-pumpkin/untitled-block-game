from rest_framework import serializers
from .models import CustomUser, TimeTrial

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'username')


class TimeTrialSerializer(serializers.ModelSerializer):
    player = serializers.SlugRelatedField(slug_field="username", read_only=True)

    class Meta:
        model = TimeTrial
        fields = ('id', 'player', 'time', )
