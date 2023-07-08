from django.shortcuts import render, get_object_or_404
from markdown import markdown
from pure_pagination import PageNotAnInteger, Paginator
from .models import Article, Category

# 分页条数
PER_PAGE = 10


def global_templates_setting(request):
    """
    添加全局模板变量
    :return:
    """
    # 文章分类
    active_categories = Category.objects.all().filter(active=True).order_by('sort')

    return {'active_categories': active_categories}


def index(request):
    """
    首页
    :param request:
    :return:
    """
    articles = Article.objects.all().order_by('-create_time')

    # 获取页码
    try:
        page = request.GET.get('page', 1)
    except PageNotAnInteger:
        page = 1

    # 分页
    p = Paginator(articles, PER_PAGE, request=request)
    articles = p.page(page)

    return render(request, 'blog/index.html', context={'articles': articles})


def category(request, pk):
    """
    获取分类下的文章
    :param request:
    :param pk:
    :return:
    """
    # 当 pk 对应的 Category 存在时，则返回分类数据，否则返回 404 错误，表示请求的分类不存在。
    cate = get_object_or_404(Category, pk=pk)
    articles = Article.objects.filter(category=cate).order_by("-create_time")
    articles_len = len(articles)

    try:
        page = request.GET.get('page', 1)
    except PageNotAnInteger:
        page = 1

    p = Paginator(articles, PER_PAGE, request=request)
    articles = p.page(page)

    return render(request, 'blog/category.html',
                  context={'articles': articles, 'articles_len': articles_len, 'cate_name': cate.name}
                  )


def detail(request, pk):
    """
    获取文章详情
    :param request:
    :param pk:
    :return:
    """
    article = get_object_or_404(Article, pk=pk)

    # 浏览量递增
    article.increase_views()

    article.content = markdown(article.content, extensions=[
        'markdown.extensions.extra',  # 提供额外的扩展语法，如表格、脚注、自动链接等
        'markdown.extensions.codehilite',  # 提供代码块语法高亮显示的功能，配合Pygments库为代码块添加语法高亮样式
        'markdown.extensions.toc',  # 生成目录（Table of Contents）
    ])

    # 查找上下篇
    prev_article = Article.objects.filter(create_time__lt=article.create_time).order_by('-create_time').first()
    next_article = Article.objects.filter(create_time__gt=article.create_time).order_by('create_time').first()

    return render(request, 'blog/detail.html', context={
        'article': article,
        'prev_article': prev_article,
        'next_article': next_article
    })


def about(request):
    """
    关于
    """
    return render(request, 'blog/about.html')
