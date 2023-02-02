import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';

const LocationContext = React.createContext();

const LocationProvider = ({children}) => {
  useEffect(() => {
    getStoredLocations();
  }, []);
  /*   useEffect(() => {
    storeLocations();
  });

  const storeLocations = async () => {
    try {
      const jsonValue = JSON.stringify([locations]);
      console.log(jsonValue);
      await AsyncStorage.setItem('locations', jsonValue);
    } catch (error) {
      console.log(error);
    }
  }; */

  const getStoredLocations = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('locations');
      if (jsonValue != null) {
        const storedLocations = JSON.parse(jsonValue);
        if (storedLocations.length > 0) {
          setLocations(storedLocations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [locations, setLocations] = useState([]);
  return (
    <LocationContext.Provider value={{locations, setLocations}}>
      {children}
    </LocationContext.Provider>
  );
};

export {LocationContext, LocationProvider};
