// components/Helper.jsx
export const convertTemperature = (temp, unit) => {
  return unit === 'C' ? temp.toFixed(1) : ((temp * 9) / 5 + 32).toFixed(1);
};

