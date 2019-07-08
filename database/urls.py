from rest_framework import routers
from .Api import index_view,table_of_content

router = routers.DefaultRouter()

#router.register('',index_view.RootViewSet,'Roots')
router.register('',table_of_content.TOCViewSet,'TOC')

urlpatterns = router.urls

