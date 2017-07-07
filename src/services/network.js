//@flow
import axios from 'axios';
import template from 'url-template';

// const apiUrl = 'http://api.apixu.com/v1/history.json';//apixu
// const apiKey = '6dac7dbd524a42a398573337170707'; //apixu
const apiUrl = template.parse (
  'https://api.darksky.net/forecast/{apiKey}/{lat},{lon},{time}'
); //darksky
const apiKey = '1b40a3428e9099642baa36e54ff0b413'; //darksky

export function getHistoryWeatherOld (query: string, time: string): Object {
  const reqParams = {
    key: apiKey,
    q: query,
    dt: time,
  };
  return axios.get (apiUrl, {params: reqParams});
}

export function getHistoryWeather({lat, lon, time}): Promise<any> {
  const url = apiUrl.expand ({apiKey, lat, lon, time});
  const reqParams = {
    exclude: ['currently', 'hourly', 'alerts', 'flags'].toString (),
    units: 'si',
  };
  return axios.get(url, {params: reqParams});
  // return new Promise ((resolve, reject) =>
  //   setTimeout (() =>
  //     resolve ({
  //       data: {
  //         latitude: 31.898529399999997,
  //         longitude: 34.8018972,
  //         timezone: 'Asia/Jerusalem',
  //         offset: 3,
  //         daily: {
  //           data: [
  //             {
  //               time: 1499288400,
  //               summary: 'Partly cloudy in the morning.',
  //               icon: 'partly-cloudy-day',
  //               sunriseTime: 1499308915,
  //               sunsetTime: 1499359881,
  //               moonPhase: 0.41,
  //               precipIntensity: 0,
  //               precipIntensityMax: 0,
  //               precipProbability: 0,
  //               temperatureMin: 24.21,
  //               temperatureMinTime: 1499292000,
  //               temperatureMax: 29.29,
  //               temperatureMaxTime: 1499338800,
  //               apparentTemperatureMin: 24.85,
  //               apparentTemperatureMinTime: 1499310000,
  //               apparentTemperatureMax: 31.08,
  //               apparentTemperatureMaxTime: 1499338800,
  //               dewPoint: 20.46,
  //               humidity: 0.71,
  //               windSpeed: 2.09,
  //               windGust: 5.23,
  //               windGustTime: 1499338800,
  //               windBearing: 276,
  //               cloudCover: 0.14,
  //               pressure: 1008.62,
  //               ozone: 291.16,
  //               uvIndex: 11,
  //               uvIndexTime: 1499335200,
  //             },
  //           ],
  //         },
  //       },
  //     }), 500
  //   )
  // );
}
