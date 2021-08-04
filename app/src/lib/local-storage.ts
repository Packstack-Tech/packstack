import makeStorage from './storage';
const storage = makeStorage(localStorage);

export const setString = storage.setString;

export const getString = storage.getString;

export const setNumber = storage.setNumber;

export const getNumber = storage.getNumber;

export const removeItem = storage.removeItem;