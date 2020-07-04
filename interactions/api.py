from rest_framework import viewsets, permissions, generics
from .models import Question, Answer, Comment, Like, Upvote, Category
from .serializers import AnswerSerializer, QuestionSerializer, CommentSerializer, LikeSerializer, UpvoteSerializer, CategorySerializer

class QuestList(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]

class QuestionViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = QuestionSerializer

    def get_queryset(self):
        return self.request.user.questions.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permissions_classes = [permissions.AllowAny]

class AnswerViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = AnswerSerializer

    def get_queryset(self):
        return self.request.user.answers.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class LikeViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LikeSerializer

    def get_queryset(self):
        return self.request.user.likes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.request.user.comments.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UpvoteViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UpvoteSerializer

    def get_queryset(self):
        return self.request.user.upvotes.all()
        
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)