from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='Homepage'),
    path('game/', views.show_game, name='BLOCK_IN_TIME'),
    path('users/', views.CustomUserList.as_view(), name='users'),
    path('users/<int:pk>/', views.CustomUserDetail.as_view(), name='user-detail'),
    path('times/', views.TimeTrialList.as_view(), name='time-trial'),
    path('times/<int:pk>/', views.TimeTrialDetail.as_view(), name='time-trial-detail'),
    path('levels/', views.LevelList.as_view(), name='levels'),
    path('levels/<int:pk>/', views.LevelDetail.as_view(), name='level-detail'),
    path('users/<int:pk>/times/', views.UserTimeTrialList.as_view(), name='user-times'),
    path('user/level/<int:pk>/times/', views.UserLevelTimeTrialList.as_view(), name='user-level-times'),
    path('levels/<int:pk>/times/', views.LevelTimeTrialList.as_view(), name='level-times'),
    path('full-run-times/', views.FullRunTimeTrialList.as_view(), name='full-run-times'),
    path('full-run-times/<int:pk>/', views.FullRunTimeTrialDetail.as_view(), name='full-run-times-detail'),
    path('homepage/', views.homepage, name='Homepage-alt'),
    path('leaderboard<int:pk>/', views.homepage),
    path('user/best-times<int:pk>/', views.homepage),
    path('playgame/', views.homepage),
    path('login/', views.homepage),
    path('register/', views.homepage),
    path('userfullgametimes/', views.homepage),
    path('fullgameleaderboard/', views.homepage),
]
