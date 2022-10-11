from django.urls import path
from . import views

urlpatterns = [
    path('game/', views.show_game, name='BLOCK_IN_TIME'),
]
