import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';

import AllTrainings from './screens/AllTrainings';
import TrainingForm from './screens/TrainingForm';
import TrainingDetails from './screens/TrainingDetails';
import ExerciseForm from './screens/ExerciseForm';
import TrainingProvider from './store/traningContext';
import { init } from './util/database';
import StatsForm from './screens/StatsForm';
import { InputProvider } from './store/inputContext';

// import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
// AppRegistry.registerComponent("my-app", () => gestureHandlerRootHOC(Main));

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

function ShowDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AllTrainings"
        component={AllTrainings}
        options={{
          headerTitle: 'YOUR TRAININGS',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTransparent: true,
          title: 'All Trainings',
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={20}
              color={focused ? 'black' : 'white'}
            />
          ),
          ...commonProps,
        }}
      />
      <Drawer.Screen
        name="AddTraining"
        component={TrainingForm}
        options={{
          title: 'Add Training',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTransparent: true,
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="add"
              size={20}
              color={focused ? 'black' : 'white'}
            />
          ),
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

  // const [dbInitialized, setDbInitialized] = useState(false);

  // useEffect(() => {
  //   init()
  //   .then(() => {
  //     setDbInitialized(true)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   });
  // }, [])

  // if(!dbInitialized){
  //   return <AppLoading />
  // }

  if (!loaded) return null;
  return (
    <TrainingProvider>
      <InputProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AllTrainings">
            <Stack.Screen
              name="YourTrainings"
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
            <Stack.Screen
              name="ExerciseForm"
              component={ExerciseForm}
              options={{
                title: '',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="StatsForm"
              component={StatsForm}
              options={{
                title: '',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerTransparent: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </InputProvider>
    </TrainingProvider>
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
