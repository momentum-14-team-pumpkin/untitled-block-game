from django.urls import path
from . import views

urlpatterns = [
    # NOTE: temp code for frontend development - Alexis
    path('tilemap-test/', views.tilemap_test, name='TILEMAP_TEST'),
]
