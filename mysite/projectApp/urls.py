from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('addimage',views.PostView.as_view(), name="image"),
]