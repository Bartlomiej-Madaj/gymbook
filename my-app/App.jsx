import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, ActivityIndicator } from 'react-native';

import AllTrainings from './screens/AllTrainings';
import TrainingForm from './screens/TrainingForm';
import TrainingDetails from './screens/TrainingDetails';
import ExerciseForm from './screens/ExerciseForm';
import TrainingProvider from './store/traningContext';
import StatsForm from './screens/StatsForm';
import ExerciseProvider from './store/exerciseContext';
import { init } from './util/db/initDB';

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

SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded] = useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf'),
  });
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then((result) => {
        setDbInitialized(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const hideLoading = async () => {
      if (dbInitialized) {
        await SplashScreen.hideAsync();
      }
    };
    hideLoading();
  }, [dbInitialized]);

  if (!dbInitialized) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#ff5100" />
      </View>
    );
  }

  if (!loaded) return null;
  return (
    <ExerciseProvider>
      <TrainingProvider>
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
      </TrainingProvider>
    </ExerciseProvider>
  );
}

export default App;
