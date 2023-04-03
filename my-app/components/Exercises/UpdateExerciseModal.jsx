import { View, Text, Modal, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';
import Input from '../UI/Input.jsx';
import NewButton from '../UI/NewButton.jsx';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TraningContext } from '../../store/traningContext.js';

const inputConfig = { maxLength: 3, keyboardType: 'numeric' };

const UpdateExerciseModal = ({
  isVisible,
  changeIsVisible,
  exerciseId,
  statsId,
}) => {
  const { height, width } = useWindowDimensions();
  const [amountSet, setAmountSet] = useState('');
  const [amountRep, setAmountRep] = useState('');
  const [weight, setWeight] = useState('');
  const [newStats, setNewStats] = useState();
  const trainingCtx = useContext(TraningContext);

  useEffect(() => {
    setNewStats({ set: amountSet, rep: amountRep, weight: weight });
  }, [amountSet, amountRep, weight]);

  const currentExercise = trainingCtx.exercises.find(
    (item) => item.id === exerciseId
  );
  const currentStats = currentExercise.stats.find(
    (item) => item.id === statsId
  );
  useEffect(() => {
    setAmountSet(currentStats?.set);
    setAmountRep(currentStats?.rep);
    setWeight(currentStats?.weight);
  }, [currentStats]);

  const widthFacotr = 0.95;
  const leftOffset = (width * (1 - widthFacotr)) / 2;

  function editExerciseHandler() {
    trainingCtx.editStats(exerciseId, statsId, newStats);
    changeIsVisible();
  }

  function closeHandler() {
    changeIsVisible();
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={{ flex: 1, backgroundColor: '#cccccc93' }}>
        <View
          style={[
            styles.container,
            { left: leftOffset, width: width * widthFacotr },
          ]}
        >
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <NewButton
              title="Edit"
              onPress={editExerciseHandler}
              rootContainerStyle={{ marginVertical: 8 }}
            />
            <NewButton
              title="Close"
              onPress={closeHandler}
              rootContainerStyle={{ marginVertical: 8 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateExerciseModal;

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
