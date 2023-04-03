import { createContext, useCallback, useState } from 'react';
import { compareItemsById } from '../helpers/support-function';

export const TraningContext = createContext({
  training: [],
  exercises: [],
  addTraining: (training) => {},
  addExercise: (exercice) => {},
  updateExercise: (exercice) => {},
  updateTraining: (training) => {},
  clearExercises: () => {},
  editStats: (exerciseId, statsId, newStats) => {},
});

function TrainingProvider({ children }) {
  const [newTraining, setNewTraining] = useState([]);
  const [newExercise, setNewExercise] = useState([]);

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

  function addNewExercice(exercise) {
    if (!newExercise[0]) {
      return setNewExercise([exercise]);
    }
    setNewExercise((currentExercises) => [exercise, ...currentExercises]);
  }

  function updateExercise(id, stats) {
    const updatedExercise = newExercise.find((item) =>
      compareItemsById(item.id, id)
    );
    setNewExercise((currentExercises) => {
      const updatedExercises = currentExercises.map((item) => {
        if (compareItemsById(item.id, updatedExercise.id)) {
          return {
            ...item,
            stats: [stats, ...item.stats],
          };
        } else {
          return item;
        }
      });
      return updatedExercises;
    });
  }

  function updateStats(prevStats, updatedStatsId, newStats) {
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

  function editStats(exerciseId, statsId, newStats) {
    const editExercise = newExercise.find((item) =>
      compareItemsById(item.id, exerciseId)
    );
    const editStats = editExercise.stats.find((stat) =>
      compareItemsById(stat.id, statsId)
    );
    setNewExercise((currentExercises) => {
      const updatedExercises = currentExercises.map((item) => {
        if (compareItemsById(item.id, editExercise.id)) {
          const prevStats = item.stats;
          const updatedStatsId = editStats.id;
          const updatedStats = updateStats(prevStats, updatedStatsId, newStats);
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

  function clearExercises() {
    setNewExercise([]);
  }

  const value = {
    training: newTraining,
    exercises: newExercise,
    addTraining: addNewTraining,
    addExercise: addNewExercice,
    updateExercise: updateExercise,
    updateTraining: updateTraining,
    clearExercises: clearExercises,
    editStats: editStats,
  };

  return (
    <TraningContext.Provider value={value}>{children}</TraningContext.Provider>
  );
}

export default TrainingProvider;
