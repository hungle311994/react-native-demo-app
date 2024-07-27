/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';

const Devider = ({height, color}) => {
  return (
    <View
      style={{
        height: height ?? 1,
        width: '100%',
        backgroundColor: color ? color : '#166D77',
      }}
    />
  );
};

export default Devider;
