from django.db import models

# Create your models here.


def upload_path(instance, filename):
    return '/'.join(['catdogimage',str(instance.title),filename])

class imageData(models.Model):
    title = models.CharField(max_length=32, blank=False)
    image = models.FileField(blank=True, null=True, upload_to=upload_path)
