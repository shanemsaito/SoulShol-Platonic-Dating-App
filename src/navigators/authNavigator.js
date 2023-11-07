// import React, { Component } from 'react';
// import { View } from 'react-native';
import LoginPage from '../screens/authentication/loginPage';
import RegisterPage from '../screens/authentication/registerPage';
import AppNavigator from '../navigators/appNavigator';
import ProfileSetupNavigator from '../navigators/profileSetupNavigator';
import { createSwitchNavigator, createAppContainer, withNavigation } from 'react-navigation'

const AuthNavigator = createSwitchNavigator({
    Login: {
        screen: LoginPage
    },
    Register: {
        screen: RegisterPage
    },
    Home: {
        screen: AppNavigator
    },
    ProfileSetupNavigator: {
        screen: ProfileSetupNavigator
    }
},
    {
        initialRouteName: 'Login'
    });

export default createAppContainer(AuthNavigator);
