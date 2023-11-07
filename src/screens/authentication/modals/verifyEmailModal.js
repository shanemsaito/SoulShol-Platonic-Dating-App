import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

/* TODO
1a. Show spinner when loading & checkmark when verified
1b. Auto refresh to check email verified

We need to make a loading circle and a grayed out button
When the user verifies their email, then they can proceed and press the button

*/

export default class verifyEmailModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailVerified: false
        };
    };

    checkEmailVerified = () => {
        // TODO pls fix, won't work ;-;
        this.setState({
            emailVerified: firebase.auth().currentUser.emailVerified
        });
    };

    render() {
        return (
            <Modal
                animationType="fade"
                visible={this.props.verifyEmailModalVisible}
                transparent={true}
            >
                <View style={styles.background}>
                    <View style={styles.modalBox}>

                        <Text style={styles.verifyTitle}>
                            Please Verify Your Email
                        </Text>

                        <Text style={styles.verifyInstrux}>
                            Check your email for a verification link.
                        </Text>

                        {/* TODO change to spinner when waiting & checkmark when verified */}
                        <TouchableOpacity style={styles.refreshButton} onPress={this.checkEmailVerified}>
                            <Text style={styles.refreshText}>
                                Refresh
                            </Text>
                        </TouchableOpacity>

                        {
                            // If email is NOT verified, show grayed-out continue button
                            !this.state.emailVerified &&
                            <TouchableOpacity style={styles.continueNotVerified}>
                                <Text style={styles.continueText}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        }
                        {
                            // If email IS verified, show valid continue button
                            this.state.emailVerified &&
                            <TouchableOpacity style={styles.continueVerified} onPress={this.props.finishVerifyEmail}>
                                <Text style={styles.continueText}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </Modal>
        );
    };
};

const styles = StyleSheet.create({
    refreshButton: {
        height: 40,
        width: '100%',
        backgroundColor: '#050E40',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    refreshText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FFFFFF'
    },
    verifyTitle: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        alignSelf: 'flex-start'
    },
    verifyInstrux: {
        fontFamily: 'Helvetica Neue',
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    continueVerified: {
        height: 40,
        width: 125,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#050E40',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    continueNotVerified: {
        height: 40,
        width: 125,
        borderRadius: 20,
        backgroundColor: 'gray',
        borderWidth: 2,
        borderColor: '#050E40',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    continueText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#050E40'
    },
    modalBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
        width: '75%',
        height: '45%',
        borderRadius: 30,
        padding: 20
    },
    background: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
});
