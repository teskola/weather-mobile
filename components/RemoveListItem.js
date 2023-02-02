import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RemoveListItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <Text style={styles.text}>{props.name}</Text>
        <View style={styles.remove}>
          <Text onPress={() => props.onRemove(props.timestamp, props.name)}>
            remove
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
  },

  text: {
    fontSize: 18,
  },

  remove: {
    alignSelf: 'flex-end',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  location: {
    fontSize: 18,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default RemoveListItem;
