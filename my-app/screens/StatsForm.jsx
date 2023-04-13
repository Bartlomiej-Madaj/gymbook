import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import AddSetsPanel from '../components/Exercises/AddSetsPanel';
import List from '../components/Exercises/List';
import Headline from '../components/Text/Headline';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { TraningContext } from '../store/traningContext';
import { compareItemsById } from '../helpers/support-function';
import { ExerciseContext } from '../store/exerciseContext';
import { selectAllExercises, selectAllTrainings } from '../util/database';

const StatsForm = () => {
  const headerHeight = useHeaderHeight();
  const navigate = useNavigation();
  const route = useRoute();
  const trainingCtx = useContext(TraningContext);
  const exerciseCtx = useContext(ExerciseContext);
  // const [currentExercise, setCurrentExercise] = useState({})
  // const [currentTraining, setCurrentTraining] = useState({})

  const { exerciseId, trainingId } = route.params

  const currentTraining = trainingCtx.trainings.find(training => compareItemsById(training.id, trainingId))
  const currentExercise = exerciseCtx.exercises.find(exercise => compareItemsById(exercise.id, exerciseId))

  // useEffect(()=>{
  //   async function getExercises() {
  //     const exercises = await selectAllExercises(trainingId);
  //     const trainings = await selectAllTrainings();
  //     const currentTraining = trainings.find(item => item.id === trainingId)
  //     const currentExercise = exercises.find(item => item.id === exerciseId)
  //     // console.log(currentTraining)
  //     setCurrentTraining(currentTraining)
  //     setCurrentExercise(currentExercise)
  //   }
  //   getExercises()
  // }, [exerciseId])

  const {trainingTitle, trainingUnit } = currentTraining
  // const {title, unit } = currentTraining

  useEffect(() => {
    navigate.setOptions({
      title: trainingTitle.toUpperCase()
      // title: title?.toUpperCase()
    })
  },[])

  function showExerciseFormScreen(){
    navigate.navigate('ExerciseForm', {trainingId: trainingId, toRenderList: Math.random() })
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={false}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        resizeMode="cover"
        style={styles.imageContainer}
        imageStyle={{ opacity: 0.65 }}
      >
        <View style={[styles.container, { marginTop: headerHeight }]}>
          <Headline>{currentExercise.title}</Headline>
          <AddSetsPanel
            exerciseId={exerciseId}
            showExerciseFormScreen={showExerciseFormScreen}
          />
        </View>
        <List
          statsIcon={true}
          title="Your Exercise"
          exerciseName={currentExercise.title}
          trainingId = {trainingId}
          exerciseId = {exerciseId}
          // data={currentExercise}
          // unit={unit}
          unit={trainingUnit}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default StatsForm;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#606060',
  },
});
