
import React, { useState } from 'react';
import WeatherBackground from './components/WeatherBackground';
import { convertTemperature } from './components/Helper';
import { HumidityIcon, WindIcon, SunriseIcon, SunsetIcon } from './components/Icons';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('C');
  const [loading, setLoading] = useState(false);
  const API_KEY = '704acf8c8957a8a6f434d29bb705e332'; 

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) setWeather(data);
      else alert('City not found!');
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Something went wrong. Try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  const getWeatherCondition = () =>
    weather && {
      main: weather.weather[0].main,
      isDay:
        Date.now() / 1000 > weather.sys.sunrise &&
        Date.now() / 1000 < weather.sys.sunset,
    };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground condition={getWeatherCondition()} />

      <div className="flex items-center justify-center p-6 min-h-screen">
        <div className="bg-transparent backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md text-white w-full border border-white/30 relative z-10 transition-transform hover:scale-[1.02] duration-300">
          <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
            Weather Now ☀️
          </h1>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter city name..."
              className="flex-1 p-2 rounded text-black outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={fetchWeather}
              disabled={loading}
              className={`px-4 py-2 rounded text-white transition-all ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>

          {weather && (
            <div className="text-center mt-6 animate-fadeIn">
              <h2 className="text-2xl font-bold">{weather.name}</h2>
              <p className="capitalize text-gray-200">
                {weather.weather[0].description}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
                className="mx-auto my-4 animate-bounce-slow"
              />

              <div className="flex justify-center items-center gap-4">
                <p className="text-4xl font-semibold">
                  {convertTemperature(weather.main.temp, unit)}°{unit}
                </p>
                <button
                  onClick={() => setUnit((u) => (u === 'C' ? 'F' : 'C'))}
                  className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded transition-all"
                >
                  °{unit === 'C' ? 'F' : 'C'}
                </button>
              </div>

              <div className="flex justify-around mt-6">
                <div className="flex flex-col items-center">
                  <HumidityIcon />
                  <p>Humidity</p>
                  <p>{weather.main.humidity}%</p>
                </div>

                <div className="flex flex-col items-center">
                  <WindIcon />
                  <p>Wind</p>
                  <p>{weather.wind.speed} m/s</p>
                </div>
              </div>

              <div className="flex justify-around mt-6">
                <div className="flex flex-col items-center">
                  <SunriseIcon />
                  <p>Sunrise</p>
                  <p>
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <SunsetIcon />
                  <p>Sunset</p>
                  <p>
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;






