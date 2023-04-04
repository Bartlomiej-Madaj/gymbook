import * as SQLite from 'expo-sqlite';

const trainingsDatabase = SQLite.openDatabase('trainings.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trainings (
                id INTEGER PRIMARY KEY NOT NULL,
                date INTEGER NOT NULL,
                title TEXT NOT NULL,
                unit TEXT NOT NULL
            );
          CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                FOREIGN KEY(training_id) REFERENCES trainings(id)
          );
          CREATE TABLE IF NOT EXISTS stats (
              id INTEGER PRIMARY KEY NOT NULL,
              set INTEGER NOT NULL,
              rep INTEGER NOT NULL,
              set INTEGER NOT NULL,
              FOREIGN KEY(exercise_id) REFERENCES exercises(id)
            )
            `,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertTraining(training) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        ` INSERT INTO trainings (date, trainingTitle, unit) VALUES (?, ?, ?)`,
        [training.date, training.trainingTitle, training.unit],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
