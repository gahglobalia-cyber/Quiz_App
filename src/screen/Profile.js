import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import CustomScreen from '../components/CustomScreen';
import color from '../utils/color';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import fonts from '../utils/fonts';
import CustomButton from '../components/CustomButton';
import {setCurrentUser} from '../redux/Slice';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const currentUserId = useSelector(state => state.users.currentUserId);
  const users = useSelector(state => state.users.user);
  const currentUser = users.find(users => users.id === currentUserId);
  const levelData = currentUser ? currentUser.activity : null;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const PressLogout = () => {
    dispatch(setCurrentUser(null));
    navigation.replace('Login');
  };

  const PressEdit = () => {
    navigation.replace('SignUp', {
      isEdit: true,
    });
  };

  return (
    <CustomScreen
      header={'Profile'}
      isButton={true}
      onPress={() => navigation.goBack()}
      child={
        <View>
          {/* Profile Info */}
          <View style={styles.ProfileContaioner}>
            <Text style={styles.Text}>
              Name: {currentUser ? currentUser.name : ''}
            </Text>
            <Text style={styles.Text}>
              Email: {currentUser ? currentUser.email : ''}
            </Text>
            <Text style={styles.Text}>
              Gender: {currentUser ? currentUser.selected : ''}
            </Text>
            <Text style={styles.Text}>
              Date of Birth: {currentUser ? currentUser.formatedDate : ''}
            </Text>
          </View>

          {/* Edit Profile Button */}
          <CustomButton
            Title={'Edit Profile'}
            buttonStyle={{
              backgroundColor: color.secondary,
              marginBottom: verticalScale(12),
            }}
            onPress={PressEdit}
          />

          {/* Table Section */}
          {currentUser ? (
            <View style={styles.TableContaioner}>
              <View style={styles.TableRowContaioner}>
                <Text
                  style={[
                    styles.TableTextHeader,
                    {borderTopLeftRadius: scale(8)},
                  ]}>
                  Level
                </Text>
                <Text style={styles.TableTextHeader}>Play</Text>
                <Text
                  style={[
                    styles.TableTextHeader,
                    {borderTopRightRadius: scale(8)},
                  ]}>
                  Score
                </Text>
              </View>

              {Object.entries(levelData).map(([level, data], index, arr) => (
                <View key={level} style={styles.TableRowContaioner}>
                  <Text
                    style={[
                      styles.TableColumText,
                      index === arr.length - 1 && {
                        borderBottomLeftRadius: scale(8),
                      },
                    ]}>
                    {level}
                  </Text>
                  <Text style={styles.TableColumText}>{data.totalGame}</Text>
                  <Text
                    style={[
                      styles.TableColumText,
                      index === arr.length - 1 && {
                        borderBottomRightRadius: scale(8),
                      },
                    ]}>
                    {data.totalScore}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Logout Button */}
          <CustomButton
            Title={'Log Out'}
            onPress={PressLogout}
            buttonStyle={{marginVertical: verticalScale(16)}}
          />
        </View>
      }
    />
  );
};

export default Profile;

const styles = StyleSheet.create({
  ProfileContaioner: {
    backgroundColor: color.lightWhite,
    borderRadius: scale(8),
    marginVertical: verticalScale(16),
    padding: moderateScale(20),
    rowGap: scale(12),
    elevation: 4,
    shadowColor: '#a8939320',
  },
  Text: {
    fontSize: scale(14),
    fontFamily: fonts[700],
    color: color.textPrimary,
  },
  TableContaioner: {
    borderRadius: scale(8),
  },
  TableRowContaioner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TableTextHeader: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: color.secondary,
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: color.textSecondary,
    fontSize: scale(13),
    fontFamily: fonts[700],
    color: color.textSecondary,
  },
  TableColumText: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: color.primary,
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: color.textSecondary,
    fontSize: scale(12),
    fontFamily: fonts[500],
    color: color.textSecondary,
  },
});
