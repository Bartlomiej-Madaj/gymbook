import { View, StyleSheet, Text } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

import Headline from '../Text/Headline';
import DynamicList from '../Text/DynamicList';
import { searchExerciseByName } from '../../helpers/support-function.js';

const List = ({ title, data, exerciseName }) => {
  let foundExercise = [];
  if (!data[0]) {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.noteText}>You do not have exercise!</Text>
      </View>
    );
  }

  if (exerciseName) {
    const exercise = searchExerciseByName(data, exerciseName);
    foundExercise.push(exercise);
  }

  return (
    <View style={styles.listContainer}>
      <Headline>{title}</Headline>
      <DynamicList data={exerciseName ? foundExercise : data} />
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
