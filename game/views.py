from rest_framework import generics
from .models import CustomUser, TimeTrial, Level
from .serializers import CustomUserSerializer, TimeTrialSerializer, LevelSerializer
from django.shortcuts import get_object_or_404, render


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


class LevelList(generics.ListCreateAPIView):
    queryset = Level.objects.all().order_by('number')
    serializer_class = LevelSerializer


class LevelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer


class UserTimeTrial(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def get_queryset(self):
        queryset = TimeTrial.objects.filter(player=self.request.user)
        return queryset.order_by('time')


class LevelTimeTrial(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def get_queryset(self):
        level = get_object_or_404(Level, pk=self.kwargs['pk'])
        queryset = level.times.all()
        return queryset.order_by('time')

    def perform_create(self, serializer):
        level = get_object_or_404(Level, pk=self.kwargs['pk'])
        player = self.request.user
        serializer.save(level=level, player=player)


def homepage(req):
    return render(req, "game/homepage.html")
