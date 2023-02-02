import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import LocationsScreen from './screens/LocationsScreen';
// import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LocationProvider} from './LocationContext';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Current weather"
            component={CurrentWeatherScreen}
          />
          <Stack.Screen name="Locations" component={LocationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

export default App;
