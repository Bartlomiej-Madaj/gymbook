import { View, StyleSheet, Text, FlatList } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

import Headline from '../Text/Headline';
import { searchExerciseByName } from '../../helpers/support-function.js';
import { useContext, useEffect, useState } from 'react';
import ExerciseDetails from './ExerciseDetails.jsx';
import { ExerciseContext } from '../../store/exerciseContext.js';

const List = ({ title, exerciseName, unit, statsIcon, showUpdateModal, exerciseIcon }) => {
  const exerciseCtx = useContext(ExerciseContext)
  const [foundExercise1, setFoundExercise] = useState([])

  //add useState!!!
  let data = [];
  data = exerciseCtx.exercises;

  useEffect(() => {
    if (exerciseName) {
      const exercise = searchExerciseByName(data, exerciseName);
      setFoundExercise( [exercise])
    }
  },[exerciseName, data])


  function showEditExerciseModal(exerciseId){
    showUpdateModal(exerciseId)
  }

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
        data={exerciseName ? foundExercise1 : data}
        renderItem={({ item }) => ( 
          <ExerciseDetails exerciseIcon={exerciseIcon} statsIcon={statsIcon} exercise={item} unit={unit} onPress={showEditExerciseModal.bind(this, item.id)} />
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
