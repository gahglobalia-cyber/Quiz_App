import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomScreen from '../components/CustomScreen';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import fonts from '../utils/fonts';
import color from '../utils/color';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const userID = useSelector(state => state.users.currentUserId);
  const users = useSelector(state => state.users.user);
  const currentUser = users.find(users => users.id === userID);
  const levelButton = [
    {
      background: color.accentSecondary,
      Title: 'Easy',
    },
    {
      background: color.secondary,
      Title: 'Medium',
    },
    {
      background: color.accentTertiary,
      Title: 'Hard',
    },
  ];

  return (
    <CustomScreen
      header={'Home'}
      isProfile={true}
      isButton={true}
      onPress={() => navigation.navigate('Profile')}
      child={
        <View style={styles.contaioner}>
          <Text style={styles.Title}>
            Good Morning! {currentUser ? currentUser.name : null}
          </Text>
          <Text style={styles.SubTitle}>
            Choose your MCQ Quiz Diffculty Level
          </Text>
          <View style={styles.levelcontaioner}>
            {levelButton.map((item, index) => (
              <View key={index} style={styles.levelcontaioner}>
                <Text style={styles.leveltext}>{item.Title} Level</Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log(item.Title);
                    navigation.navigate('Quiz', {
                      Level: item.Title,
                    });
                  }}
                  style={[
                    styles.levelButton,
                    {
                      backgroundColor: item.background,
                    },
                  ]}>
                  <Text style={styles.levelButtonText}>{item.Title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  Title: {
    fontSize: scale(16),
    fontFamily: fonts[700],
    color: color.textPrimary,
    textAlign: 'center',
    marginTop: verticalScale(12),
  },
  contaioner: {
    paddingVertical: verticalScale(24),
  },
  SubTitle: {
    fontSize: scale(12),
    fontFamily: fonts[700],
    color: color.textPrimary,
    textAlign: 'center',
    marginTop: verticalScale(24),
  },
  levelcontaioner: {
    marginTop: verticalScale(24),
  },
  leveltext: {
    fontSize: scale(14),
    fontFamily: fonts[700],
    color: color.textPrimary,
  },
  levelButton: {
    borderTopLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    marginTop: verticalScale(6),
  },
  levelButtonText: {
    fontSize: scale(14),
    fontFamily: fonts[700],
    color: color.textSecondary,
  },
});
