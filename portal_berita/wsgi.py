"""
WSGI config for portal_berita project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from .settings import DEBUG

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portal_berita.settings')

application = get_wsgi_application()

if not DEBUG :
    app = application 

