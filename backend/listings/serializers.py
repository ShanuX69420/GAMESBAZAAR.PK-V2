from rest_framework import serializers
from .models import Game, Listing, ListingImage

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'name', 'slug', 'description', 'icon', 'is_active')

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ('id', 'image', 'is_primary', 'order')

class ListingSerializer(serializers.ModelSerializer):
    seller_username = serializers.CharField(source='seller.username', read_only=True)
    game_name = serializers.CharField(source='game.name', read_only=True)
    listing_images = ListingImageSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = (
            'id', 'title', 'description', 'price', 'condition', 'status',
            'seller', 'seller_username', 'game', 'game_name', 'images',
            'views', 'is_featured', 'created_at', 'updated_at', 'listing_images'
        )
        read_only_fields = ('seller', 'views', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['seller'] = self.context['request'].user
        return super().create(validated_data)

class ListingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'description', 'price', 'condition', 'game')

    def create(self, validated_data):
        validated_data['seller'] = self.context['request'].user
        return super().create(validated_data)