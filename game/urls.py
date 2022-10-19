from django.urls import path
from . import views

urlpatterns = [
    path('', views.show_game, name='BLOCK_IN_TIME'),
    path('users/', views.CustomUserList.as_view(), name='users'),
    path('users/<int:pk>/', views.CustomUserDetail.as_view(), name='user-detail'),
    path('times/', views.TimeTrialList.as_view(), name='time-trial'),
    path('times/<int:pk>/', views.TimeTrialDetail.as_view(), name='time-trial-detail'),
    path('levels/', views.LevelList.as_view(), name='levels'),
    path('levels/<int:pk>/', views.LevelDetail.as_view(), name='level-detail'),
    path('users/<int:pk>/times/', views.UserTimeTrial.as_view(), name='user-times'),
    path('levels/<int:pk>/times/', views.LevelTimeTrial.as_view(), name='level-times'),
    path('full-run-times/', views.FullRunTimeTrial.as_view(), name='full-run-times'),
    path('homepage/', views.homepage, name='Homepage'),
    path('leaderboard<int:pk>/', views.homepage),
]
