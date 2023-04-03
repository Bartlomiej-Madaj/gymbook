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
import { useContext, useEffect } from 'react';
import { TraningContext } from '../store/traningContext';
import { compareItemsById } from '../helpers/support-function';

const StatsForm = () => {
  const headerHeight = useHeaderHeight();
  const navigate = useNavigation();
  const route = useRoute();
  const trainingCtx = useContext(TraningContext);

  const { exerciseId, trainingId } = route.params

  const currentTraining = trainingCtx.training.find(training => compareItemsById(training.id, trainingId))
  const currentExercise = trainingCtx.exercises.find(exercise => compareItemsById(exercise.id, exerciseId))

  const {trainingTitle, trainingUnit } = currentTraining

  useEffect(() => {
    navigate.setOptions({
      title: trainingTitle.toUpperCase()
    })
  },[])


  function showExerciseFormScreen(){
    navigate.navigate('ExerciseForm', {trainingId: trainingId })
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
          isIcon={true}
          title="Your Exercise"
          exerciseName={currentExercise.title}
          data={currentExercise}
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
