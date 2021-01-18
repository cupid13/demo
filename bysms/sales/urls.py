from django.urls import path

from  sales.views import listorders,listcustomers
# 二级路由
urlpatterns = [
path('orders/', listorders),
    path('customers/', listcustomers),
]
