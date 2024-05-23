from django.http import JsonResponse, HttpResponseBadRequest
from .models import User
import json

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'})
        elif User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'})
        else:
            User.objects.create(username=username, email=email, password=password)
            return JsonResponse({'success': 'User registered successfully'})
    else:
        return HttpResponseBadRequest('Invalid request method')

from django.http import JsonResponse, HttpResponseBadRequest
from .models import User
import json

def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username_or_email = data.get('username_or_email', '')
        password = data.get('password', '')

        if not username_or_email or not password:
            return JsonResponse({'error': 'Username/email and password are required'})

        try:
            user = User.objects.get(username=username_or_email)
        except User.DoesNotExist:
            pass
        else:
            if user.password == password:
                return JsonResponse({'success': 'Login successful'})
            else:
                return JsonResponse({'error': 'Invalid password'})

        try:
            user = User.objects.get(email=username_or_email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid username or email'})
        else:
            if user.password == password:
                return JsonResponse({'success': 'Login successful'})
            else:
                return JsonResponse({'error': 'Invalid password'})

    else:
        return HttpResponseBadRequest('Invalid request method')