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
import { useEffect } from 'react';
import { getCurrentTraining } from '../helpers/getCurrentTraining';
import { getCurrentExercise } from '../helpers/getCurrentExercise';

const StatsForm = () => {
  const headerHeight = useHeaderHeight();
  const navigate = useNavigation();
  const route = useRoute();

  const { exerciseId, trainingId } = route.params

  const {trainingTitle, trainingUnit } = getCurrentTraining(trainingId)
  const { title } = getCurrentExercise(exerciseId)
  
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
        <View style={{ marginTop: headerHeight }}>
          <Headline>{title}</Headline>
          <AddSetsPanel
            exerciseId={exerciseId}
            showExerciseFormScreen={showExerciseFormScreen}
          />
        </View>
        <List
          statsIcon={true}
          title="Your Exercise"
          exerciseName={title}
          trainingId = {trainingId}
          exerciseId = {exerciseId}
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
