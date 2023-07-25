import { openDB } from 'idb';

export async function openDatabase() {
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB");
    return null;
  }

  return await openDB('myDatabase', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('weatherData')) {
        db.createObjectStore('weatherData');
      }
    },
  });
}
