import { View, Text, Modal, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';
import Input from '../UI/Input.jsx';
import NewButton from '../UI/NewButton.jsx';
import { useContext, useEffect, useState } from 'react';
import { TraningContext } from '../../store/traningContext.js';
import StatInputs from './StatInputs.jsx';
import { ExerciseContext } from '../../store/exerciseContext.js';

const inputConfig = { maxLength: 3, keyboardType: 'numeric' };

const UpdateStatsModal = ({
  isVisible,
  changeModalVisibility,
  exerciseId,
  statsId,
  inputIsClean,
}) => {
  const { height, width } = useWindowDimensions();
  const [enteredValues, setEnteredValues] = useState();
  const [isClear, setIsClear] = useState(false);
  // const trainingCtx = useContext(TraningContext);
  const exerciseCtx = useContext(ExerciseContext)

  function editStatsHandler() {
    exerciseCtx.updateStats(exerciseId, statsId, enteredValues);
    setIsClear(true)
    changeModalVisibility();
  }

  function closeHandler() {
    changeModalVisibility();
  }

  function adjustEnteredValue(enteredValues) {
    setEnteredValues(enteredValues);
  }

  const widthFacotr = 0.95;
  const leftOffset = (width * (1 - widthFacotr)) / 2;

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
          <StatInputs adjustEnteredValue={adjustEnteredValue}  exerciseId={exerciseId} statsId={statsId} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <NewButton
              title="Edit"
              onPress={editStatsHandler}
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

export default UpdateStatsModal;

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
