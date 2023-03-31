import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Input from '../UI/Input';
import NewButton from '../UI/NewButton';
import { ExerciseStat } from '../../models/exerciseModel';
import { searchExerciseByName, compareItemsById } from '../../helpers/support-function';
import { SIZES, FONTS, COLORS } from '../../constants/index.js';

const inputConfig = { maxLength: 3, keyboardType: 'numeric' };

const AddSetsPanel = ({exercises, exerciseName, updateStats, clearExerciseName, showExercisesPanel}) => {

    const [amountSet, setAmountSet] = useState('');
    const [amountRep, setAmountRep] = useState('');
    const [weight, setWeight] = useState('');

    function addSetHandler() {
        const searchedExercise = searchExerciseByName(exercises, exerciseName);
    
        const enteredStats = new ExerciseStat(amountSet, amountRep, weight);
    
        updateStats((currentExercises) => {
          const updateExercise = currentExercises.map((exercise) => {
            if ( !compareItemsById(exercise.id, searchedExercise.id)) {
              return {
                ...exercise,
              };
            } else {
              return {
                ...exercise,
                stats: [...exercise.stats, enteredStats],
              };
            }
          });
          return [...updateExercise];
        });
      }
    
      function addNewExerciseHandler() {
        showExercisesPanel(false);
        clearExerciseName('');
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
      // minHeight: '50%',
      // borderWidth: 3,
      // borderColor: 'white'
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