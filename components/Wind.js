import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import windarrow from '../assets/windarrow.png';

const Wind = props => {
  return (
    <View style={styles.container}>
      <Image
        source={windarrow}
        style={[
          styles.windImage,
          {
            transform: [{rotateZ: `${props.direction}deg`}],
          },
        ]}
      />
      <Text>{`${Math.round(props.speed)} m/s`}</Text>
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
  },

  windImage: {
    width: 25,
    height: 25,
  },
});

export default Wind;
