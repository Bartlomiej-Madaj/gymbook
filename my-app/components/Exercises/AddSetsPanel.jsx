import { View, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import Input from '../UI/Input';
import NewButton from '../UI/NewButton';
import { ExerciseStat } from '../../models/exerciseModel';
import { SIZES, FONTS, COLORS } from '../../constants/index.js';
import { TraningContext } from '../../store/traningContext';


const inputConfig = { maxLength: 3, keyboardType: 'numeric' };

const AddSetsPanel = ({ exerciseId, showExerciseFormScreen }) => {

    const [amountSet, setAmountSet] = useState('');
    const [amountRep, setAmountRep] = useState('');
    const [weight, setWeight] = useState('');
    const trainingCtx = useContext(TraningContext);

    function addSetHandler() {
        const enteredStats = new ExerciseStat(amountSet, amountRep, weight);
        trainingCtx.addStats(exerciseId, enteredStats)
        setAmountRep('');
        setAmountSet('');
        setWeight('');
      }
    
      function addNewExerciseHandler() {
        showExerciseFormScreen()
        setAmountRep('');
        setAmountSet('');
        setWeight('');
      }

  return (
    <View style={styles.container}>
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
    }
  });