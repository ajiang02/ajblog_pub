from django.urls import path
from . import views

# 视图函数命名空间，避免视图函数别名 name 与其他发生冲突
# path('路径', '视图函数', name='别名')
app_name = 'blog'

urlpatterns = [
    # 首页
    path('index', views.index, name='index'),
    # 分类下的文章，pk 作为关键字参数传递给 category()
    path('category/<int:pk>/', views.category, name='category'),
    # 文章详情
    path('detail/<int:pk>/', views.detail, name='detail'),
    # 关于
    path('about', views.about, name='about'),
]
