import { useContext } from 'react';
import { ExerciseContext } from '../store/exerciseContext';
import { TraningContext } from '../store/traningContext';

export function getCurrentStats(exerciseId, statsId) {
  const exerciseCtx = useContext(ExerciseContext);
  const trainingCtx = useContext(TraningContext);
  const choosenTraining = trainingCtx.trainings?.find(
    (item) => item.id === trainingCtx.trainingId
  );

  const currentExercise = trainingCtx.trainingId
    ? choosenTraining.exercises.find((item) => item.id === exerciseId)
    : exerciseCtx.exercises.find((item) => item.id === exerciseId);

  const currentStats = currentExercise?.stats.find(
    (item) => item.id === statsId
  );

  return currentStats;
}

