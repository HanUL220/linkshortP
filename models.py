from django.db import models

class ShortLink(models.Model):
    original_link = models.URLField()
    short_link = models.CharField(max_length=100)
