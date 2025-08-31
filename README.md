# GamesBazaar.pk 🎮

**Pakistan's Premier Gaming Marketplace**

A modern web application for buying and selling gaming accounts, items, and services in Pakistan. Built with Django REST Framework and React, focusing on popular games like PUBG Mobile, Free Fire, and more.

## 🚀 Features

### ✅ Completed
- **User Authentication**: Registration, login, logout with JWT tokens
- **Custom User Profiles**: Extended user model with Pakistani market focus
- **Game Management**: Pre-loaded popular games (PUBG Mobile, Free Fire, etc.)
- **Listing System**: Create, read, update, delete game listings
- **Search & Filter**: Search by game name, filter by price range and condition
- **Mobile-First Design**: Responsive design with Tailwind CSS
- **PKR Currency**: Pakistani Rupees pricing
- **PostgreSQL Database**: Production-ready database setup
- **REST API**: Complete API documentation

### 🔄 In Progress
- Marketplace page with listing display
- User profile management
- Basic messaging system

## 🛠️ Tech Stack

**Backend:**
- Django 4.2.7
- Django REST Framework 3.14.0
- PostgreSQL
- Python 3.12

**Frontend:**
- React 18
- Tailwind CSS 3.4
- Axios for API calls
- React Router for navigation

## 📋 Prerequisites

- Python 3.12+
- Node.js 16+
- PostgreSQL 12+
- Git

## ⚡ Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/gamesbazaar-pk.git
cd gamesbazaar-pk
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo "DEBUG=True
SECRET_KEY=your-secret-key-here
DB_NAME=gamesbazaarv3
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432" > .env

# Setup database
python create_db.py
python manage.py migrate
python create_sample_data.py

# Start Django server
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Get user profile

### Games Endpoints
- `GET /api/games/` - List all games
- `GET /api/games/search/?q=query` - Search games

### Listings Endpoints
- `GET /api/listings/` - List all listings
- `POST /api/listings/` - Create listing (auth required)
- `GET /api/listings/{id}/` - Get listing details
- `PUT /api/listings/{id}/` - Update listing (owner only)
- `DELETE /api/listings/{id}/` - Delete listing (owner only)

### Query Parameters
- `search=query` - Search in title/description
- `game=id` - Filter by game
- `condition=new|excellent|good|fair` - Filter by condition
- `min_price=amount` - Minimum price filter
- `max_price=amount` - Maximum price filter
- `ordering=price|-price|created_at|-created_at` - Sort results

## 🎮 Sample Data

The application comes with popular Pakistani gaming titles:
- PUBG Mobile
- Free Fire
- Call of Duty Mobile
- Clash of Clans
- Among Us
- Minecraft

## 🔒 Security Features

- JWT Token Authentication
- Password validation
- CORS protection
- Input sanitization
- User-specific listing management

## 🌍 Pakistani Market Focus

- **Currency**: All prices in Pakistani Rupees (PKR)
- **Popular Games**: Pre-loaded with games popular in Pakistan
- **Mobile-First**: Optimized for mobile devices
- **Local Community**: Designed for Pakistani gaming community

## 🚀 Deployment

### Production Checklist
- [ ] Set DEBUG=False
- [ ] Configure production database
- [ ] Set up static files serving
- [ ] Configure CORS for production domain
- [ ] Set secure SECRET_KEY
- [ ] Enable HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ for the Pakistani gaming community

## 📞 Support

For support, email support@gamesbazaar.pk or create an issue on GitHub.

---

**Made in Pakistan 🇵🇰 for Pakistani Gamers**