import { View, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import StatInputs from './StatInputs';
import { ExerciseContext } from '../../store/exerciseContext';
import { updateStat } from '../../util/db/statHelper';
import { checkStatsIsEmpty } from '../../helpers/support-function';

const EditStatsInput = ({ exerciseId, statsId }) => {
  const [enteredValues, setEnteredValues] = useState();
  const exerciseCtx = useContext(ExerciseContext);

  useEffect(() => {
    if (checkStatsIsEmpty(enteredValues)) return;
    async function updateStats(){
      await updateStat(enteredValues, statsId)
      exerciseCtx.updateStats(exerciseId, statsId, enteredValues);
    }
    updateStats()
  }, [enteredValues]);

  function adjustEnteredValue(enteredValues) {
    setEnteredValues(enteredValues);
  }

  return (
    <View style={styles.container}>
      <StatInputs
        adjustEnteredValue={adjustEnteredValue}
        exerciseId={exerciseId}
        statsId={statsId}
      />
    </View>
  );
};

export default EditStatsInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c3c3c3',
    borderRadius: 16,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    elevation: 4,
  },
});
