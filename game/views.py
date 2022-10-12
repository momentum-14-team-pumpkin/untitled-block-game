from .models import CustomUser, TimeTrial
from django.shortcuts import render


def show_game(req):
    return render(req, "game/game.html")


def homepage(req):
    context = {"data_from_django": "hello react in django"}
    return render(req, "game/homepage.html", context)
