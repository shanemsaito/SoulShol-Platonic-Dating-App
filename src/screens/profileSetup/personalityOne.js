import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

class PersonalityOne extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profanityIntensity: 0
        };
    };

    componentWillUnmount = () => {
        const useruid = firebase.auth().currentUser.uid;
        const ref = firebase.firestore().collection('userInfo').doc(useruid);
        ref.update({
            profanityIntensity: this.state.profanityIntensity
        });
    };

    onPressSwear = (intensity) => {
        this.setState({ profanityIntensity: intensity });
    };

    onPressNext = () => {
        this.props.navigation.navigate('Interests');
    };

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.personalityContainer}>

                    <Text style={styles.personalityText}>
                        Personality
                    </Text>

                    <Text style={styles.promptText}> How do you feel about profanity? </Text>

                    <TouchableOpacity
                        style={(this.state.profanityIntensity === 3) ? styles.touchableHighlighted : styles.touchable}
                        onPress={() => this.onPressSwear(3)}>

                        <Text style={styles.selectText}>
                            I think it can be humorous and expressive
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={(this.state.profanityIntensity === 2) ? styles.touchableHighlighted : styles.touchable}
                        onPress={() => this.onPressSwear(2)}>

                        <Text style={styles.selectText}>
                            I do not use it much but do not mind it
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={(this.state.profanityIntensity === 1) ? styles.touchableHighlighted : styles.touchable}
                        onPress={() => this.onPressSwear(1)}>

                        <Text style={styles.selectText}>
                            I do not enjoy it
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextContainer}
                        onPress={() => this.onPressNext()}>

                        <Text style={styles.nextFont}>
                            Next
                        </Text>

                    </TouchableOpacity>

                </View>
            </View>
        );
    };
};

export default PersonalityOne;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#F0F3F5'
    },
    personalityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8%'
    },
    personalityText: {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        fontSize: 60
    },
    promptText: {
        fontFamily: 'Times New Roman',
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: 20
    },
    touchableHighlighted: {
        margin: 5,
        width: '100%',
        height: 40,
        borderRadius: 2,
        backgroundColor: '#B9B9B9',
        shadowColor: '#E4E7E9',
        shadowOpacity: 100,
        shadowRadius: 0,
        shadowOffset: { width: -3, height: 3 },
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchable: {
        margin: 5,
        width: '100%',
        height: 40,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        shadowColor: '#E4E7E9',
        shadowOpacity: 100,
        shadowRadius: 0,
        shadowOffset: { width: -3, height: 3 },
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectText: {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        fontSize: 15
    },
    nextContainer: {
        height: 30,
        width: 100,
        backgroundColor: '#000000',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    nextFont: {
        fontFamily: 'HelveticaNeue',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
});
