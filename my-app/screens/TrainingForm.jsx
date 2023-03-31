import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from "@react-navigation/elements";

import { SIZES, FONTS, COLORS } from '../constants/index.js';
import Input from '../components/UI/Input.jsx';
import NewButton from '../components/UI/NewButton.jsx';
import { useState } from 'react';

const TrainingForm = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const [enteredTrainigTitle, setEnteredTrainingTitle] = useState('')
  const [enteredTrainigUnite, setEnteredTrainingUnite] = useState('')

  function goToExerciseForm(){
    navigation.navigate('ExerciseForm')
  }

  return (
    <ImageBackground style={styles.imageContainer} source={require('../assets/images/background.jpg')}>
    <View style={[styles.rootConatiner, {marginTop: headerHeight}]}>
      <Input setEnteredValueHandler={setEnteredTrainingTitle} value={enteredTrainigTitle} config={{autoCorrect: false, maxLength: 40 }} containerInputStyle={styles.input} labelTextStyle={styles.labelText}  placeholder="Your training title" label='Training Title' />
      <Input setEnteredValueHandler={setEnteredTrainingUnite} value={enteredTrainigUnite} config={{autoCorrect: false, maxLength: 3 }} containerInputStyle={styles.input} labelTextStyle={styles.labelText} placeholder="Put your unite" label='Unite'  />
      <NewButton title='Add exercise' onPress={goToExerciseForm} rootContainerStyle={{width: '50%'}} />
    </View>
    </ImageBackground>
  );
};

export default TrainingForm;

const styles = StyleSheet.create({
  rootConatiner: {
    // marginTop: 16,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: '#ffffff7e',
    marginBottom: 16 ,
    borderColor: COLORS.secondary,
    borderRadius: 8,
  },
  labelText: {
    color: 'white'
  }
});
