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
import { useContext, useState } from 'react';
import { Training } from '../models/trainingModel.js';
import { TraningContext } from '../store/traningContext.js';
import { checkFormIsValid } from '../helpers/support-function.js';
import { insertTraining } from '../util/database.js';

const TrainingForm = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const [enteredTrainigTitle, setEnteredTrainingTitle] = useState('');
  const [enteredTrainigUnit, setEnteredTrainingUnit] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [messageOfInvalidInput, setMessageOfInvalidInput] = useState('');
  const trainingCtx = useContext(TraningContext);

  async function goToExerciseForm() {
    if (!checkFormIsValid(enteredTrainigTitle, enteredTrainigUnit)) {
      setIsValid(false);
      return setMessageOfInvalidInput('Title and unit cannot be empty!');
    }
    const training = new Training(enteredTrainigTitle, enteredTrainigUnit);
    const resulte = await insertTraining(training)
    // console.log(resulte)
    trainingCtx.addTraining(training);
    setEnteredTrainingTitle('');
    setEnteredTrainingUnit('');
    navigation.navigate('ExerciseForm', { trainingId: resulte.insertId });
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="cover"
      style={styles.imageContainer}
      imageStyle={{ opacity: 0.65 }}
    >
      <View style={[styles.rootConatiner, { marginTop: headerHeight }]}>
        {!isValid ? (
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: 'red',
              textAlign: 'center',
            }}
          >
            {messageOfInvalidInput}
          </Text>
        ) : (
          <></>
        )}
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
          setEnteredValueHandler={setEnteredTrainingUnit}
          value={enteredTrainigUnit}
          config={{ autoCorrect: false, maxLength: 3, autoCapitalize: 'none' }}
          containerInputStyle={[styles.input]}
          labelTextStyle={styles.labelText}
          placeholder="Put your unit"
          label="Unit"
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
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#606060',
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
    borderColor: 'red',
  },
});
