# from django.urls import path
# from tutorials import views
# from .views import RegisterView, PasswordLoginView

# urlpatterns = [
#     path('api/tutorials', views.tutorial_list),
#     path('api/tutorials/<int:pk>', views.tutorial_detail),
#     path('api/tutorials/published', views.tutorial_list_published),
#     path('register/', RegisterView.as_view(), name='register'),
#     # path('face-login/', FaceLoginView.as_view(), name='face-login'), 
#     path('password-login/', PasswordLoginView.as_view(), name='password-login'),
#     path('analyze-sentiment/', views.analyze_sentiment, name='analyze-sentiment'),
# ]

from django.urls import path
from .views import tutorial_list, tutorial_detail, tutorial_list_published, analyze_sentiment, RegisterView, PasswordLoginView

urlpatterns = [
    path('tutorials/', tutorial_list, name='tutorial_list'),
    path('tutorials/<int:pk>/', tutorial_detail, name='tutorial_detail'),
    path('tutorials/published/', tutorial_list_published, name='tutorial_list_published'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', PasswordLoginView.as_view(), name='login'),
    path('analyze-sentiment/', analyze_sentiment, name='analyze_sentiment'),
]

