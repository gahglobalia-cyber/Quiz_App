import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from '../style/GlobleStyle';

const RadioButton = ({setSelected, selected}) => {
  const gender = ['Male', 'Female', 'Other'];

  return (
    <View style={styles.RadioContaioner}>
      {gender.map((item, index) => (
        <TouchableOpacity
          onPress={() => setSelected(item)}
          key={index}
          style={styles.RadioContaioner}>
          <View style={styles.RadioButton}>
            {selected === item && <View style={styles.RadioInsideButton} />}
          </View>
          <Text style={styles.RadioText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
