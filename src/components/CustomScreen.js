import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {version} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginStyle from '../style/GlobleStyle';
import color from '../utils/color';
import {verticalScale} from 'react-native-size-matters';

const CustomScreen = ({header, child, isButton, isProfile, onPress}) => {
  return (
    <SafeAreaView style={LoginStyle.MainContaioner}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={LoginStyle.ScrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={LoginStyle.HeaderContaioner}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
                marginTop: verticalScale(18),
              }}>
              {isButton && (
                <TouchableOpacity
                  onPress={onPress}
                  activeOpacity={0.8}
                  style={LoginStyle.button}>
                  <Image
                    tintColor={color.background}
                    source={
                      isProfile
                        ? require('../assets/images/user.png')
                        : require('../assets/images/Back.png')
                    }
                    style={LoginStyle.icon}
                  />
                </TouchableOpacity>
              )}

              <View style={{flex: 1}}>
                <Text style={LoginStyle.HeaderText}>{header}</Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <View style={LoginStyle.FormContaioner}>
            <View style={LoginStyle.Form}>{child}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomScreen;
