import { View, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import NewButton from '../UI/NewButton';
import { ExerciseStat } from '../../models/exerciseModel';
import { SIZES, FONTS, COLORS } from '../../constants/index.js';
import { TraningContext } from '../../store/traningContext';
import StatInputs from './StatInputs';

const AddSetsPanel = ({ exerciseId, showExerciseFormScreen }) => {
  const [enteredValues, setEnteredValues] = useState();
  const [isClear, setIsClear] = useState(false);
  const trainingCtx = useContext(TraningContext);

  function addSetHandler() {
    const { set, rep, weight } = enteredValues;
    const enteredStats = new ExerciseStat(set, rep, weight);
    trainingCtx.addStats(exerciseId, enteredStats);
    setIsClear(true);
  }

  function addNewExerciseHandler() {
    showExerciseFormScreen();
  }

  function adjustEnteredValue(enteredValues) {
    setEnteredValues(enteredValues);
  }

  return (
    <View style={styles.container}>
      <StatInputs adjustEnteredValue={adjustEnteredValue} isClear={isClear} />
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
  container: {
    // flex: 1,
  },
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
