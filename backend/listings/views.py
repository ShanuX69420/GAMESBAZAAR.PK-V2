from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Game, Listing
from .serializers import GameSerializer, ListingSerializer, ListingCreateSerializer

class GameListView(generics.ListAPIView):
    queryset = Game.objects.filter(is_active=True)
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.filter(status='active')
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['game', 'condition', 'price']
    search_fields = ['title', 'description', 'game__name']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ListingCreateSerializer
        return ListingSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Price range filtering
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset

class ListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_object(self):
        obj = super().get_object()
        # Increment views
        obj.views += 1
        obj.save(update_fields=['views'])
        return obj
    
    def update(self, request, *args, **kwargs):
        listing = self.get_object()
        if listing.seller != request.user:
            return Response({'error': 'You can only edit your own listings'}, 
                          status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        listing = self.get_object()
        if listing.seller != request.user:
            return Response({'error': 'You can only delete your own listings'}, 
                          status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

@api_view(['GET'])
def search_games(request):
    query = request.GET.get('q', '')
    if query:
        games = Game.objects.filter(
            Q(name__icontains=query) & Q(is_active=True)
        )[:10]
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)
    return Response([])
