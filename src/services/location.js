//@flow
import {getAddressByLocation} from './network';

export function getAddress (lat, lon) {
  return getAddressByLocation (lat, lon).then (res => {
      return res.data
  });
}
