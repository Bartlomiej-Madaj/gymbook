
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import AllTrainings from './screens/AllTrainings';
import TrainingForm from './screens/TrainingForm';
import TrainingDetails from './screens/TrainingDetails';

const Stack = createNativeStackNavigator();

function App() {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AllTraububgs'>
        <Stack.Screen name="AllTrainings" component={AllTrainings}  />
        <Stack.Screen name="TrainingDetails" component={TrainingDetails} />
        <Stack.Screen name="TrainingForm" component={TrainingForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ea3a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
