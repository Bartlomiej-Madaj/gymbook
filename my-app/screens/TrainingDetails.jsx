import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { DUMMY_TRAININGS, SIZES, FONTS, COLORS } from '../constants/index.js';
import ExerciseDetails from '../components/Exercises/ExerciseDetails.jsx';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TraningContext } from '../store/traningContext.js';
import UpdateExerciseModal from '../components/Exercises/UpdateExerciseModal.jsx';
import { ExerciseContext } from '../store/exerciseContext.js';
import NewButton from '../components/UI/NewButton.jsx';
import * as SplashScreen from 'expo-splash-screen';
import { Exercise, ExerciseStat } from '../models/exerciseModel.js';
import { selectAllExercises, selectAllStats } from '../util/database.js';

SplashScreen.preventAutoHideAsync();

const TrainingDetails = ({ route, navigation }) => {
  const headerHeight = useHeaderHeight();
  const trainingCtx = useContext(TraningContext);
  const [exerciseModalIsvisible, setExercisleModalIsvisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [exerciseId, setExerciseId] = useState('');
  const [exercises, setExercises] = useState([]);

  // const trainings = [...trainingCtx.trainings, ...DUMMY_TRAININGS];

  const {trainingId, trainingUnit} = route.params;
  // useEffect(() => {
  //   trainingCtx.adjustTrainingId(trainingId);
  // }, [trainingId]);
  // const trainingDay = trainings.find((item) => item.id === trainingId);
  // const { exercises } = trainingDay;

  // let exercisesA = [];
  useEffect(() => {
    async function getExercises() {
      const exercises = await selectAllExercises(trainingId);
      exercises.map(async (exercise) => {
        const exerciseFromDb = new Exercise(exercise.title, exercise.id);
        const stats = await selectAllStats(exercise.id);
        stats.map((stat) => {
          const statsFromDb = new ExerciseStat(
            stat.series,
            stat.rep,
            stat.weight,
            stat.id
          );
          exerciseFromDb.addStats(statsFromDb);
        });
        setExercises((currentExercises) => [...currentExercises,
          exerciseFromDb,
        ]);
      });
      setIsLoaded(true);
    }
    getExercises();
  }, [trainingId]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: trainingDay.trainingTitle.toUpperCase(),
  //   });
  // }, [navigation, trainingDay.trainingTitle]);

  function showTraining(exerciseId) {
    setExerciseId(exerciseId);
    setExercisleModalIsvisible(true);
  }
  function deleteTraining() {
    trainingCtx.deleteTraining(trainingId);
    navigation.navigate('AllTrainings');
  }

  useEffect(() => {
    const hideLoading = async () => {
      if (isLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideLoading();
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
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
          {exercises.map((exercise) => (
            <ExerciseDetails
              key={exercise.id}
              exercise={exercise}
              unit={trainingUnit}
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
