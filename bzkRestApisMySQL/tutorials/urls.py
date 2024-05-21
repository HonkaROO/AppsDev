from django.urls import path
from tutorials import views
from .views import RegisterView, FaceLoginView, PasswordLoginView

urlpatterns = [
    path('api/tutorials', views.tutorial_list),
    path('api/tutorials/<int:pk>', views.tutorial_detail),
    path('api/tutorials/published', views.tutorial_list_published),
    path('register/', RegisterView.as_view(), name='register'),
    path('face-login/', FaceLoginView.as_view(), name='face-login'),
    path('password-login/', PasswordLoginView.as_view(), name='password-login'),
]
