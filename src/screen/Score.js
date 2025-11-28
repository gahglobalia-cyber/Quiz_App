import {View, Text, StyleSheet} from 'react-native';
import React, {version} from 'react';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import CustomScreen from '../components/CustomScreen';
import {scale, verticalScale} from 'react-native-size-matters';
import fonts from '../utils/fonts';
import color from '../utils/color';
import CustomButton from '../components/CustomButton';
import {useSelector} from 'react-redux';

const Score = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {score, wrong, skip, Level} = route.params;
  const GameScore = score;

  const PressHome = () => {
    // navigation.replace('Home');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  const Users = useSelector(state => state.users.user);
  const currentUserId = useSelector(state => state.users.currentUserId);
  const findCurrentUser = Users.find(Users => Users.id === currentUserId);
  const Useractivity = findCurrentUser.activity;
  const levelScore = Useractivity[Level];
  console.log('-------', levelScore);

  return (
    <CustomScreen
      header={'Completed Quiz'}
      child={
        <>
          <View style={styles.MainContaioner}>
            <Text style={styles.LevelText}>{Level} Level</Text>
            <Text style={[styles.LevelText, {color: color.textPrimary}]}>
              Total {Level} Play:{levelScore.totalGame}
            </Text>
            <Text style={[styles.LevelText, {color: color.textPrimary}]}>
              Total {Level} Score:{levelScore.totalScore}
            </Text>
            <Text style={styles.LevelText}>Correct Answers:{score}</Text>
            <Text style={[styles.LevelText, {color: color.accentTertiary}]}>
              Wrong Answers:{wrong}
            </Text>
            <Text style={styles.LevelText}>Skipped:{skip}</Text>
            <Text style={styles.LevelText}>This Game Score:{GameScore}</Text>
          </View>
          <CustomButton Title={'Go To Home'} onPress={PressHome} />
        </>
      }
    />
  );
};

export default Score;

const styles = StyleSheet.create({
  MainContaioner: {
    alignItems: 'center',
    paddingVertical: verticalScale(32),
    rowGap: scale(24),
  },
  LevelText: {
    fontSize: scale(18),
    fontFamily: fonts[900],
    color: color.accentSecondary,
  },
});
