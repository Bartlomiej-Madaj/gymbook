import { View, StyleSheet, Text, FlatList } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

import Headline from '../Text/Headline';
import { searchExerciseByName } from '../../helpers/support-function.js';
import { useContext, useEffect, useState } from 'react';
import ExerciseDetails from './ExerciseDetails.jsx';
import { ExerciseContext } from '../../store/exerciseContext.js';

const List = ({
  title,
  exerciseName,
  unit,
  exerciseIcon,
  statsIcon,
  exerciseId,
  showUpdateModal,
}) => {
  const exerciseCtx = useContext(ExerciseContext);
  const [foundExercise, setFoundExercise] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    let exercises;
    if (exerciseName) {
      exercises = exerciseCtx.exercises;
    } else {
      exercises = exerciseCtx.exercises.filter((item) => item.stats[0]);
    }
    setExercises(exercises);
  }, [exerciseCtx.exercises]);

  useEffect(() => {
    if (exerciseName && exercises.at(0)) {
      const exercise = searchExerciseByName(exercises, exerciseName);
      setFoundExercise([exercise]);
    }
  }, [exerciseName, exercises]);

  function showEditExerciseModal(exerciseId) {
    showUpdateModal(exerciseId);
  }

  if (!exercises.at(0)) {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.noteText}>You do not have exercises!</Text>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <Headline>{title}</Headline>
      <FlatList
        data={exerciseId ? foundExercise : exercises}
        renderItem={({ item }) => (
          <ExerciseDetails
            exerciseIcon={exerciseIcon}
            statsIcon={statsIcon}
            exerciseId={exerciseId}
            exercise={item}
            unit={unit}
            onPress={showEditExerciseModal.bind(this, item?.id)}
          />
        )}
        keyExtractor={() => Math.random().toFixed(6)}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    borderTopColor: COLORS.secondary,
    borderTopWidth: 4,
  },
  noteText: {
    flex: 1,
    marginTop: 16,
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    textAlign: 'center',
    color: COLORS.text,
  },
});
