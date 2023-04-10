import { View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { DUMMY_TRAININGS, SIZES, FONTS, COLORS } from '../constants/index.js';
import ExerciseDetails from '../components/Exercises/ExerciseDetails.jsx';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TraningContext } from '../store/traningContext.js';
import UpdateExerciseModal from '../components/Exercises/UpdateExerciseModal.jsx';
import { ExerciseContext } from '../store/exerciseContext.js';
import NewButton from '../components/UI/NewButton.jsx';

const TrainingDetails = ({ route, navigation }) => {
  const headerHeight = useHeaderHeight();
  const trainingCtx = useContext(TraningContext);
  const [exerciseModalIsvisible, setExercisleModalIsvisible] = useState(false);
  const [exerciseId, setExerciseId] = useState('');

  const trainings = [...trainingCtx.trainings, ...DUMMY_TRAININGS];

  const trainingId = route.params.trainingId;
  useEffect(() => {
    trainingCtx.adjustTrainingId(trainingId);
  }, [trainingId]);
  const trainingDay = trainings.find((item) => item.id === trainingId);
  const { exercises } = trainingDay;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: trainingDay.trainingTitle.toUpperCase(),
    });
  }, [navigation, trainingDay.trainingTitle]);

  function showTraining(exerciseId) {
    setExerciseId(exerciseId);
    setExercisleModalIsvisible(true);
  }
  function deleteTraining() {
    trainingCtx.deleteTraining(trainingId);
    navigation.navigate('AllTrainings');
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="cover"
      style={styles.ImageContainer}
      imageStyle={{ opacity: 0.65 }}
    >
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <ScrollView style={styles.scrollContainer}>
          {exercises?.map((exercise) => (
            <ExerciseDetails
              key={exercise.id}
              exercise={exercise}
              unit={trainingDay.trainingUnit}
              onPress={showTraining.bind(this, exercise.id)}
            />
          ))}
        </ScrollView>
      </View>
      <NewButton
        title="Delete Training"
        rootContainerStyle={styles.buttonContainer}
        onPress={deleteTraining}
      />
      {exerciseId && (
        <UpdateExerciseModal
          isVisible={exerciseModalIsvisible}
          changeModalVisibility={() => setExercisleModalIsvisible(false)}
          exerciseId={exerciseId}
          trainingId={trainingId}
        />
      )}
    </ImageBackground>
  );
};

export default TrainingDetails;

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    backgroundColor: '#606060',
  },
  container: {
    flex: 0.9,
    width: '100%',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    width: '100%',
    height: 700,
  },
  buttonContainer: {
    width: '50%',
    marginTop: 16,
  },
});
