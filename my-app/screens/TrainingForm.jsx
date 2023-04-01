import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';

import { SIZES, FONTS, COLORS } from '../constants/index.js';
import Input from '../components/UI/Input.jsx';
import NewButton from '../components/UI/NewButton.jsx';
import { useState } from 'react';
import { Training } from '../models/trainingModel.js';

const TrainingForm = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const [enteredTrainigTitle, setEnteredTrainingTitle] = useState('');
  const [enteredTrainigUnite, setEnteredTrainingUnite] = useState('');
  const [isValid, setIsValid] = useState(true)
  const [messageOfInvalidInput, setMessageOfInvalidInput] = useState('')
  // const [newTraining, setNewTraining] = useState()

  // if(!enteredTrainigTitle || !enteredTrainigUnite) {
  //   setIsValid(false)
  // }
  function checkFormIsValid(...params){
    return !params.includes('')
  }

  // let messageOfInvalidInput;
  function goToExerciseForm() {
    if(!checkFormIsValid(enteredTrainigTitle, enteredTrainigUnite)){
      setIsValid(false)
     return setMessageOfInvalidInput('Title and unite cannot be empty!')
    }
    const training = new Training(enteredTrainigTitle, enteredTrainigUnite)
    // setNewTraining(training)
    navigation.navigate('ExerciseForm', {newTraining: training});
    // console.log(newTraining)
  }

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={require('../assets/images/background.jpg')}
    >
      <View style={[styles.rootConatiner, { marginTop: headerHeight }]}>
      {!isValid ? <Text style={{fontFamily: FONTS.medium, fontSize: SIZES.medium, color: 'red', textAlign: 'center'}}>{messageOfInvalidInput}</Text> : <></> }
        <Input
          setEnteredValueHandler={setEnteredTrainingTitle}
          value={enteredTrainigTitle}
          config={{ autoCorrect: false, maxLength: 40 }}
          containerInputStyle={styles.input}
          labelTextStyle={styles.labelText}
          placeholder="Your training title"
          label="Training Title"
        />
        <Input
          setEnteredValueHandler={setEnteredTrainingUnite}
          value={enteredTrainigUnite}
          config={{ autoCorrect: false, maxLength: 3 }}
          containerInputStyle={[styles.input]}
          labelTextStyle={styles.labelText}
          placeholder="Put your unite"
          label="Unite"
        />
        <NewButton
          title="Add exercises"
          onPress={goToExerciseForm}
          rootContainerStyle={{ width: '50%' }}
        />
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
    marginBottom: 16,
    borderColor: COLORS.secondary,
    borderRadius: 8,
  },
  labelText: {
    color: 'white',
  },
  invalidInput: {
    borderColor: 'red'
  }
});
