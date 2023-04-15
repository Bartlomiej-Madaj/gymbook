import { View, Modal, StyleSheet, FlatList } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { COLORS } from '../../constants/index.js';
import Input from '../UI/Input.jsx';
import NewButton from '../UI/NewButton.jsx';
import { checkFormIsValid } from '../../helpers/support-function.js';
import { ExerciseContext } from '../../store/exerciseContext.js';
import EditStatsInput from './EditStatsInput.jsx';
import { updateExercise } from '../../util/db/exerciseHelpers.js';
import { getCurrentExercise } from '../../helpers/getCurrentExercise.js';
import { getOffset } from '../../helpers/style/getOffset.js';

const UpdateExerciseModal = ({
  isVisible,
  changeModalVisibility,
  exerciseId,
  trainingId = '',
}) => {
  const [exerciseName, setExerciseName] = useState('');
  const [newExercise, setNewExercise] = useState();
  const exerciseCtx = useContext(ExerciseContext);

  const { title, stats } = getCurrentExercise(exerciseId);

  useEffect(() => {
    setExerciseName(title);
  }, [title]);

  useEffect(() => {
    setNewExercise({ title: exerciseName });
  }, [exerciseName]);

  async function updateExerciseHandler() {
    if (!checkFormIsValid(exerciseName)) return;
    await updateExercise(exerciseName, exerciseId);
    exerciseCtx.updateExercise(exerciseId, newExercise);
    trainingId && exerciseCtx.clearExercises();
    changeModalVisibility();
  }

  function closeHandler() {
    changeModalVisibility();
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
          <Input
            setEnteredValueHandler={setExerciseName}
            value={exerciseName}
            containerInputStyle={styles.inputBox}
            labelTextStyle={styles.labelText}
            label="Exercise name"
            placeholder="Put some name"
            config={{ maxLength: 30, autoCapitalize: 'none' }}
          />
          <View>
            <FlatList
              data={stats}
              renderItem={({ item }) => (
                <EditStatsInput exerciseId={exerciseId} statsId={item.id} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.buttonContainer}>
            <NewButton
              title="Edit"
              onPress={updateExerciseHandler}
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
  inputBox: {
    backgroundColor: '#ffffff7e',
    borderColor: COLORS.secondary,
    borderRadius: 8,
  },
  labelText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
