from django.contrib import admin
from blog.models import Category, Article


class ArticleAdmin(admin.ModelAdmin):
    # “增加文章”页面所展示的字段
    fields = ['title', 'content', 'excerpt', 'category']
    # “文章”页面所展示的字段
    list_display = ['title', 'views', 'category', 'create_time', 'modify_time']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'active', 'sort']


admin.site.register(Article, ArticleAdmin)
admin.site.register(Category, CategoryAdmin)
