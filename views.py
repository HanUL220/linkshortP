from django.shortcuts import render
from django.http import HttpResponseNotFound

import random
import string
from .models import ShortLink  # 모델 임포트


def shorten_link(request):
    if request.method == 'POST':
        original_link = request.POST.get('original_link')
        if original_link:
            short_link = generate_short_link()

            # 데이터베이스에 링크 저장
            short_link_obj = ShortLink.objects.create(original_link=original_link, short_link=short_link)

            return render(request, 'result.html', {
                'short_link': short_link_obj.short_link, 'original_link': short_link_obj.original_link
            })
    else:
        return render(request, 'index.html')

    return HttpResponseNotFound()


def generate_short_link():
    characters = string.ascii_letters + string.digits
    short_code = ''.join(random.choice(characters) for _ in range(6))
    return f'dok.do/{short_code}'
