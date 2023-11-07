import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function splashScreen() {
    return (
        <View style={styles.background}>
            <Image
                style={styles.image}
                source={require('../resources/illustrations/logo.png')}
                resizeMode='center'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    image: {
        maxHeight: 150,
        resizeMode: 'center'
    }
});
