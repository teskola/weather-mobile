import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import country_codes from '../country_codes.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocationContext} from '../LocationContext';
import RemoveListItem from '../components/RemoveListItem';

const LocationsScreen = () => {
  const API_KEY = 'db665b34ad76791b17f190401a72755f';
  const {locations, setLocations} = useContext(LocationContext);
  const [locationInput, onChangeLocation] = useState('');
  const [countryInput, setCountry] = useState('any');

  useEffect(() => {
    storeLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  const storeLocations = async () => {
    try {
      const jsonValue = JSON.stringify(locations);
      await AsyncStorage.setItem('locations', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    let url = 'https://api.openweathermap.org/geo/1.0/direct?q=';
    let locationName;
    if (locationInput.length > 0) {
      ToastAndroid.show('Please wait.', ToastAndroid.SHORT);
      locationName = locationInput;
      onChangeLocation('');
      if (countryInput !== 'any') {
        locationName += ',' + countryInput;
        setCountry('any');
      }
      url += locationName + '&appid=' + API_KEY;
      const [lat, lon] = await findGeoCode(url);
      if (lat && lon) {
        const location = {
          timestamp: Date.now(),
          name: locationName,
          lat: lat,
          lon: lon,
        };
        addLocation(location);
        ToastAndroid.show(`${locationName} added.`, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(`${locationName} not found.`, ToastAndroid.SHORT);
      }
    }
  };

  const findGeoCode = async url => {
    try {
      const response = await fetch(url);
      console.log(`${response.status} ${url}`);
      const data = await response.json();
      if (data.length > 0) {
        return [data[0].lat, data[0].lon];
      } else {
        return [null, null];
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addLocation = location => {
    setLocations(current => [...current, location]);
  };

  const removeLocation = (timestamp, name) => {
    setLocations(current =>
      current.filter(location => location.timestamp !== timestamp),
    );
    ToastAndroid.show(`${name} removed.`, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addLocation}>
        <Text>Enter city/location</Text>
        <TextInput
          placeholder="City name"
          style={styles.input}
          onChangeText={onChangeLocation}
          value={locationInput}
        />
        <Text>Select country:</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={countryInput}
            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
            <Picker.Item label="any" value="any" />
            {country_codes.map(country => (
              <Picker.Item
                key={country.code}
                label={country.name}
                value={country.code}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.button}>
          <Button title="Add" onPress={() => submitHandler()} />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={locations}
          renderItem={({item}) => (
            <RemoveListItem
              name={item.name}
              timestamp={item.timestamp}
              onRemove={removeLocation}
            />
          )}
          keyExtractor={item => item.timestamp}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addLocation: {
    margin: 8,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  input: {
    backgroundColor: 'white',

    borderRadius: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default LocationsScreen;
