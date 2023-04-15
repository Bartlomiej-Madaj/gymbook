import { useContext } from 'react';
import { ExerciseContext } from '../store/exerciseContext';
import { compareItemsById } from './support-function';

export function getCurrentExercise(exerciseId){
    const exerciseCtx = useContext(ExerciseContext);
    const exercise = exerciseCtx.exercises.find(exercise => compareItemsById(exercise.id, exerciseId))

    return exercise
}