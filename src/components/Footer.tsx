import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AQITESTER</h3>
            <p className="text-gray-400">
              Monitoring global air quality metrics to promote environmental awareness and public health.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Air Quality Index</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pollutant Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Health Effects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Environmental Impact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Sources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AQITESTER. All rights reserved.</p>
          <p className="mt-2">
            Data sourced from open environmental agencies worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;