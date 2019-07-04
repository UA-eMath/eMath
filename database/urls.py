from rest_framework import routers
from .Api import index_view

router = routers.DefaultRouter()

router.register('',index_view.RootViewSet,'Roots')

urlpatterns = router.urls

