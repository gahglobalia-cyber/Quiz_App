import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style/GlobleStyle';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomScreen from '../components/CustomScreen';
import {verticalScale} from 'react-native-size-matters';
import RadioButton from '../components/RadioButton';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import color from '../utils/color';
import {ToastService} from 'react-native-toastier';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, updateUser} from '../redux/Slice';

const SignUp = () => {
  const route = useRoute();
  const isEdit = route?.params?.isEdit || false;
  const navigation = useNavigation();

  const [selected, setSelected] = useState('Male');
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAltFormat, setIsAltFormat] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const currentUserId = useSelector(state => state.users.currentUserId);
  const currentUser = user.find(u => u.id === currentUserId);

  const random = Math.floor(Math.random() * 100);
  const id = new Date().getTime() + random;

  useEffect(() => {
    if (isEdit && currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPassword(currentUser.password);
      setSelected(currentUser.selected);
      if (currentUser.formatedDate) {
        setDate(moment(currentUser.formatedDate, 'DD MMM YYYY').toDate());
      }
    }
  }, [isEdit, currentUser]);

  const PressFormat = () => {
    setIsAltFormat(prev => !prev);
  };

  const formatedDate = date
    ? isAltFormat
      ? moment(date).format('DD MMM YYYY')
      : moment(date).format('DD MMMM YYYY')
    : null;

  const isValidEmail = text => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(text);
  };

  const update = () => {
    dispatch(
      updateUser({
        id: currentUserId,
        updates: {name, email, password, selected, formatedDate},
      }),
    );
    navigation.replace('Profile');
  };

  const add = () => {
    dispatch(addUser({id, name, email, password, selected, formatedDate}));
    navigation.goBack();
  };

  const PressSignUp = () => {
    if (!name || !email || !password || !date || !isAltFormat) {
      ToastService.showError({message: 'Please fill all fields'});
      return;
    }

    if (!isValidEmail(email)) {
      ToastService.showError({message: 'Enter a valid email address'});
      return;
    }

    if (!isEdit) {
      const exists = user.find(u => u.email === email);
      if (exists) {
        Alert.alert('Error', 'User already exists');
        return;
      }
    }

    isEdit ? update() : add();
  };

  return (
    <CustomScreen
      isButton={true}
      header={isEdit ? 'Edit Profile' : 'Sign Up'}
      onPress={() => navigation.goBack()}
      child={
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: verticalScale(16)}}>
            {/* Name */}
            <Text style={styles.LableText}>Name</Text>
            <Input
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            {/* Email */}
            <Text style={styles.LableText}>Email</Text>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password */}
            <Text style={styles.LableText}>Password</Text>
            <Input
              placeholder="Enter your password"
              secureTextEntry={show}
              source={
                show
                  ? require('../assets/images/eye.png')
                  : require('../assets/images/eye-crossed.png')
              }
              value={password}
              onChangeText={setPassword}
              onPress={() => setShow(prev => !prev)}
            />

            {/* Gender */}
            <Text style={styles.LableText}>Select Gender</Text>
            <RadioButton setSelected={setSelected} selected={selected} />

            {/* Date of Birth */}
            <Text style={styles.LableText}>Select Date of Birth</Text>
            <CustomButton
              buttonStyle={{
                marginTop: verticalScale(12),
                backgroundColor: color.secondary,
              }}
              Title="Select Date"
              onPress={() => setOpen(true)}
            />

            {/* Date picker */}
            <Text style={styles.LableText}>Formatted Date</Text>
            <View style={styles.DatePickerContaioner}>
              <Text style={styles.DatePickerText}>
                {formatedDate || 'Select Date of Birth'}
              </Text>
              <TouchableOpacity
                disabled={!date}
                style={styles.DatePickerButton}
                onPress={PressFormat}>
                <Text style={styles.DatePickerButtonText}>Change Format</Text>
              </TouchableOpacity>

              <DatePicker
                maximumDate={new Date()}
                modal
                open={open}
                date={date || new Date()}
                mode="date"
                onConfirm={selectedDate => {
                  setOpen(false);
                  setDate(selectedDate);
                }}
                onCancel={() => setOpen(false)}
              />
            </View>

            {/* Submit */}
            <CustomButton
              buttonStyle={{marginTop: verticalScale(24)}}
              Title={isEdit ? 'Update Profile' : 'Sign Up'}
              onPress={PressSignUp}
            />
          </View>
        </ScrollView>
      }
    />
  );
};

export default SignUp;
