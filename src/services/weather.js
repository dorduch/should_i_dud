//@flow
import {getHistoryWeather} from './network';

export const levels = {
  colder: {color: 'rgba(5, 47, 95, 1)', label: 'YES U SHOULD', subtitle: 'NO HOT WATER FOR U'},
  cold: {color: 'rgba(0, 83, 119, 1)', label: 'Maybe u should', subtitle: `I won't bet on it`},
  default: {color: 'rgba(6, 167, 125, 1)'},
  warm: {color: 'rgba(213, 198, 122, 1)', label: `Maybe u shouldn't`, subtitle: 'maybe warm enough, maybe not'},
  warmer: {color: 'rgba(241, 162, 8, 1)', label: 'HELL NO', subtitle: 'SUPER MEGA HOT OUTSIDE!'},
};

 

export function getUvIndexLevel (uvIndex) {
  const value = 0.7*uvIndex.allDay + 0.3*uvIndex.lastFiveHours;
    if (value < 3) {
      return levels.colder;
    }
    else if (value < 5) {
      return levels.cold;
    }
    else if (value < 7) {
      return levels.warm;
    } else {
      return levels.warmer;
    }
  };

export function getUvIndex (lat, lon, time, hours) {
  return getHistoryWeather ({lat, lon, time, hours}).then (res => {
    const uvIndex = res.data;
    return uvIndex;
  });
}
