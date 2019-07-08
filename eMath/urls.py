"""eMath URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path, include
from django.conf.urls import include, url
from rest_framework import routers
from database.Api import index_view,table_of_content


router = routers.DefaultRouter()


router.register(r'getToc',table_of_content.TOCViewSet,'TOC')
router.register(r'root',index_view.RootViewSet,'Roots')


urlpatterns = [
	url('', include(router.urls)),
	path('admin/', admin.site.urls),
]

