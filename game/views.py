from .models import CustomUser, TimeTrial
from django.shortcuts import render

def show_game(req):
    return render(req, "game/game.html")


def user_list(request, pk):
    user = get_object_or_404(user, pk=pk)
    return render(request, 'game/user_list.html', {'user': user})

def time_trial_list(request, pk):
    timetrial = get_object_or_404(time, pk=pk)
    return rednder(request, 'game/time_trial.html', {'TimeTrial': TimeTrial})