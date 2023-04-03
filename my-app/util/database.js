import * as SQLite from 'expo-sqlite';

const trainningsDatabase = SQLite.openDatabase('trainings.db');
const exercisesDatabase = SQLite.openDatabase('exercises.db');
const statsDatabase = SQLite.openDatabase('stats.db');

export function init() {
  const promise1 = new Promise((resolve, reject) => {
    trainningsDatabase.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trainings (
                id INT PRIMARY KEY NOT NULL,
                date INT NOT NULL,
                title TEXT NOT NULL,
                unit TEXT NOT NULL
            )`,
        [],
        (_, result) => {resolve(result)},
        (_, error) => { reject(error)}
      );
    });
  });
  const promise2 = new Promise((resolve, reject) => {
    exercisesDatabase.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trainings (
                id INT PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
            )`,
        [],
        (_, result) => {resolve(result)},
        (_, error) => { reject(error)}
      );
    });
  });
  const promise3 = new Promise((resolve, reject) => {
    statsDatabase.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trainings (
                id INT PRIMARY KEY NOT NULL,
                set INT NOT NULL,
                rep INT NOT NULL,
                set INT NOT NULL,
                )`,
        [],
        (_, result) => {resolve(result)},
        (_, error) => { reject(error)}
      );
    });
  });
  return [promise1, promise2, promise3]
}

export function insertTraining(training) {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(` INSERT INTO trainings (date, trainingTitle, unit) VALUES (?, ?, ?)`,[training.date, training.trainingTitle, training.unit],
            () => {resolve()},
            (_, error)=> {reject(error)}
            )
        })
    })
}
