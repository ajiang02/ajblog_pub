from django.db import models
from django.utils import timezone
from mdeditor.fields import MDTextField


class Category(models.Model):
    """
    文章分类
    """
    name = models.CharField(verbose_name='名称', max_length=20)
    active = models.BooleanField(verbose_name='是否激活', default=True)
    sort = models.PositiveSmallIntegerField(verbose_name='排序', default=99)

    class Meta:
        verbose_name = '分类'
        verbose_name_plural = verbose_name  # 覆盖默认的复数名称

    def __str__(self):
        return self.name


class Article(models.Model):
    """
    文章
    """
    title = models.CharField(verbose_name='标题', max_length=30, unique=True)
    content = MDTextField(verbose_name='正文')
    excerpt = models.CharField(verbose_name='摘要', max_length=150, blank=True)
    views = models.PositiveIntegerField(verbose_name='浏览量', default=0)
    create_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)
    modify_time = models.DateTimeField(verbose_name='修改时间', auto_now=True)
    # 级联删除：假定 Category 被删除，则该分类下全部文章同样被删除。
    category = models.ForeignKey(Category, verbose_name='文章分类', on_delete=models.CASCADE)

    class Meta:
        verbose_name = '文章'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

    def increase_views(self):
        """
        更新浏览量
        """
        self.views += 1
        # update_fields 指定更新字段值，以提高效率。
        self.save(update_fields=['views'])
