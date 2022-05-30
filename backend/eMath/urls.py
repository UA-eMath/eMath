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
from presentation.Api import *
from rest_framework_jwt.views import obtain_jwt_token as obtainJwtToken

router = routers.DefaultRouter()

router.register(r'getToc', TOCViewSet, 'TOC')
router.register(r'root', RootViewSet, 'Roots')
router.register(r'content', getPageViewSet, 'Content')
router.register(r'para', ParaViewSet, 'Para')
router.register(r'Level', LevelViewset, 'Level')
router.register(r'book', RootLevelViewSets, 'RootLevels')
router.register(r'nextLevel', getNextLevelViewSet, 'NextLevel')
router.register(r'indexItem', IndexItemViewSets, "IndexItem")
router.register(r'newCommand', newCommandViewSets, "newCommand")
router.register(r'newCommandUpdate', NewCommandUpdateViewSets,
                "newCommandUpdate")
router.register(r'texShortcut', texShorcutViewSets, "texShortcut")
router.register(r'texShortcutUpdate', TexShortcutUpdateViewSets,
                "texShortcutUpdate")
router.register(r'label', LabelViewSet, "Label")
router.register(r'getLabel', GetLabelViewSets, "getLabel")
router.register(r'person', PersonViewSet, "Person")
router.register(r'usermod', UsermodViewSet, "Usermod")
router.register(r'user', UserViewSets, "User")
router.register(r'bibliography', BibliographyViewSet, "Bibliography")

urlpatterns = [
    url(r'^uploadNewCommand/(?P<pk>.+)/$', UploadNewCommand.as_view()),
    url(r'^uploadTex/(?P<pk>.+)/$', UploadTexShortcut.as_view()),
    url(r'^newCommandUpdate/(?P<pk>.+)/$', NewCommandUpdate.as_view()),
    url(r'^texShortcutUpdate/(?P<pk>.+)/$', TexShortcutUpdate.as_view()),
    url(r'^api-token-auth/', obtainJwtToken),
    url(r'^current-user/', GetCurrentUser.as_view()),
    url(r'^user-person/', UserToPerson.as_view()),
    url(r'^user-auth/', GoogleAuth.as_view()),
    url('', include(router.urls)),
    path('admin/', admin.site.urls),
]
