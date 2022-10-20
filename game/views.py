from rest_framework import generics, permissions
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
    permission_classes = [permissions.IsAdminUser, ]


class TimeTrialList(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def perform_create(self, serializer):
        serializer.save(player=self.request.user)


class TimeTrialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TimeTrial.objects.all()
    serializer_class = TimeTrialSerializer
    permission_classes = [permissions.IsAdminUser, ]


class LevelList(generics.ListCreateAPIView):
    queryset = Level.objects.all().order_by('number')
    serializer_class = LevelSerializer


class LevelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    permission_classes = [permissions.IsAdminUser, ]


class UserTimeTrialList(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def get_queryset(self):
        queryset = TimeTrial.objects.filter(player=self.request.user)
        return queryset.order_by('time')


class UserLevelTimeTrialList(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def get_queryset(self):
        level = get_object_or_404(Level, pk=self.kwargs['pk'])
        queryset = level.times.filter(player=self.request.user)
        return queryset.order_by('time')


class LevelTimeTrialList(generics.ListCreateAPIView):
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


class FullRunTimeTrialList(generics.ListCreateAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer

    def get_queryset(self):
        queryset = TimeTrial.objects.filter(full_run=True)
        return queryset.order_by('time')

    def perform_create(self, serializer):
        player = self.request.user
        serializer.save(full_run=True, player=player)


class FullRunTimeTrialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TimeTrial.objects.all().order_by('time')
    serializer_class = TimeTrialSerializer
    permission_classes = [permissions.IsAdminUser, ]

    def get_queryset(self):
        queryset = TimeTrial.objects.filter(full_run=True)
        return queryset.order_by('time')


def homepage(req, **kwargs):
    return render(req, "game/homepage.html")
