from django.urls import path
from . import views

urlpatterns = [
    path('', views.show_game, name='BLOCK_IN_TIME'),
    path('users/', views.CustomUserList.as_view(), name='users'),
    path('users/<int:pk>/', views.CustomUserDetail.as_view(), name='user-detail'),
    path('times/', views.TimeTrialList.as_view(), name='time-trial'),
    path('times/<int:pk>/', views.TimeTrialDetail.as_view(), name='time-trial-detail'),
]

