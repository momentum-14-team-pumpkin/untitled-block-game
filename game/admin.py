from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, TimeTrial

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username',]

admin.site.register(CustomUser, CustomAdminUs)
admin.site.register(TimeTrial)