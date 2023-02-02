import {useContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
// import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  PermissionsAndroid,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';

import {LocationContext} from '../LocationContext';
import WeatherListItem from '../components/WeatherListItem';

const CurrentWeatherScreen = ({navigation}) => {
  const {locations} = useContext(LocationContext);
  const [position, setPosition] = useState('');
  const [locationPermissionGranted, setLocationPermission] = useState(false);
  useEffect(() => {
    checkAndRequestLocationPermission();
    if (locationPermissionGranted) {
      Geolocation.getCurrentPosition(
        pos => setPosition(JSON.stringify(pos)),
        err => setPosition(JSON.stringify(err)),
      );
    }
  });

  /*
      Checks and request permission for geolocation. Sets locationPermissionGranted
       */

  async function checkAndRequestLocationPermission() {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ];
    const fine_location_granted = await PermissionsAndroid.check(
      permissions[0],
    );
    const coarse_location_granted = await PermissionsAndroid.check(
      permissions[1],
    );
    if (!(coarse_location_granted && fine_location_granted)) {
      const status = await PermissionsAndroid.requestMultiple(permissions);
      if (
        status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        status[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] !==
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        setLocationPermission(false);
      } else {
        setLocationPermission(true);
      }
    } else {
      setLocationPermission(true);
    }
  }

  let content;
  if (locationPermissionGranted) {
    if (position.length === 0) {
      content = (
        <View style={styles.text}>
          <Text>No GPS data</Text>
        </View>
      );
    } else {
      const data = JSON.parse(position);
      content = (
        <WeatherListItem
          lat={data.coords.latitude}
          lon={data.coords.longitude}
        />
      );
    }
  } else {
    content = (
      <View style={styles.text}>
        <Text>No GPS permission</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.child}>{content}</View>
      <FlatList
        data={locations}
        renderItem={({item}) => (
          <WeatherListItem lat={item.lat} lon={item.lon} />
        )}
        keyExtractor={location => location.timestamp}
      />
      <Button
        title="Add/Remove location"
        onPress={() => navigation.navigate('Locations')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
    height: 75,
    borderBottomWidth: 5,
    borderBottomColor: 'gray',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderBottomWidth: 5,
    borderBottomColor: 'gray',
  },
});

export default CurrentWeatherScreen;
