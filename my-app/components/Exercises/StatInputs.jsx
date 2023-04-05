import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Input from '../UI/Input';
import { SIZES, FONTS, COLORS } from '../../constants/index.js';
import { TraningContext } from '../../store/traningContext';
import { ExerciseContext } from '../../store/exerciseContext';

const inputConfig = { maxLength: 3, keyboardType: 'numeric' };

const StatInputs = ({ adjustEnteredValue, exerciseId, statsId }) => {
  const [amountSet, setAmountSet] = useState('');
  const [amountRep, setAmountRep] = useState('');
  const [weight, setWeight] = useState('');
  const [enteredValues, setEnteredValues] = useState();
  // const trainingCtx = useContext(TraningContext);
  const exerciseCtx = useContext(ExerciseContext)

  useEffect(() => {
    setEnteredValues({
      set: amountSet,
      rep: amountRep,
      weight: weight,
    });
  }, [amountSet, amountRep, weight]);

  useEffect(() => {
    adjustEnteredValue(enteredValues);
  }, [enteredValues]);

  const currentExercise = exerciseCtx.exercises.find(
    (item) => item.id === exerciseId
  );
  const currentStats = currentExercise?.stats.find(
    (item) => item.id === statsId
  );

  useEffect(() => {
      setAmountSet(currentStats?.set);
      setAmountRep(currentStats?.rep);
      setWeight(currentStats?.weight);
  }, [currentStats]);

  return (
    <View style={styles.inputsContainer}>
      <Input
        setEnteredValueHandler={setAmountSet}
        value={amountSet}
        rootStyle={styles.inputContainer}
        labelTextStyle={styles.labelText}
        containerInputStyle={styles.inputBox}
        label="SET"
        config={inputConfig}
        placeholder="Set..."
      />
      <Input
        setEnteredValueHandler={setAmountRep}
        value={amountRep}
        rootStyle={styles.inputContainer}
        labelTextStyle={styles.labelText}
        containerInputStyle={styles.inputBox}
        label="REP"
        config={inputConfig}
        placeholder="Rep.."
      />
      <Input
        setEnteredValueHandler={setWeight}
        value={weight}
        rootStyle={styles.inputContainer}
        labelTextStyle={styles.labelText}
        containerInputStyle={styles.inputBox}
        label="Weight"
        config={inputConfig}
        placeholder="How many?"
      />
    </View>
  );
};

export default StatInputs;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '15%',
    justifyContent: 'center',
    backgroundColor: '#d7d7d7',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
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
