import { View, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';

import NewButton from '../UI/NewButton';
import StatInputs from './StatInputs';
import { ExerciseStat } from '../../models/exerciseModel';
import { ExerciseContext } from '../../store/exerciseContext';
import { insertStats } from '../../util/db/statHelper';

const AddSetsPanel = ({ exerciseId, showExerciseFormScreen }) => {
  const [enteredValues, setEnteredValues] = useState();
  const [isClean, setIsClean] = useState(false);
  const exerciseCtx = useContext(ExerciseContext);

  async function addSetHandler() {
    const { set, rep, weight } = enteredValues;
    const result = await insertStats(enteredValues, exerciseId);
    const enteredStats = new ExerciseStat(set, rep, weight, result.insertId);
    exerciseCtx.addStats(exerciseId, enteredStats);
    setIsClean(true);
  }

  function addNewExerciseHandler() {
    showExerciseFormScreen();
    setIsClean(true);
  }

  function adjustEnteredValue(enteredValues) {
    setEnteredValues(enteredValues);
  }

  return (
    <View>
      <StatInputs
        adjustEnteredValue={adjustEnteredValue}
        isClean={isClean}
        changeIsClean={setIsClean}
      />
      <View style={styles.buttonContainer}>
        <NewButton
          title="New Exercise"
          onPress={addNewExerciseHandler}
          rootContainerStyle={{ marginVertical: 8 }}
        />
        <NewButton
          title="Add Set"
          onPress={addSetHandler}
          rootContainerStyle={{ marginVertical: 8 }}
        />
      </View>
    </View>
  );
};

export default AddSetsPanel;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
