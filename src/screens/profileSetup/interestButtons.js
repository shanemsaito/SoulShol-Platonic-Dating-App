import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase'

/* TODO
1. styles.selectedContainer touchable becomes smaller than styles.unselectedContainer touchable?? o-o
- Temp fixed w/ border width
2. Fix if else statements. lol

*/

const InterestSelect = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={(props.selected) ? styles.selectedContainer : styles.unselectedContainer}
        >
            <Text style={(props.selected) ? styles.selectedText : styles.unselectedText}>
                {props.label}
            </Text>
        </TouchableOpacity>
    );
};

export default class InterestButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            interestOne: '',
            interestTwo: '',
            interestThree: '',
            numSelected: 0
        };
    };

    componentWillUnmount = () => {
        const useruid = firebase.auth().currentUser.uid;
        const ref = firebase.firestore().collection('userInfo').doc(useruid);
        ref.update({
            interestOne: this.state.interestOne,
            interestTwo: this.state.interestTwo,
            interestThree: this.state.interestThree
        });
    };

    onPressInterest = (interest) => {
        if (this.state.interestOne !== '' && this.state.interestTwo !== '' && this.state.interestThree !== '') {
            if (this.state.interestOne === interest) {
                this.setState({ interestOne: '', numSelected: this.state.numSelected - 1 })
            }
            else if (this.state.interestTwo === interest) {
                this.setState({ interestTwo: '', numSelected: this.state.numSelected - 1 })
            }
            else if (this.state.interestThree === interest) {
                this.setState({ interestThree: '', numSelected: this.state.numSelected - 1 })
            }
        }
        else if (this.state.interestOne === interest || this.state.interestTwo === interest || this.state.interestThree === interest) {
            if (this.state.interestOne === interest) {
                this.setState({ interestOne: '', numSelected: this.state.numSelected - 1 })
            }
            else if (this.state.interestTwo === interest) {
                this.setState({ interestTwo: '', numSelected: this.state.numSelected - 1 })
            }
            else if (this.state.interestThree === interest) {
                this.setState({ interestThree: '', numSelected: this.state.numSelected - 1 })
            }
        }
        else if (this.state.interestOne === '') {
            if (this.state.numSelected === 3) return;
            this.setState({ interestOne: interest, numSelected: this.state.numSelected + 1 })
        }
        else if (this.state.interestTwo === '') {
            if (this.state.numSelected === 3) return;
            this.setState({ interestTwo: interest, numSelected: this.state.numSelected + 1 })
        }
        else if (this.state.interestThree === '') {
            if (this.state.numSelected === 3) return;
            this.setState({ interestThree: interest, numSelected: this.state.numSelected + 1 })
        }
    }

    render() {
        return (
            <View style={styles.interestButtonsContainer}>

                <View style={styles.aboveTextView}>

                    <Text style={styles.numSelectedText}>
                        Choose your top three
                    </Text>

                    <Text style={styles.numSelectedText}>
                        {this.state.numSelected}/3 Selected
                    </Text>

                </View>

                <View style={styles.selectionRow}>

                    <InterestSelect
                        label='Economics'
                        onPress={() => this.onPressInterest('Economics')}
                        selected={
                            (this.state.interestOne === 'Economics') ||
                            (this.state.interestTwo === 'Economics') ||
                            (this.state.interestThree === 'Economics')}
                    />

                    <InterestSelect
                        label='Travel'
                        onPress={() => this.onPressInterest('Travel')}
                        selected={
                            (this.state.interestOne === 'Travel') ||
                            (this.state.interestTwo === 'Travel') ||
                            (this.state.interestThree === 'Travel')}
                    />

                    <InterestSelect
                        label='Reading'
                        onPress={() => this.onPressInterest('Reading')}
                        selected={
                            (this.state.interestOne === 'Reading') ||
                            (this.state.interestTwo === 'Reading') ||
                            (this.state.interestThree === 'Reading')}
                    />

                </View>

                <View style={styles.selectionRow}>

                    <InterestSelect
                        label='Self-Improvement'
                        onPress={() => this.onPressInterest('Self-Improvement')}
                        selected={
                            (this.state.interestOne === 'Self-Improvement') ||
                            (this.state.interestTwo === 'Self-Improvement') ||
                            (this.state.interestThree === 'Self-Improvement')
                        }
                    />

                    <InterestSelect
                        label='Music'
                        onPress={() => this.onPressInterest('Music')}
                        selected={
                            (this.state.interestOne === 'Music') ||
                            (this.state.interestTwo === 'Music') ||
                            (this.state.interestThree === 'Music')
                        }
                    />

                    <InterestSelect
                        label='Film'
                        onPress={() => this.onPressInterest('Film')}
                        selected={
                            (this.state.interestOne === 'Film') ||
                            (this.state.interestTwo === 'Film') ||
                            (this.state.interestThree === 'Film')
                        }
                    />

                </View>

                <View style={styles.selectionRow}>

                    <InterestSelect
                        label='Sports'
                        onPress={() => this.onPressInterest('Sports')}
                        selected={
                            (this.state.interestOne === 'Sports') ||
                            (this.state.interestTwo === 'Sports') ||
                            (this.state.interestThree === 'Sports')
                        }
                    />

                    <InterestSelect
                        label='Engineering'
                        onPress={() => this.onPressInterest('Engineering')}
                        selected={
                            (this.state.interestOne === 'Engineering') ||
                            (this.state.interestTwo === 'Engineering') ||
                            (this.state.interestThree === 'Engineering')
                        }
                    />

                    <InterestSelect
                        label='Business'
                        onPress={() => this.onPressInterest('Business')}
                        selected={
                            (this.state.interestOne === 'Business') ||
                            (this.state.interestTwo === 'Business') ||
                            (this.state.interestThree === 'Business')
                        }
                    />

                </View>

                <View style={styles.selectionRow}>

                    <InterestSelect
                        label='Coding'
                        onPress={() => this.onPressInterest('Coding')}
                        selected={
                            (this.state.interestOne === 'Coding') ||
                            (this.state.interestTwo === 'Coding') ||
                            (this.state.interestThree === 'Coding')
                        }
                    />

                    <InterestSelect
                        label='Philosophy'
                        onPress={() => this.onPressInterest('Philosophy')}
                        selected={
                            (this.state.interestOne === 'Philosophy') ||
                            (this.state.interestTwo === 'Philosophy') ||
                            (this.state.interestThree === 'Philosophy')
                        }
                    />

                    <InterestSelect
                        label='Writing'
                        onPress={() => this.onPressInterest('Writing')}
                        selected={
                            (this.state.interestOne === 'Writing') ||
                            (this.state.interestTwo === 'Writing') ||
                            (this.state.interestThree === 'Writing')
                        }
                    />

                </View>

            </View>
        );
    };
};

const styles = StyleSheet.create({
    selectedContainer: {
        // width: '30%',
        height: 26,
        borderRadius: 15,
        backgroundColor: '#050E40',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13,
        // Temp fix below.
        borderColor: '#050E40',
        borderWidth: 2
    },
    unselectedContainer: {
        // width: '30%',
        height: 26,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13,
        borderColor: '#050E40',
        borderWidth: 2
    },
    selectedText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    unselectedText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#050E40'
    },
    interestButtonsContainer: {
        justifyContent: 'space-between'
    },
    aboveTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15
    },
    numSelectedText: {
        fontFamily: 'Helvetica',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#404040'
    },
    selectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    }
});
