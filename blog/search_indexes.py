from haystack import indexes
from .models import Article


class ArticleIndex(indexes.SearchIndex, indexes.Indexable):
    # 创建一个 text 字段，
    #  - document = True：使用此字段的内容作为索引进行检索
    #  - use_template = True：使用数据模板建立索引文件（文件存放需要被检索的字段）
    text = indexes.CharField(document=True, use_template=True)

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        return self.get_model().objects.all()
