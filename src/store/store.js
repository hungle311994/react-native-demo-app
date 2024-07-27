import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setToStorage = (key, value) => storage.set(key, value);
export const getStringFromStorage = key => storage.getString(key);
export const getBooleanFromStorage = key => storage.getBoolean(key);
export const getNumberFromStorage = key => storage.getNumber(key);

export const deleteFromStorage = key => storage.delete(key);
