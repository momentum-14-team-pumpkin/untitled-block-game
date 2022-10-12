from .models import CustomUser, TimeTrial
from django.shortcuts import render


def show_game(req):
    return render(req, "game/game.html")


def homepage(req):
    return render(req, "game/homepage.html")
