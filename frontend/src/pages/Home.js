import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { gamesAPI } from '../services/api';
import Footer from '../components/Footer';

const Home = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    fetchGames();
    // Set initial search term from URL
    const urlSearch = searchParams.get('search') || '';
    setSearchTerm(urlSearch);
  }, [searchParams]);

  const fetchGames = async () => {
    try {
      const response = await gamesAPI.getGames();
      setGames(response.data.results);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const groupGamesByLetter = (games) => {
    const grouped = {};
    games.forEach(game => {
      const firstLetter = game.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(game);
    });
    return grouped;
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedGames = groupGamesByLetter(filteredGames);
  const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by games..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  // Update URL with search parameter
                  if (value) {
                    setSearchParams({ search: value });
                  } else {
                    setSearchParams({});
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex">
        {/* Alphabet Sidebar */}
        <div className="w-12 mr-8 hidden md:block">
          <div className="sticky top-4">
            {alphabetLetters.map(letter => (
              <div
                key={letter}
                className={`alphabet-letter ${
                  groupedGames[letter] ? 'active' : 'inactive'
                }`}
              >
                <a href={`#section-${letter}`}>{letter}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="flex-1">
          {alphabetLetters.map(letter => {
            const letterGames = groupedGames[letter];
            if (!letterGames || letterGames.length === 0) return null;

            return (
              <div key={letter} id={`section-${letter}`} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                  {letter}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {letterGames.map(game => (
                    <Link
                      key={game.id}
                      to={`/marketplace?game=${game.id}`}
                      className="game-card"
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {game.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {game.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                              Accounts
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                              Items
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                              Services
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-sm font-medium">
                              {game.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No games found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;