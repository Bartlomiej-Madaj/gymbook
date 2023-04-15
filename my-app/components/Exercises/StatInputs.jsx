import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../UI/Input';
import { COLORS } from '../../constants/index.js';
import { getCurrentStats } from '../../helpers/getCurrentStats';

const inputConfig = { maxLength: 3, keyboardType: 'numeric' };

const StatInputs = ({
  adjustEnteredValue,
  exerciseId,
  statsId,
  isClean,
  changeIsClean,
}) => {
  const [amountSet, setAmountSet] = useState('');
  const [amountRep, setAmountRep] = useState('');
  const [weight, setWeight] = useState('');
  const [enteredValues, setEnteredValues] = useState();

  const currentStats = getCurrentStats(exerciseId, statsId);

  useEffect(() => {
    setEnteredValues({
      set: amountSet,
      rep: amountRep,
      weight: weight,
    });
    changeIsClean && changeIsClean(false);
  }, [amountSet, amountRep, weight]);

  useEffect(() => {
    adjustEnteredValue(enteredValues);
  }, [enteredValues]);

  useEffect(() => {
    if (!isClean) {
      setAmountSet(currentStats?.set);
      setAmountRep(currentStats?.rep);
      setWeight(currentStats?.weight);
    } else {
      setAmountSet('');
      setAmountRep('');
      setWeight('');
    }
  }, [isClean]);

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
