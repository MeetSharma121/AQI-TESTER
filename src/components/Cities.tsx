import React, { useState } from 'react';
import { cities } from '../data/mockData';
import { City } from '../types';
import { MapPinIcon, GlobeIcon, SearchIcon } from 'lucide-react';

const Cities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];
  
  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = selectedContinent === 'All' ? true : getCityContinent(city) === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  function getCityContinent(city: City): string {
    // This is a simplified mapping - in a real app, you'd have proper continent data
    const continentMap: { [key: string]: string } = {
      'USA': 'North America',
      'UK': 'Europe',
      'France': 'Europe',
      'China': 'Asia',
      'Japan': 'Asia',
      'India': 'Asia',
      'Brazil': 'South America',
      'Mexico': 'North America',
      'Egypt': 'Africa',
      'Australia': 'Oceania'
    };
    return continentMap[city.country] || 'Other';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search cities or countries..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {continents.map(continent => (
              <button
                key={continent}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedContinent === continent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedContinent(continent)}
              >
                {continent}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city) => (
            <div
              key={`${city.name}-${city.country}`}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <MapPinIcon size={18} className="text-blue-500" />
                    {city.name}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <GlobeIcon size={16} className="text-gray-400" />
                    {city.country}
                  </p>
                </div>
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                  View Details
                </button>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  Coordinates: {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;