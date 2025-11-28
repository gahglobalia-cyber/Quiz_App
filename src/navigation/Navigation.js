import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import Quiz from '../screen/Quiz';
import Score from '../screen/Score';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Navigation = () => {
  const Stack = createStackNavigator();
  const currentUserID = useSelector(state => state.users.currentUserId);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={currentUserID ? 'Home' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Score" component={Score} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
