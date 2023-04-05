import { createContext, useEffect, useState } from 'react';
import { compareItemsById } from '../helpers/support-function';

export const ExerciseContext = createContext({
  exercises: [],
  addExercise: (exercice) => {},
  addStats: (exercice) => {},
  clearExercises: () => {},
  updateStats: (exerciseId, statsId, newStats) => {},
  deleteStats: (exerciseId, statsId,) => {}
});

// export let exercises;
function ExerciseProvider({ children }) {
  const [newExercise, setNewExercise] = useState([]);

  // useEffect(() => {
  //   exercises = newExercise
  // }, [newExercise])

  function addNewExercice(exercise) {
    if (!newExercise[0]) {
      return setNewExercise([exercise]);
    }
    setNewExercise((currentExercises) => [exercise, ...currentExercises]);
  }

  function addNewStats(id, stats) {
    const updatedExercise = newExercise.find((item) =>
      compareItemsById(item.id, id)
    );
    setNewExercise((currentExercises) => {
      const updatedExercises = currentExercises.map((item) => {
        if (compareItemsById(item.id, updatedExercise.id)) {
          return {
            ...item,
            stats: [ ...item.stats, stats],
          };
        } else {
          return item;
        }
      });
      return updatedExercises;
    });
  }

  function updateStatsHelper(prevStats, updatedStatsId, newStats) {
    const updatedStats = prevStats.map((stat) => {
      if (compareItemsById(stat.id, updatedStatsId)) {
        return {
          id: stat.id,
          ...newStats,
        };
      } else {
        return stat;
      }
    });
    return updatedStats;
  }

  function updateStats(exerciseId, statsId, newStats) {
    const editedExercise = newExercise.find((item) =>
      compareItemsById(item.id, exerciseId)
    );
    const editedStats = editedExercise.stats.find((stat) =>
      compareItemsById(stat.id, statsId)
    );
    setNewExercise((currentExercises) => {
      const updatedExercises = currentExercises.map((item) => {
        if (compareItemsById(item.id, editedExercise.id)) {
          const prevStats = item.stats;
          const updatedStatsId = editedStats.id;
          const updatedStats = updateStatsHelper(prevStats, updatedStatsId, newStats);
          return {
            ...item,
            stats: updatedStats,
          };
        } else {
          return item;
        }
      });
      return updatedExercises;
    });
  }

  function deleteStats(exerciseId, statId){
    const editedExercise = newExercise.find((item) =>
      compareItemsById(item.id, exerciseId)
    );
    setNewExercise(currentExercises => {
      const updatedExercises = currentExercises.map(exercise => {
        if(compareItemsById(editedExercise.id, exercise.id )){
          const updatedStats = exercise.stats.filter(stat => stat.id !== statId)
          return {
            ...exercise,
            stats: updatedStats
          }
        }else {
          return exercise
        }
      })
      return updatedExercises
    })
  }

  function clearExercises() {
    setNewExercise([]);
  }

  const value = {
    exercises: newExercise,
    addExercise: addNewExercice,
    addStats: addNewStats,
    clearExercises: clearExercises,
    updateStats: updateStats,
    deleteStats: deleteStats
  };

  return (
    <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>
  );
}

export default ExerciseProvider;