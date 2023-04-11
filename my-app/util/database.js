import * as SQLite from 'expo-sqlite';

const trainingsDatabase = SQLite.openDatabase('trainings4.db');

export function initTraining() {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS trainings (
                id INTEGER PRIMARY KEY NOT NULL ,
                date INTEGER NOT NULL,
                title TEXT NOT NULL,
                unit TEXT NOT NULL
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

export function initExercise() {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                training_id INTEGER,
                FOREIGN KEY(training_id) REFERENCES trainings(id)
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

export function initStats() {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS stats (
                id INTEGER PRIMARY KEY NOT NULL,
                series INTEGER NOT NULL,
                rep INTEGER NOT NULL,
                weight INTEGER NOT NULL,
                exercise_id INTEGER,
                FOREIGN KEY(exercise_id) REFERENCES exercise(id)
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
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        ` INSERT INTO trainings(date, title, unit) VALUES (?, ?, ?)`,
        [training.date, training.trainingTitle, training.trainingUnit],
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

export function insertExercise(exercise, trainingId) {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        ` INSERT INTO exercises(title, training_id) VALUES (?, ?)`,
        [exercise.id, exercise.title, trainingId],
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

export function insertStats(stats, exerciseId) {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        ` INSERT INTO stats(series, rep, weight, exercise_id) VALUES (?, ?, ?, ?)`,
        [stats.id ,stats.set, stats.rep, stats.weight, exerciseId],
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

export function selectAllTrainings() {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM trainings`, [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function selectAllExercises() {
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        ` SELECT * FROM exercises`, [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function selectAllStats(exerciseId) {
 
  const promise = new Promise((resolve, reject) => {
    trainingsDatabase.transaction((tx) => {
      tx.executeSql(
        ` SELECT * FROM stats WHERE exercise_id = ? `, [exerciseId],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
