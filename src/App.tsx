import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Cities from './components/Cities';
import Compare from './components/Compare';
import About from './components/About';
import Footer from './components/Footer';
import { AirQualityData } from './types';
import { airQualityAPI } from './services/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  const [searchResults, setSearchResults] = useState<AirQualityData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'cities' | 'compare' | 'about'>('dashboard');

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = currentData.filter(
      city => 
        city.city.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const renderContent = () => {
    if (isSearching) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map(city => (
                <div key={city.city} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold">{city.city}</h3>
                  <p className="text-gray-600 text-sm">{city.country}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-lg font-bold">AQI: {city.aqi}</span>
                    <button 
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      onClick={() => setIsSearching(false)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-lg text-gray-600">No cities found matching your search.</p>
            </div>
          )}
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'cities':
        return <Cities />;
      case 'compare':
        return <Compare />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header 
            onSearch={handleSearch}
            onNavigate={(page: 'dashboard' | 'cities' | 'compare' | 'about') => {
              setCurrentPage(page);
              setIsSearching(false);
            }}
            currentPage={currentPage}
          />
          
          <main className="flex-grow pt-24">
            <Suspense fallback={<div className="container mx-auto px-4"><Skeleton count={5} height={200} className="mb-4" /></div>}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;