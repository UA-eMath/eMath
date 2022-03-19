from django.views.generic import TemplateView
from django.shortcuts import render

# Serve Single Page Application
index = TemplateView.as_view(template_name='index.html')


def handler404(request, exception):
    return render(request, "404.html", {})
