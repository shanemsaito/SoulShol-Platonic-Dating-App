import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
import AuthErrorModal from './modals/authErrorModal';
import VerifyEmailModal from './modals/verifyEmailModal';

const firestore = firebase.firestore();

/* TODO
(DONE) 1. Display errors in modals
(DONE) 2. Check if email is taken
(DONE) 3. Check if username is taken
(Partial) 4. Generate email verification
    - See verifyEmailModal.js TODO
5. Enable phone # auth
6. Enable Google Sign-In
7. Swirly background LOL
8. Prevent usernames with special characters (. , / : etc.)

Also need to make sure data is not added to the database until the user is verified
We need to keep everything extremely cost effective so we are not wasting any
digital space.

*/

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errorCode: '',
            errorMsg: '',
            errorModalVisible: false,
            verifyEmailModalVisible: false
        };
    };

    checkRegister = () => {
        // Destructuring the state
        const { email, username, password, confirmPassword } = this.state;

        // Check if any fields are empty
        if (email.length === 0 || username.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            this.setState({
                // Set error msg
                errorCode: '',
                errorMsg: 'Please fill out all fields.',
                errorModalVisible: true
            });
            return;
        }
        // Check if Password & Confirm Password don't match
        if (password !== confirmPassword) {
            this.setState({
                // Set error msg
                errorCode: '',
                errorMsg: 'Password and Confirm Password do not match.',
                errorModalVisible: true
            });
            return;
        }

        // Check if Username exists
        let usernameExists = false;
        firestore.collection('userAuth').doc('usernamesSet').get()
            .then(usernamesSet => {
                const usernames = usernamesSet.data();

                if (usernames[username]) {
                    usernameExists = true;

                    // Set error msg
                    this.setState({
                        errorCode: '',
                        errorMsg: 'Username is already taken.',
                        errorModalVisible: true
                    });
                }

                // If registration fields are valid & the username isn't taken, try registering
                if (!usernameExists) this.handleRegister();
            })
            .catch(error => {
                // Set error msg
                this.setState({
                    errorCode: error.code,
                    errorMsg: error.message,
                    errorModalVisible: true
                });
            });
    };

    handleRegister = () => {
        // Destructuring the state
        const { email, username, password } = this.state;

        // Create a password-based account
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                let curUser = user.user;

                // Update Firestore database w/ the new user
                const useruid = curUser.uid;
                const infoRef = firestore.collection('userInfo').doc(useruid);
                const usernamesSet = firestore.collection('userAuth').doc('usernamesSet');
                const uidToUsername = firestore.collection('userAuth').doc('uidToUsername');
                infoRef.set({
                    email,
                    username
                });
                usernamesSet.update({
                    [username]: true
                });
                uidToUsername.update({
                    [useruid]: username
                });

                this.sendVerifyEmail();
            })
            .catch(error => {
                this.setState({
                    // Set error msg
                    errorCode: error.code,
                    errorMsg: error.message,
                    errorModalVisible: true
                });
            });
    };

    sendVerifyEmail = () => {
        // Make Verify Email Modal visible
        this.setState({
            verifyEmailModalVisible: true
        });

        // From Firebase docs
        let currentUser = firebase.auth().currentUser;
        currentUser.sendEmailVerification()
            .then(() => {
                // Email sent.
            }).catch(error => {
                // An error happened.
                this.setState({
                    // Set error msg
                    verifyEmailModalVisible: false,
                    errorCode: error.code,
                    errorMsg: error.message,
                    errorModalVisible: true
                });
            });
    };

    finishVerifyEmail = () => {
        // Stop showing modal
        this.setVerifyEmailModalVisible(false);

        // Navigate to Profile Setup Navigator
        this.props.navigation.navigate('ProfileSetupNavigator');
    };

    setErrorModalVisible = errorModalVisible => {
        this.setState({ errorModalVisible });
    };

    setVerifyEmailModalVisible = verifyEmailModalVisible => {
        this.setState({ verifyEmailModalVisible });
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.background} behavior='padding'>
                <View style={styles.registerBackground}>
                    <View style={styles.registerContainer}>

                        <Text style={styles.registerTitle}>
                            Register
                        </Text>

                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.placeholderFont}
                                placeholder='Email'
                                placeholderTextColor='#595959'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoCapitalize='none'
                                onChangeText={email => this.setState({ email })} />
                        </View>

                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.placeholderFont}
                                placeholder='Username'
                                placeholderTextColor='#595959'
                                textContentType='username'
                                autoCapitalize='none'
                                onChangeText={username => this.setState({ username })} />
                        </View>

                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.placeholderFont}
                                placeholder='New Password'
                                placeholderTextColor='#595959'
                                textContentType='password'
                                autoCapitalize='none'
                                secureTextEntry
                                onChangeText={password => this.setState({ password })} />
                        </View>

                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.placeholderFont}
                                placeholder='Confirm Password'
                                placeholderTextColor='#595959'
                                textContentType='password'
                                autoCapitalize='none'
                                secureTextEntry
                                onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                        </View>

                        <TouchableOpacity onPress={this.checkRegister}>
                            <View style={styles.registerButtonContainer}>
                                <Text style={styles.registerFont}>
                                    Register
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(() => this.props.navigation.navigate('Login'))}>
                            <View style={styles.signInRedirectContainer}>
                                <Text style={styles.signInRedirectText}>
                                    Already have an account? Sign In.
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <AuthErrorModal
                            errorModalVisible={this.state.errorModalVisible}
                            setErrorModalVisible={this.setErrorModalVisible}
                            errorCode={this.state.errorCode}
                            errorMsg={this.state.errorMsg}
                        />

                        <VerifyEmailModal
                            verifyEmailModalVisible={this.state.verifyEmailModalVisible}
                            finishVerifyEmail={this.finishVerifyEmail}
                        />

                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    };
};

export default withNavigation(RegisterPage);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F3F5'
    },
    registerBackground: {
        width: '92%',
        height: '60%',
        minHeight: 450,
        backgroundColor: '#FFFFFF',
        borderRadius: 30
    },
    registerContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: '10%'
    },
    registerTitle: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 32,
        color: '#050E40',
        marginBottom: 10
    },
    textInputContainer: {
        height: 40,
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        justifyContent: 'center'
    },
    placeholderFont: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 13
    },
    registerButtonContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#050E40',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 8
    },
    registerFont: {
        fontFamily: 'HelveticaNeue',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    signInRedirectContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInRedirectText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        fontSize: 13
    }
});
