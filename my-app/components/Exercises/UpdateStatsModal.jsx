import { View, Modal, StyleSheet } from 'react-native';

import NewButton from '../UI/NewButton.jsx';
import { useContext, useState } from 'react';
import StatInputs from './StatInputs.jsx';
import { ExerciseContext } from '../../store/exerciseContext.js';
import { updateStat } from '../../util/db/statHelper.js';
import { getOffset } from '../../helpers/style/getOffset.js';

const UpdateStatsModal = ({
  isVisible,
  changeModalVisibility,
  exerciseId,
  statsId,
}) => {
  const [enteredValues, setEnteredValues] = useState();
  const [isClean, setIsClean] = useState(false);
  const exerciseCtx = useContext(ExerciseContext);

  async function editStatsHandler() {
    await updateStat(enteredValues, statsId);
    exerciseCtx.updateStats(exerciseId, statsId, enteredValues);
    setIsClean(true);
    changeModalVisibility();
  }

  function closeHandler() {
    setIsClean(true);
    changeModalVisibility();
  }

  function adjustEnteredValue(enteredValues) {
    setEnteredValues(enteredValues);
  }

  const [leftOffset, widthComponent] = getOffset(0.95);

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
            { left: leftOffset, width: widthComponent },
          ]}
        >
          <StatInputs
            adjustEnteredValue={adjustEnteredValue}
            exerciseId={exerciseId}
            statsId={statsId}
            isClean={isClean}
            changeIsClean={setIsClean}
          />
          <View style={styles.buttonContainer}>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
