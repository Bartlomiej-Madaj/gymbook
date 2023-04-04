import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Input from '../UI/Input'
import { TraningContext } from '../../store/traningContext';

const SetsInputs = () => {

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
  )
}

export default SetsInputs;

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