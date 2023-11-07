import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';

import WelcomeDialogue from './welcomeDialogue';
import BioInfo from './bioInfo';
import Beliefs from './beliefs';
import Interests from './interests';

/* TODO
1. Fix spacing on finish button
2. Fix keyboard pop up
3. InterestButtons TODO

*/

const ProfileSetup = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.background}>

            <WelcomeDialogue />

            <BioInfo />

            <Beliefs />

            <Interests />

            <View style={styles.finishContainer}>
                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={() => props.navigation.navigate('Home')}
                >

                    <Text style={styles.finishFont}>
                        Finish Setup
                    </Text>

                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

export default ProfileSetup;

const styles = StyleSheet.create({
    background: {
        width: '100%',
        backgroundColor: '#F0F3F5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '6%'
    },
    finishContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    finishButton: {
        height: 30,
        width: 100,
        backgroundColor: '#050E40',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    finishFont: {
        fontFamily: 'HelveticaNeue',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
});
