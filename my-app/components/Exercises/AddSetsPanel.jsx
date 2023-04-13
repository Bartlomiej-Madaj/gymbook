import { View, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import NewButton from '../UI/NewButton';
import { ExerciseStat } from '../../models/exerciseModel';
import { SIZES, FONTS, COLORS } from '../../constants/index.js';
import StatInputs from './StatInputs';
import { ExerciseContext } from '../../store/exerciseContext';
import { insertStats } from '../../util/database';

const AddSetsPanel = ({ exerciseId, showExerciseFormScreen }) => {
  const [enteredValues, setEnteredValues] = useState();
  const [isClean, setIsClean] = useState(false);
  const exerciseCtx = useContext(ExerciseContext);

  async function addSetHandler() {
    const { set, rep, weight } = enteredValues;
    const result = await insertStats(enteredValues, exerciseId)
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
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
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    width: '30%',
  },
  inputBox: {
    backgroundColor: '#ffffff7e',
    borderColor: COLORS.secondary,
    borderRadius: 8,
  },
  labelText: {
    color: 'white',
  },
});
