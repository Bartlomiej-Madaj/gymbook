import { executeSql } from './dbHelper';

const initTrainingQuery = `CREATE TABLE IF NOT EXISTS trainings (
  id INTEGER PRIMARY KEY NOT NULL ,
  date INTEGER NOT NULL,
  title TEXT NOT NULL,
  unit TEXT NOT NULL
)
`;
const insertTrainingQuery = ` INSERT INTO trainings(date, title, unit) VALUES (?, ?, ?)`;
const selectAllTrainingsQuery = `SELECT * FROM trainings ORDER BY date DESC`;
const deleteTrainingQuery1 = `DELETE FROM stats WHERE exercise_id = (SELECT id FROM exercises WHERE training_id = ?)`;
const deleteTrainingQuery2 = `DELETE FROM exercises WHERE training_id = ? `;
const deleteTrainingQuery3 = `DELETE FROM trainings WHERE id = ? `;

export function initTraining() {
  return executeSql(initTrainingQuery);
}

export function insertTraining(training) {
  const args = [training.date, training.trainingTitle, training.trainingUnit];
  return executeSql(insertTrainingQuery, args);
}

export function selectAllTrainings() {
  return executeSql(selectAllTrainingsQuery);
}

export function deleteTraining(trainingId) {
  const queries = [
    deleteTrainingQuery1,
    deleteTrainingQuery2,
    deleteTrainingQuery3,
  ];
  return executeSql(queries, [trainingId]);
}
