import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import color from '../utils/color';
import fonts from '../utils/fonts';

const CustomButton = ({buttonStyle, onPress, Title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.ButtonContaioner, buttonStyle]}>
      <Text style={styles.ButtonText}>{Title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  ButtonContaioner: {
    borderRadius: scale(8),
    backgroundColor: color.primary,
    paddingVertical: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: scale(16),
    fontFamily: fonts[700],
    color: color.background,
  },
});
