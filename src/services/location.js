//@flow
import {getAddressByLocation} from './network';

export function getAddress (lat, lon) {
  return getAddressByLocation (lat, lon).then (res => {
    if (res.data && res.data.results && res.data.results[0]) {
      return res.data.results[0].formatted_address
    }
  });
}
