import { executeSql } from "./dbHelper";

const initExerciseQuery =           `
CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        training_id INTEGER,
        FOREIGN KEY(training_id) REFERENCES trainings(id)
  )
    `;
const insertExerciseQuery = ` INSERT INTO exercises(title, training_id) VALUES (?, ?)`;

const selectAllExercisesQuery = `SELECT * FROM exercises WHERE training_id = ? ORDER BY id DESC `;
const updateExerciseQuery =  ` UPDATE exercises SET title = ? WHERE id = ? `;
const deleteExerciseQuery1 =  ` DELETE FROM stats WHERE exercise_id = ? `;
const deleteExerciseQuery2 =  ` DELETE FROM exercises WHERE id = ? `;

export function initExercise() {
  return executeSql(initExerciseQuery)
  }

  export function insertExercise(exerciseName, trainingId) {
    const args = [exerciseName, trainingId]
    return executeSql(insertExerciseQuery, args)
  }

  export function selectAllExercises(trainingId) {
    return executeSql(selectAllExercisesQuery, [trainingId])
  }
  
  export function updateExercise(newExerciseTitle, exerciseId) {
    const args = [newExerciseTitle, exerciseId]
    return executeSql(updateExerciseQuery, args)
  }

  export function deleteExercise(exerciseId) {
    const queries = [deleteExerciseQuery1, deleteExerciseQuery2]
    return executeSql(queries, [exerciseId])
  }
