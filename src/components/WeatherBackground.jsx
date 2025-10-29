import React from 'react';
import Thunderstorm from '../assets/Thunderstorm.gif';
import Rain from '../assets/Rain.gif';
import SnowDay from '../assets/Snow.gif';
import ClearDay from '../assets/ClearDay.gif';
import ClearNight from '../assets/ClearNight.gif';
import CloudDay from '../assets/CloudsDay.gif';
import CloudNight from '../assets/CloudsNight.gif';
import Haze from '../assets/Haze.gif';
import Video from '../assets/video1.mp4';

const WeatherBackground = ({ condition, timeOfDay }) => {
  const gifs = {
    Thunderstorm,
    Drizzle: Rain,
    Rain,
    Snow: SnowDay,
    Clear: { day: ClearDay, night: ClearNight },
    Clouds: { day: CloudDay, night: CloudNight },
    Mist: Haze,
    Smoke: Haze,
    Haze,
    Fog: Haze,
    default: Video,
  };

  const getBackground = () => {
    if (!condition) return gifs.default;

    const weatherType = condition.main || condition; // supports both object/string
    const asset = gifs[weatherType];

    if (!asset) return gifs.default;
    if (typeof asset === 'object')
      return timeOfDay === 'day' ? asset.day : asset.night;

    return asset;
  };

  const background = getBackground();

  return (
    <div className='fixed inset-0 z-0 overflow-hidden'>
      {background === Video ? (
        <video
          autoPlay
          loop
          muted
          className='w-full h-full object-cover opacity-100 pointer-events-none animate-fade-in'
        >
          <source src={Video} type='video/mp4' />
        </video>
      ) : (
        <img
          src={background}
          alt='Weather-bg'
          className='w-full h-full object-cover opacity-20 pointer-events-none animate-fade-in'
        />
      )}
      <div className='absolute inset-0 bg-black/30' />
    </div>
  );
};

export default WeatherBackground;

