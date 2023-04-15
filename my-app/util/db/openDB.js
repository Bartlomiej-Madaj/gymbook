import * as SQLite from 'expo-sqlite';
export const bookGymDatabase = SQLite.openDatabase('gymbook.db');
