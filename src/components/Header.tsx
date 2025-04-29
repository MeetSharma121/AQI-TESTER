import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (page: 'dashboard' | 'cities' | 'compare' | 'about') => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <span className="text-blue-800">AQI</span>TESTER
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'cities', label: 'Cities' },
                { id: 'compare', label: 'Compare' },
                { id: 'about', label: 'About' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id as 'dashboard' | 'cities' | 'compare' | 'about')}
                    className={`text-gray-700 hover:text-blue-600 transition-colors ${
                      currentPage === item.id ? 'text-blue-600 font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </form>
      </div>
    </header>
  );
};

export default Header;