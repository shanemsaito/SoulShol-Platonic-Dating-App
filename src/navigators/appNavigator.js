import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer, withNavigation, createSwitchNavigator } from 'react-navigation';
import HomePage from '../screens/mainApp/homePage';
import SearchNavigator from '../navigators/searchNavigator';
import MessagesPage from '../screens/mainApp/messaging/messagesPage';

const AppNavigator = createBottomTabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarIcon: (({focused}) => {
                return <Image
                    style={styles.icon}
                    resizeMode='center'
                    source={
                        focused ?
                            require('../resources/icons/homeTabIconSelected.png') :
                            require('../resources/icons/homeTabIconUnselected.png')
                    }
                />
            })
        }
    },
    SearchTab: {
        screen: SearchNavigator,
        navigationOptions: {
            tabBarIcon: (({focused}) => {
                return <Image
                    style={styles.icon}
                    resizeMode='center'
                    source={
                        focused ?
                            require('../resources/icons/searchTabIconSelected.png') :
                            require('../resources/icons/searchTabIconUnselected.png')
                    }
                />
            })
        }
    },
    Messages: {
        screen: MessagesPage,
        navigationOptions: {
            tabBarIcon: (({focused}) => {
                return <Image
                    style={styles.icon}
                    resizeMode='center'
                    source={
                        focused ?
                            require('../resources/icons/messagesTabIconSelected.png') :
                            require('../resources/icons/messagesTabIconUnselected.png')
                    }
                />
            })
        }
    }
},
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            showLabel: false,
            style: {
                paddingHorizontal: 20
            }
        }
    }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    icon: {
        height: 20
    },
    tabBar: {
        paddingHorizontal: 10
    }
});
