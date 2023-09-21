from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    # Main Pages
    path('', views.home, name='homePage'),
    path('fetchCustomer', views.fetchCustomer, name='customersFetch'),
    path('about/', views.about, name='aboutPage'),
    path('contact/', views.contact, name='contactPage'),
    path('projects/', views.projects, name='projectsPage'),
    path('project_view/<int:id>', views.project_view, name='projectViewPage'),
    path('send/', views.sendEmail, name='sendPage'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)