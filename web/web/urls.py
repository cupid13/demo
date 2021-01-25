"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.shortcuts import render,HttpResponse,redirect
from app1 import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'index/', views.index),
    path(r'login/', views.login),
    path(r'publisher_list/',views.publisher_list),
    path(r'publisher_add/',views.publisher_add),
    path(r'publisher_del/',views.publisher_del),
    path(r'publisher_edit/',views.publisher_edit),
    path(r'book_list/',views.book_list),
    path(r'book_add/',views.book_add),
    path(r'book_del/',views.book_del),
    path(r'book_edit/',views.book_edit),
]