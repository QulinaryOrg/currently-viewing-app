/**
 *
 * This file includes manipulations/helpers for the ipDataList array.
 * Since React expects changes to be immutable, we make sure that
 * all of these functions are pure and never mutate the provided data.
 *
 */

import type { IpData } from '../types'

export const includesIp = (list: IpData[], predicateIp: string) =>
  list.findIndex(({ ip }) => ip === predicateIp) >= 0

export const appendToList = (list: IpData[], data: IpData) =>
  includesIp(list, data.ip) ? list : [...list, data]

export const removeFromList = (list: IpData[], ipToRemove: string) =>
  list.filter(({ ip }) => ip !== ipToRemove)
