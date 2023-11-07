import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

export default class BioInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            month: 0,
            date: 0,
            year: 0,
            genderSelected: ''
        };
    };

    componentWillUnmount = () => {
        const useruid = firebase.auth().currentUser.uid;
        const ref = firebase.firestore().collection('userInfo').doc(useruid);
        ref.update({
            month: this.state.month,
            date: this.state.date,
            year: this.state.year,
            gender: this.state.genderSelected
        });
    };

    onPressGender = (genderSelected) => {
        this.setState({ genderSelected });
    };

    render() {
        return (
            <View style={styles.bioBackground}>

                <View style={styles.headerContainer}>

                    <Text style={styles.headerText}>
                        Biography
                    </Text>

                    <Text style={styles.headerPromptText}>
                        All Fields Are Required
                    </Text>

                </View>

                {/* Birthday Input */}

                <Text style={styles.promptText}>
                    Birthday:
                </Text>

                <View style={styles.birthdayInputContainer}>

                    <View style={styles.dateInputContainer}>
                        <TextInput
                            style={styles.dateInputText}
                            placeholder='mm'
                            placeholderTextColor='#575757'
                            keyboardType='numeric'
                            onChangeText={(month) => { this.setState({ month }) }} />
                    </View>

                    <View style={styles.dateInputContainer}>
                        <TextInput
                            style={styles.dateInputText}
                            placeholder='dd'
                            placeholderTextColor='#575757'
                            keyboardType='numeric'
                            onChangeText={(date) => { this.setState({ date }) }} />
                    </View>

                    <View style={styles.dateInputContainer}>
                        <TextInput
                            style={styles.dateInputText}
                            placeholder='yyyy'
                            placeholderTextColor='#575757'
                            keyboardType='numeric'
                            onChangeText={(year) => { this.setState({ year }) }} />
                    </View>

                </View>

                {/* Gender Selection */}

                <Text style={styles.promptText}>
                    Gender:
                </Text>

                <View style={styles.genderSelectContainer}>

                    <TouchableOpacity
                        style={(this.state.genderSelected === 'Female') ? styles.genderTouchableHighlighted : styles.genderTouchable}
                        onPress={this.onPressGender.bind(this, 'Female')}
                    >

                        <Text style={(this.state.genderSelected === 'Female') ? styles.genderSelectTextHighlighted : styles.genderSelectText}>
                            Female
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={(this.state.genderSelected === 'Male') ? styles.genderTouchableHighlighted : styles.genderTouchable}
                        onPress={this.onPressGender.bind(this, 'Male')}
                    >

                        <Text style={(this.state.genderSelected === 'Male') ? styles.genderSelectTextHighlighted : styles.genderSelectText}>
                            Male
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={(this.state.genderSelected === 'Other') ? styles.genderTouchableHighlighted : styles.genderTouchable}
                        onPress={this.onPressGender.bind(this, 'Other')}
                    >

                        <Text style={(this.state.genderSelected === 'Other') ? styles.genderSelectTextHighlighted : styles.genderSelectText}>
                            Other
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>
        );
    };
};

const styles = StyleSheet.create({
    bioBackground: {
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        width: '92%',
        height: 310,
        borderRadius: 30,
        marginVertical: 12,
        padding: 24,
        paddingBottom: 35
    },
    headerContainer: {
        justifyContent: 'space-between'
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
    },
    // Birthday Input
    birthdayInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        // borderWidth: 1,
        // borderColor: 'red'
    },
    dateInputContainer: {
        width: '25%',
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(87,87,87,0.2)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    dateInputText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 13,
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'green',
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },
    // Gender Selection
    genderSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    genderTouchableHighlighted: {
        width: '30%',
        height: 26,
        borderRadius: 30,
        backgroundColor: '#050E40',
        justifyContent: 'center',
        alignItems: 'center'
    },
    genderTouchable: {
        width: '30%',
        height: 26,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#050E40'
    },
    genderSelectTextHighlighted: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 13,
        color: '#FFFFFF'
    },
    genderSelectText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 13,
        color: '#050E40'
    }
});
