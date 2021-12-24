from django import template

register = template.Library()


@register.filter(is_safe=True)
def times(number):
    return range(number)


@register.filter(is_safe=True)
def timesMinusFive(number):
    return range(5-number)
