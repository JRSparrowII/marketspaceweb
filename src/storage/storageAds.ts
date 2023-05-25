import { AdsDTO } from '../dtos/AdsDTO';
import { ADS_STORAGE } from './storageConfig';

export async function storageAdsSave(ads: AdsDTO) {
  await localStorage.setItem(ADS_STORAGE, JSON.stringify(ads));
}

export async function storageAdsGet() {
  const storage = await localStorage.getItem(ADS_STORAGE);

  const ads = storage ? (JSON.parse(storage) as AdsDTO) : undefined;

  return ads;
}

export async function storageAdsRemove() { 
  await localStorage.removeItem(ADS_STORAGE);
}