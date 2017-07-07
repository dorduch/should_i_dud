//@flow
import {getHistoryWeather} from './network';

export const levels = {
  colder: {color: 'rgba(5, 47, 95, 1)', label: 'YES U SHOULD'},
  cold: {color: 'rgba(0, 83, 119, 1)', label: 'Maybe u should'},
  default: {color: 'rgba(6, 167, 125, 1)'},
  warm: {color: 'rgba(213, 198, 122, 1)', label: `Maybe u shouldn't`},
  warmer: {color: 'rgba(241, 162, 8, 1)', label: 'HELL NO'},
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

  export function getUvIndexLabel (uvIndex) {
    const {allDay, lastFiveHours} = uvIndex;
    let allDayLabel = '';
    let lastFiveHoursLabel = '';
    if (allDay < 3) {
      allDayLabel = 'Low';
    } else if (allDay < 5) {
      allDayLabel = 'Moderate';
    } else if (allDay < 7) {
      allDayLabel = 'High';
    }
    else {
      allDayLabel = 'Very High';
    }
      if (lastFiveHours < 3) {
      lastFiveHoursLabel = 'Low';
    } else if (lastFiveHours < 5) {
      lastFiveHoursLabel = 'Moderate';
    } else if (lastFiveHours < 7) {
      lastFiveHoursLabel = 'High';
    }
    else {
      lastFiveHoursLabel = 'Very High';
    }
    return `${allDayLabel} UV index during the day.\n${lastFiveHoursLabel} UV index in the last 5 hours.`
  };
 

export function getUvIndex (lat, lon, time, hours) {
  return getHistoryWeather ({lat, lon, time, hours}).then (res => {
    const uvIndex = res.data;
    return uvIndex;
  });
}
