from django.contrib import admin
from .models import *


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['project_id', 'name', 'client', 'sector', 'year', 'isHome']

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        if 'images_to_delete' in form.cleaned_data:
            selected_images = form.instance.images.filter(
                id__in=form.cleaned_data['images_to_delete']
            )
            form.instance.images.remove(*selected_images)
            selected_images.delete()

    def get_fields(self, request, obj=None):
        fields = super().get_fields(request, obj)
        fields.remove('project_id')
        return fields


class ImageAdmin(admin.ModelAdmin):
    list_display = ('Image_name', 'thumbnail')  # Add any other fields you want to display

    def change_view(self, request, object_id, form_url='', extra_context=None):
        return super().change_view(request, object_id, form_url, extra_context)


class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone')  # Add any other fields you want to display

    def change_view(self, request, object_id, form_url='', extra_context=None):
        return super().change_view(request, object_id, form_url, extra_context)


admin.site.register(Project, ProjectAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Client)
admin.site.register(Customer)
