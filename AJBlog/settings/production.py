"""
生产环境配置
"""

from .common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['xxx.xxx.xxx.xxx']

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'xxxx',
        'USER': 'xxxx',
        'PASSWORD': 'xxxx',
        'HOST': '127.0.0.1',
        'PORT': '3306'
    }
}
