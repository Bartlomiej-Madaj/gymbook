import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { useWindowDimensions } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';
import Input from '../UI/Input.jsx';
import NewButton from '../UI/NewButton.jsx';
import { useContext, useEffect, useState } from 'react';
import { TraningContext } from '../../store/traningContext.js';
import { checkFormIsValid } from '../../helpers/support-function.js';
import { ExerciseContext } from '../../store/exerciseContext.js';
import UpdateStatsModal from './UpdateStatsModal.jsx';
import EditStatsInput from './EditStatsInput.jsx';

const UpdateExerciseModal = ({
  isVisible,
  changeModalVisibility,
  exerciseId,
  trainingId = '',
}) => {
  const { height, width } = useWindowDimensions();
  const [exerciseName, setExerciseName] = useState('');
  const [newExercise, setNewExercise] = useState();
  const exerciseCtx = useContext(ExerciseContext);
  const trainingCtx = useContext(TraningContext);

  const exercises =
    trainingId &&
    trainingCtx.trainings.find((item) => item.id === trainingId).exercises;

  const { title: exerciseTitle, stats } = trainingId
    ? exercises.find((item) => item.id === exerciseId)
    : exerciseCtx.exercises?.find((item) => item.id === exerciseId);

  useEffect(() => {
    trainingId && exerciseCtx.addExercise(exercises);
  }, []);
  useEffect(() => {
    setExerciseName(exerciseTitle);
  }, [exerciseTitle]);

  useEffect(() => {
    setNewExercise({ title: exerciseName });
  }, [exerciseName]);

  function updateExerciseHandler() {
    if (!checkFormIsValid(exerciseName)) return;
    exerciseCtx.updateExercise(exerciseId, newExercise);
    trainingId && trainingCtx.updateTraining(trainingId);
    trainingId && exerciseCtx.clearExercises();
    changeModalVisibility();
  }

  function closeHandler() {
    changeModalVisibility();
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
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
