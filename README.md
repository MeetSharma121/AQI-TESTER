# 🌍 AQI Tester

## 🌐 Air Quality Index Monitoring Platform

<p align="center">
  <img alt="AQI Tester Logo" src="https://img.shields.io/badge/AQI-Tester-brightgreen" />
</p>

<p align="center">
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0.0-blue.svg" alt="TypeScript Version"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.0.0-blue.svg" alt="React Version"></a>
  <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-3.0.0-blue.svg" alt="Flask Version"></a>
  <a href="https://www.python.org"><img src="https://img.shields.io/badge/Python-3.13-blue.svg" alt="Python Version"></a>
</p>

## 📱 About

**AQI Tester** is a comprehensive air quality monitoring platform 🌬️ designed to provide real-time air quality data and analytics. With an intuitive interface, detailed pollutant tracking, and city-wise comparisons, AQI Tester helps users stay informed about the air they breathe 🏭.

## ✨ Features

- 📊 **Real-time AQI Monitoring**: Track air quality indices across multiple cities
- 🗺️ **City-wise Analysis**: Compare air quality data between different locations
- 📈 **Detailed Analytics**: In-depth analysis of various pollutants (PM2.5, PM10, NO2, etc.)
- 📱 **Responsive Design**: Access data seamlessly across all devices
- 📋 **Historical Data**: View and analyze historical air quality trends
- 🔔 **Alert System**: Get notifications for poor air quality conditions
- 📊 **Visual Reports**: Interactive charts and graphs for better understanding
- 🔄 **Regular Updates**: Continuous data updates for accurate monitoring

## 🛠️ Technologies Used

### Frontend
- ⚛️ **React**: UI framework with TypeScript
- 🎨 **Tailwind CSS**: Utility-first CSS framework
- 📊 **Chart.js**: Data visualization
- 🔄 **React Query**: State management and API calls

### Backend
- 🐍 **Flask**: Python web framework
- 🗃️ **SQLAlchemy**: Database ORM
- 📊 **Pandas**: Data analysis and manipulation
- 🔢 **NumPy**: Numerical computations

## 🚀 Getting Started

### 📋 Prerequisites

- ✅ Node.js (v18+)
- ✅ Python (v3.13+)
- ✅ npm or yarn
- ✅ pip

### 🧩 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/aqi-tester.git
cd aqi-tester
```

2. **Frontend Setup**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Backend Setup**
```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start Flask server
python src/app.py
```

## 📱 Usage

- **Dashboard** 📊  
  View current AQI levels and key pollutants.

- **City Comparison** 🏙️  
  Compare air quality between different cities.

- **Historical Analysis** 📈  
  Track air quality trends over time.

- **Pollutant Details** 🔍  
  Get detailed information about specific pollutants.

## 📂 Project Structure

```
├── src/                 # Frontend source files
│   ├── components/      # React components
│   ├── context/         # React context
│   ├── services/        # API services
│   └── utils/           # Utility functions
├── server/              # Backend source files
│   ├── src/             # Flask application
│   ├── models/          # Database models
│   └── routes/          # API routes
└── supabase/            # Database migrations
```

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repository 🍴
2. Create your feature branch (`git checkout -b feature/amazing-feature`) 🌟
3. Commit your changes (`git commit -m 'Add some amazing feature'`) 📝
4. Push to GitHub (`git push origin feature/amazing-feature`) 🚀
5. Open a Pull Request 📬

## 📄 License

This project is licensed under the **MIT License** 📜.

## 🙏 Acknowledgements

- [React](https://react.dev) ⚛️
- [Flask](https://flask.palletsprojects.com) 🐍
- [Tailwind CSS](https://tailwindcss.com) 🎨

# Happy Monitoring! 😊