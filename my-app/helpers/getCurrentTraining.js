import { useContext } from 'react';
import { TraningContext } from '../store/traningContext';
import { compareItemsById } from './support-function';

export function getCurrentTraining(trainingId) {
  
  const trainingCtx = useContext(TraningContext);

  const currentTraining = trainingCtx.trainings.find((item) =>
  compareItemsById(item.id, trainingId)
);

  return currentTraining;
}