import { createContext, useContext, useEffect, useState } from 'react';
import { compareItemsById } from '../helpers/support-function';
import { ExerciseContext } from './exerciseContext';

export const TraningContext = createContext({
  trainings: [],
  trainingId: '',
  addTraining: (training) => {},
  addTrainingFromDB: (training) => {},
  updateTraining: (training) => {},
  adjustTrainingId: (id) => {},
  deleteTraining: (id) => {}
});

function TrainingProvider({ children }) {
  const [newTraining, setNewTraining] = useState([]);
  const [newExercise, setNewExercise] = useState([]);
  const [trainingId, setTrainingId] = useState('')
  const exerciseCtx = useContext(ExerciseContext)
  useEffect(()=>{
    setNewExercise(exerciseCtx.exercises)
  }, [exerciseCtx.exercises])

  function adjustTrainingId(id){
    setTrainingId(id)
  }

  function addTraining(training){
    setNewTraining([training]);
  }

  function addNewTraining(training) {
    if (!newTraining[0]) {
      setNewTraining([training]);
      return;
    }
    setNewTraining((currentTrainings) => {
      const presentTraining = currentTrainings.find((item) =>
        compareItemsById(item.id, training.id)
      );

      if (!presentTraining) {
        return [training, ...currentTrainings];
      }
      const updateTrainings = currentTrainings.map((item) => {
        if (compareItemsById(item.id, presentTraining.id)) {
          return training;
        } else {
          return item;
        }
      });
      return [...updateTrainings];
    });
  }

  function updateTraining(id) {
    const updatedTraining = newTraining.find((item) =>
      compareItemsById(item.id, id)
    );
    setNewTraining((currentTrainings) => {
      const updatedTrainings = currentTrainings.map((item) => {
        if (compareItemsById(item.id, updatedTraining.id)) {
          return {
            ...item,
            exercises: newExercise,
          };
        } else {
          return item;
        }
      });
      return updatedTrainings;
    });
  }

  function deleteTraining(trainingId){
    setNewTraining(currentTrainings => currentTrainings.filter(item => item.id !== trainingId))
  }

  const value = {
    trainings: newTraining,
    trainingId: trainingId,
    addTraining: addNewTraining,
    addTrainingFromDB: addTraining,
    updateTraining: updateTraining,
    adjustTrainingId: adjustTrainingId,
    deleteTraining: deleteTraining,
  };

  return (
    <TraningContext.Provider value={value}>{children}</TraningContext.Provider>
  );
}

export default TrainingProvider;
