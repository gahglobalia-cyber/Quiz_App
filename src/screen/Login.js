import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginStyle from '../style/GlobleStyle';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomScreen from '../components/CustomScreen';
import {verticalScale} from 'react-native-size-matters';
import {ToastService} from 'react-native-toastier';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUser} from '../redux/Slice';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const curentUser = useSelector(state => state.users.currentUserId);
  const handleLogin = () => {
    const users = user.find(u => u.email === email);
    const Upassword = users ? users.password === password : null;

    if (users && Upassword) {
      if (curentUser !== undefined) {
        dispatch(setCurrentUser(users.id));
      }
      navigation.replace('Home');
    } else {
      if (!users) {
        ToastService.showError({
          message: 'User not found! Please sign up.',
        });
        return;
      } else if (!Upassword) {
        ToastService.showError({
          message: 'Wrong Password.',
        });
        return;
      }
    }
  };

  const PressSignin = () => {
    navigation.navigate('SignUp');
  };

  return (
    <CustomScreen
      header={'Log In'}
      child={
        <View>
          {/* Email */}
          <Text style={LoginStyle.LableText}>Email</Text>
          <Input
            placeholder={'Enter your email'}
            value={email}
            onChangeText={setEmail}
          />
          {/* Password */}
          <Text style={LoginStyle.LableText}>Password</Text>
          <Input
            placeholder={'Enter your password'}
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
          {/* button */}
          <CustomButton
            Title={'Log In'}
            onPress={handleLogin}
            buttonStyle={{
              marginTop: verticalScale(48),
            }}
          />
          {/* Sign Up Text */}
          <Text style={LoginStyle.Text}>
            Don't have an account?{'  '}
            <Text onPress={PressSignin} style={LoginStyle.HighlightText}>
              SIGN IN
            </Text>
          </Text>
        </View>
      }
    />
  );
};

export default Login;
