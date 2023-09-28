from django import forms
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib import admin
from django.contrib.admin.models import *
from django.db.models import *
from .models import *
from webApp import views


@receiver(post_save, sender=Project)
def delete_log_entries(sender, instance, **kwargs):
    LogEntry.objects.all().delete()


class ImageInline(admin.TabularInline):
    model = Project.images.through


class ProjectAdminForm(forms.ModelForm):
    images_to_delete = forms.ModelMultipleChoiceField(
        queryset=None,
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    class Meta:
        model = Project
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['images_to_delete'].queryset = self.instance.images.all()


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['project_id', 'name', 'client', 'sector', 'year', 'isHome']
    inlines = [ImageInline]

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

    def save_model(self, request, obj, form, change):
        obj.save()
        if obj.client:
            obj.client.my_projects.add(obj)
            obj.client.save()

    def delete_model(self, request, obj):
        # Remove the project from the client's my_projects list before deletion
        if obj.client:
            obj.client.my_projects.remove(obj)
            obj.client.save()

        super().delete_model(request, obj)


class ImageAdmin(admin.ModelAdmin):
    list_display = ('Image_name', 'thumbnail')  # Add any other fields you want to display

    def change_view(self, request, object_id, form_url='', extra_context=None):
        LogEntry.objects.all().delete()
        return super().change_view(request, object_id, form_url, extra_context)


class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone')  # Add any other fields you want to display

    def change_view(self, request, object_id, form_url='', extra_context=None):
        LogEntry.objects.all().delete()
        return super().change_view(request, object_id, form_url, extra_context)


admin.site.register(Project, ProjectAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Client)
admin.site.register(Customer)
