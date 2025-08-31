import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'User' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">GamesBazaar</span>
              <span className="text-sm text-gray-500 ml-1">.pk</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/create-listing" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                >
                  Sell
                </Link>
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <Link 
                    to="/create-listing" 
                    className="text-gray-700 hover:text-primary-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sell Item
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-primary-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-primary-600 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-primary-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;