import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

/* Usage:

    let [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        // Timeout for loading screen
        let timeoutID = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timeoutID);
    }, []);
    
    if (isLoading) return <Modal animationType='fade'><LoadingScreen /></Modal>

*/

export default function LoadingScreen() {
    let [loadingState, setLoadingState] = React.useState(0);

    React.useEffect(() => {
        let intervalID = setInterval(() => {
            setLoadingState(v => v + 1);
        }, 1000 / 5);

        return () => clearInterval(intervalID);
    }, []);

    // return (
    //     <View><Text>123</Text></View>
    // )

    return (
        <View style={styles.background}>
            <Text style={styles.loadingText}>
                Loading
                {
                    new Array(loadingState % 4).fill(".")
                }
            </Text>
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
    }
});
