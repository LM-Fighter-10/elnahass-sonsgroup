from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from webApp import views

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("", include('webApp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
handler404 = views.handle404
