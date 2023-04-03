import { View, StyleSheet, Text, FlatList } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

import Headline from '../Text/Headline';
import { searchExerciseByName } from '../../helpers/support-function.js';
import { useContext, useLayoutEffect } from 'react';
import { TraningContext } from '../../store/traningContext.js';
import ExerciseDetails from './ExerciseDetails.jsx';

const List = ({ title, exerciseName, unit, isIcon }) => {
  const trainingCtx = useContext(TraningContext);
  let data = [];
  data = trainingCtx.exercises;

  let foundExercise = [];
  useLayoutEffect(() => {
    if (exerciseName) {
      const exercise = searchExerciseByName(data, exerciseName);
      foundExercise.push(exercise);
    }
  },[exerciseName, data])

  if (!data[0]) {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.noteText}>You do not have exercise!</Text>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <Headline>{title}</Headline>
      <FlatList
        data={exerciseName ? foundExercise : data}
        renderItem={({ item }) => ( 
          <ExerciseDetails isIcon={isIcon} exercise={item} unit={unit} />
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
