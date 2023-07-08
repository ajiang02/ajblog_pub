import jieba
from django import template

register = template.Library()


@register.filter
def count_words(text):
    """
    统计文章字数
    """
    words = jieba.lcut(text)
    return len(words)


@register.filter
def estimate_reading_time(text, words_per_minute=600):
    """
    预计文章阅读时长
    """
    words = jieba.lcut(text)
    word_count = len(words)
    minutes = word_count / words_per_minute
    return round(minutes)
