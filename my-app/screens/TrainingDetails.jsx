import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import ExerciseDetails from '../components/Exercises/ExerciseDetails.jsx';
import { useEffect, useState } from 'react';
import NewButton from '../components/UI/NewButton.jsx';
import * as SplashScreen from 'expo-splash-screen';
import {
  deleteTraining,
} from '../util/db/trainingHelpers.js';
import { getExercises } from '../helpers/getAllExercises.js';

SplashScreen.preventAutoHideAsync();

const TrainingDetails = ({ route, navigation }) => {
  const headerHeight = useHeaderHeight();
  const [isLoaded, setIsLoaded] = useState(false);
  const [exercises, setExercises] = useState([]);

  const { trainingId, trainingUnit } = route.params;

  useEffect(() => {
    getExercises(trainingId, setExercises);
    setIsLoaded(true);
  }, [trainingId]);

  async function removeTraining() {
    await deleteTraining(trainingId);
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
            />
          ))}
        </ScrollView>
      </View>
      <NewButton
        title="Delete Training"
        rootContainerStyle={styles.buttonContainer}
        onPress={removeTraining}
      />
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
