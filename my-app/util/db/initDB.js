import { initTraining } from './trainingHelpers';
import { initExercise } from './exerciseHelpers';
import { initStats } from './statHelper';

export function init(){
  return Promise.all([initTraining(), initExercise(), initStats()])
}