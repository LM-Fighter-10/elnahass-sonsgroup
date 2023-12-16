from django.db import models


def correctImagePath(obj):
    obj.url = str(obj.url).replace('elnahass-sonsgroup', '').replace('staticfiles', 'static')
    obj.save()

class Client(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Project(models.Model):
    project_id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=100)
    images = models.ManyToManyField('Image', related_name='projects', blank=True)
    year = models.IntegerField()
    sector = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=50, blank=True)
    shortDesc = models.TextField(max_length=500, blank=True)
    description = models.TextField(default="", blank=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
    isHome = models.BooleanField(default=False)

    def get_img_index(self, img):
        counter = 0
        for i in self.images.all():
            if i == img:
                return counter + 1
            counter += 1
        return "No Image Found"

    def save(self, *args, **kwargs):
        if not self.pk:
            # If the project is being created, set the custom_id to the next available value
            last_project = Project.objects.order_by('-project_id').first()
            if last_project:
                self.project_id = last_project.project_id + 1
            else:
                self.project_id = 1
        super().save(*args, **kwargs)  # Save the project first

    def hasThumbnail(self):
        for i in self.images.all():
            if i.thumbnail:
                return True

        return False

    class Meta:
        ordering = ['project_id']

    def __str__(self):
        return f"{self.project_id}. {self.name}"


class Image(models.Model):
    url = models.ImageField(upload_to='elnahass-sonsgroup/staticfiles/database/')
    thumbnail = models.BooleanField(default=False)

    @property
    def Image_name(self):
        project_name = self.projects.first().name if self.projects.exists() else 'No Project'
        if not self.projects.first() is None:
            if self.projects.first().get_img_index(self) == 1:
                if not self.projects.first().hasThumbnail():
                    self.thumbnail = True
                    self.save()
            image_number = self.projects.first().get_img_index(self)
            return f"{project_name} ({image_number})"
        else:
            return "New Image"

    def __str__(self):
        correctImagePath(self)
        return self.Image_name


class Customer(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=40)
    phone = models.CharField(max_length=20)
    outline_Desc = models.TextField(max_length=200)

    def __str__(self):
        return self.name
