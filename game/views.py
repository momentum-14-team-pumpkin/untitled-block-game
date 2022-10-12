from rest_framework import generics
from .models import CustomUser, TimeTrial
from .serializers import CustomUserSerializer, TimeTrialSerializer
from django.shortcuts import render


def show_game(req):
    return render(req, "game/game.html")


class CustomUserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all().order_by('username')
    serializer_class = CustomUserSerializer


class CustomUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class TimeTrialList(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def perform_create(self, serializer):
        serializer.save(player=self.request.user)


class TimeTrialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TimeTrial.objects.all()
    serializer_class = TimeTrialSerializer


class UserTimeTrial(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def get_queryset(self):
        queryset = TimeTrial.objects.filter(player=self.request.user)
        return queryset.order_by('time')
