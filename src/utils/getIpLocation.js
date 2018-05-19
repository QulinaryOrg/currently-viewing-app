import iplocation from 'iplocation'
import type { IpData } from '../types'

export default async (ip: string): Promise<IpData> => {
  try {
    const res = await iplocation(ip)
    if (res && res.country_name) {
      return {
        ip,
        countryName: res.country_name,
      }
    }
  } catch (err) {
    // ignore the error
  }

  return {
    ip,
    countryName: null,
  }
}
