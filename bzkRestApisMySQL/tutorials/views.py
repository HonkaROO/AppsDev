from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from tutorials.models import Tutorial
from tutorials.serializers import TutorialSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .models import User
import face_recognition
import numpy as np

@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
    if request.method == 'GET':
        tutorials = Tutorial.objects.all()
        serializer = TutorialSerializer(tutorials, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TutorialSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        Tutorial.objects.all().delete()
        return JsonResponse({'message': 'All tutorials have been deleted.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
    try: 
        tutorial = Tutorial.objects.get(pk=pk) 
    except Tutorial.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':
        serializer = TutorialSerializer(tutorial)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TutorialSerializer(tutorial, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tutorial.delete()
        return JsonResponse({'message': 'Tutorial has been deleted.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def tutorial_list_published(request):
    tutorials = Tutorial.objects.filter(published=True) # Assuming 'published' is a field in your Tutorial model
    serializer = TutorialSerializer(tutorials, many=True)
    return JsonResponse(serializer.data, safe=False)

class RegisterView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        image = request.FILES['image']
        
        user = User(username=username, password=make_password(password))
        user.save_face_encoding(image)
        user.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

class FaceLoginView(APIView):
    def post(self, request):
        image = request.FILES['image']
        image = face_recognition.load_image_file(image)
        encoding = face_recognition.face_encodings(image)[0]

        users = User.objects.all()
        for user in users:
            if user.face_encoding:
                stored_encoding = np.frombuffer(user.face_encoding, dtype=np.float64)
                matches = face_recognition.compare_faces([stored_encoding], encoding)
                if matches[0]:
                    return Response({'message': 'Login successful', 'username': user.username})

        return Response({'message': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)

class PasswordLoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        try:
            user = User.objects.get(username=username)
            if check_password(password, user.password):
                return Response({'message': 'Login successful', 'username': user.username})
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
