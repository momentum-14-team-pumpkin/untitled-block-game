from django.urls import path
from . import views

urlpatterns = [
    path('game/', views.show_game, name='BLOCK_IN_TIME'),
    path('users/', views.user_list, name='Users'),
    path('times/', views.time_trial_list, name='Times')
]
