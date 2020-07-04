from rest_framework import routers
from django.urls import path, include
from .api import QuestionViewSet, AnswerViewSet, CommentViewSet, LikeViewSet , UpvoteViewSet, QuestList, CategoryViewSet

router = routers.DefaultRouter()
router.register('api/questions', QuestionViewSet, 'questions')
router.register('api/answers', AnswerViewSet, 'answers')
router.register('api/comments', CommentViewSet, 'comments')
router.register('api/all/questions', QuestList, 'questlist')
router.register('api/likes', LikeViewSet, 'likes')
router.register('api/upvotes', UpvoteViewSet, 'upvotes')
router.register('api/categories', CategoryViewSet, 'categories')


urlpatterns = [
    path(r'', include(router.urls)),
]