import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Temperature = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{`${Math.round(props.temp)} °C`}</Text>
      <Text style={styles.feelsLike}>{`${Math.round(
        props.feelsLike,
      )} °C`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 10,
  },

  temp: {
    fontSize: 24,
  },

  feelsLike: {
    fontSize: 14,
  },
});

export default Temperature;
