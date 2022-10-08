from django.urls import path
from . import views

urlpatterns = [
    path('tilemap-test/', views.tilemap_test, name='TILEMAP_TEST'),
]
