import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';

import AllTrainings from './screens/AllTrainings';
import TrainingForm from './screens/TrainingForm';
import TrainingDetails from './screens/TrainingDetails';
import ExerciseForm from './screens/ExerciseForm';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const commonProps = {
  drawerActiveTintColor: 'black',
  drawerInactiveTintColor: 'white',
  drawerLabelStyle: { fontSize: 16 },
  drawerContentStyle: { marginTop: 40 },
  drawerStyle: {
    backgroundColor: 'grey',
    opacity: 0.9,
  },
};

function ShowFormsScreen() {
  return (
    <Stack.Navigator initialRouteName="TrainingForm">
      <Stack.Screen
        name="TrainingForm"
        component={TrainingForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseForm"
        component={ExerciseForm}
        options={{
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ShowDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AllTrainings"
        component={AllTrainings}
        options={{
          headerTitle: 'YOUR TRENINGS',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTransparent: true,
          title: 'All Trainings',
          ...commonProps,
        }}
      />
      <Drawer.Screen
        name="AddTraining"
        component={TrainingForm}
        options={{
          title: 'Add Training',
          ...commonProps,
        }}
      />
    </Drawer.Navigator>
  );
}

function App() {
  const [loaded] = useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf'),
  });

  if (!loaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AllTrainings">
        <Stack.Screen
          name="YourTrenings"
          component={ShowDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrainingDetails"
          component={TrainingDetails}
          options={{
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTransparent: true,
          }}
        />
        <Stack.Screen name="ExerciseForm" component={ExerciseForm} options={{title: 'New Exercice '}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    flex: 1,
    backgroundColor: '#ffd0c0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
