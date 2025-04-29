import React from 'react';
import { BookOpen, Shield, Database, Globe, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Global Coverage",
      description: "Monitor air quality data from cities worldwide with real-time updates and historical trends."
    },
    {
      icon: <Database className="w-8 h-8 text-green-500" />,
      title: "Comprehensive Data",
      description: "Track multiple pollutants including PM2.5, PM10, NO2, O3, and CO with detailed analytics."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Health Insights",
      description: "Get health recommendations based on current air quality levels and pollutant concentrations."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Community Driven",
      description: "Join a global community of environmental advocates and researchers sharing insights."
    },
    {
      icon: <Award className="w-8 h-8 text-red-500" />,
      title: "Certified Data",
      description: "All data is sourced from certified monitoring stations and validated for accuracy."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      title: "Educational Resources",
      description: "Access comprehensive guides about air quality and its impact on health and environment."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About AQITESTER</h1>
          <p className="text-xl text-gray-600">
            Empowering communities with accurate air quality data for better health decisions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            AQITESTER is dedicated to providing accurate, real-time air quality data to communities worldwide. 
            Our platform helps individuals, researchers, and policymakers make informed decisions about 
            environmental health and safety.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By combining advanced monitoring technology with user-friendly interfaces, we make air quality 
            data accessible and actionable for everyone, promoting better health outcomes and environmental awareness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Get Involved</h2>
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Join our mission to promote clean air and environmental awareness. Whether you're a researcher, 
              environmental advocate, or concerned citizen, there are many ways to contribute to our cause.
            </p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;