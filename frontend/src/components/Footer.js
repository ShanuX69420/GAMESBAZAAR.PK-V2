import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">GamesBazaar</span>
              <span className="text-sm text-gray-400 ml-1">.pk</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Pakistan's premier gaming marketplace for buying and selling gaming accounts, 
              items, and services. Safe, secure, and focused on the Pakistani gaming community.
            </p>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">🇵🇰</span>
              <span className="text-sm text-gray-400">Made in Pakistan for Pakistani Gamers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-gray-400 hover:text-white transition-colors">
                  Sell Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Games */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Games</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?search=PUBG" className="text-gray-400 hover:text-white transition-colors">
                  PUBG Mobile
                </Link>
              </li>
              <li>
                <Link to="/?search=Free Fire" className="text-gray-400 hover:text-white transition-colors">
                  Free Fire
                </Link>
              </li>
              <li>
                <Link to="/?search=Call of Duty" className="text-gray-400 hover:text-white transition-colors">
                  Call of Duty Mobile
                </Link>
              </li>
              <li>
                <Link to="/?search=Clash" className="text-gray-400 hover:text-white transition-colors">
                  Clash of Clans
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {currentYear} GamesBazaar.pk. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;