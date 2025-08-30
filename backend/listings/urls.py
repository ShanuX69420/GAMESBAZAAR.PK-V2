from django.urls import path
from . import views

urlpatterns = [
    path('games/', views.GameListView.as_view(), name='games-list'),
    path('games/search/', views.search_games, name='games-search'),
    path('listings/', views.ListingListCreateView.as_view(), name='listings-list-create'),
    path('listings/<int:pk>/', views.ListingDetailView.as_view(), name='listing-detail'),
]