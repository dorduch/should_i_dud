//@flow
import {getHistoryWeather} from './network';

export const levels = {
  colder: {color: 'rgba(5, 47, 95, 1)', label: 'YES U SHOULD'},
  cold: {color: 'rgba(0, 83, 119, 1)', label: 'Maybe u should'},
  default: {color: 'rgba(6, 167, 125, 1)'},
  warm: {color: 'rgba(213, 198, 122, 1)', label: `Maybe u shouldn't`},
  warmer: {color: 'rgba(241, 162, 8, 1)', label: 'HELL NO'},
};

 

export function getCoverageLevel (cloudCoverage) {
    if (cloudCoverage > 0.70) {
      return levels.colder;
    }
    else if (cloudCoverage > 0.50) {
      return levels.cold;
    }
    else if (cloudCoverage > 0.30) {
      return levels.warm;
    } else {
      return levels.warmer;
    }
  };
 

export function getCloudCoverage (lat, lon, time) {
  return getHistoryWeather ({lat, lon, time}).then (res => {
    const cloudCoverage = res.data.daily.data[0].cloudCover;
    return cloudCoverage;
  });
}
