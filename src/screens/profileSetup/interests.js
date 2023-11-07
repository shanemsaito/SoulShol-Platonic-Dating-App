import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InterestButtons from './interestButtons'

const Interests = () => {
    return (
        <View style={styles.interestsBackground}>

            <View style={styles.headerContainer}>

                <Text style={styles.headerText}>
                    Interests
                </Text>

                <Text style={styles.headerPromptText}>
                    All Fields Are Required
                </Text>

            </View>

            <Text style={styles.promptText}>
                Select Your Interests:
            </Text>

            <InterestButtons />

        </View>
    );
};

export default Interests;

const styles = StyleSheet.create({
    interestsBackground: {
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        width: '92%',
        borderRadius: 30,
        marginVertical: 12,
        padding: 24,
        paddingBottom: 35
    },
    headerContainer: {
        justifyContent: 'space-between',
        marginBottom: 35
    },
    headerText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#050E40',
        textAlign: 'right'
    },
    headerPromptText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#575757',
        textAlign: 'right'
    },
    promptText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#575757'
    }
});
