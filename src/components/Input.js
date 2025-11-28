import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import color from '../utils/color';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const Input = (
  {value, onChangeText, source, placeholder, secureTextEntry, onPress},
  ref,
) => {
  return (
    <View style={styles.inputContaioner}>
      <TextInput
        placeholderTextColor={color.background}
        style={styles.Input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        ref={ref}
        secureTextEntry={secureTextEntry}
        numberOfLines={1}
        maxLength={40}
      />

      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.icon}
          tintColor={color.background}
          source={source}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContaioner: {
    backgroundColor: color.secondary,
    borderTopLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  Input: {
    width: '90%',
    color: color.textSecondary,
  },
  icon: {
    height: verticalScale(20),
    width: scale(20),
  },
});
