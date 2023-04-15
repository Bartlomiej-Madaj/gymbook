import { Exercise, ExerciseStat } from "../models/exerciseModel";
import { selectAllExercises } from "../util/db/exerciseHelpers";
import { selectAllStats } from "../util/db/statHelper";

export async function getExercises(trainingId, setExercises) {
    const exercises = await selectAllExercises(trainingId);
    exercises.map(async (exercise) => {
      const exerciseFromDb = new Exercise(exercise.title, exercise.id);
      const stats = await selectAllStats(exercise.id);
      stats.map((stat) => {
        const statsFromDb = new ExerciseStat(
          stat.series.toString(),
          stat.rep.toString(),
          stat.weight.toString(),
          stat.id
          );
          exerciseFromDb.addStats(statsFromDb);
      });
      setExercises((currentExercises) => [...currentExercises,
        exerciseFromDb,
      ]);
    });
  }