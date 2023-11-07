import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const WelcomeDialogue = () => {
    return (
        <View style={styles.welcomeBackground}>

            <Text style={styles.welcomeText}>
                Welcome!
            </Text>

            <Text style={styles.promptText}>
                Before you get started, let’s set up your profile. This will help other people like you find and message you. Keep in mind that all your information should show what you enjoy talking about.
            </Text>

        </View>
    );
};

export default WelcomeDialogue;

const styles = StyleSheet.create({
    welcomeBackground: {
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        width: '92%',
        height: 190,
        borderRadius: 30,
        marginVertical: 12,
        padding: 30
    },
    welcomeText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#050E40'
    },
    promptText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#575757'
    }
});
