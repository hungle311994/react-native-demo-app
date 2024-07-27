import {StyleSheet, View} from 'react-native';
import React from 'react';

const HSpace = () => {
  return <View style={styles.spaceStyle} />;
};

export default HSpace;

const styles = StyleSheet.create({
  spaceStyle: {
    marginVertical: 4,
  },
});
