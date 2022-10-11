from rest_framework import generics
from .models import CustomUser, TimeTrial
from .serializers import CustomUserSerializer, TimeTrialSerializer
from django.shortcuts import render

def show_game(req):
    return render(req, "game/game.html")


class CustomUserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class CustomUserDetail(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class TimeTrialList(generics.ListAPIView):
    queryset = TimeTrial.objects.all()
    serializer_class = TimeTrialSerializer


class TimeTrialDetail(generics.RetrieveAPIView):
    queryset = TimeTrial.objects.all()
    serializer_class = TimeTrialSerializer


class UserTimeTrial(generics.ListAPIView):
    queryset = TimeTrial.objects.all()
    serializer_class = TimeTrialSerializer

    def get_queryset(self):
        queryset = TimeTrial.objects.filter(player=self.request.user)
        return queryset