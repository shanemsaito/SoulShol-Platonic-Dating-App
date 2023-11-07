import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
import AuthErrorModal from './modals/authErrorModal';
import VerifyEmailModal from './modals/verifyEmailModal';
import MyContext from '../../utils/MyContext';
import LoadingScreen from '../../utils/loadingScreen';
import SplashScreen from '../../utils/splashScreen';

const firestore = firebase.firestore();

/* TODO
(DONE) 1. Display errors in modals
(DONE) 2. Check if email is verified
(DONE) 3. Check if profile setup is complete
4. Create password reset
5. Allow login w/ username
    - Maybe in usernamesSet, instead of boolean put the UID?
6. Swirly background LOL

*/

function LoginPage(props) {
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [errorCode, setErrorCode] = React.useState('');
    let [errorMsg, setErrorMsg] = React.useState('');
    let [errorModalVisible, setErrorModalVisible] = React.useState(false);
    let [verifyEmailModalVisible, setVerifyEmailModalVisible] = React.useState(false);

    let { user } = React.useContext(MyContext);

    let [isLoading, setIsLoading] = React.useState(true);

    // Check if user is already logged in
    React.useEffect(() => {
        if (user) {
            checkUserFinishedSetup(user);
        }

        // Timeout for splash screen
        let timeoutID = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timeoutID);
    }, [user]);

    const handleLogin = () => {
        // Check if any fields are empty
        if (email.length === 0 || password.length === 0) {
            // Set error msg
            setErrorCode('');
            setErrorMsg('Please fill out all fields.');
            setErrorModalVisible(true);

            return;
        }

        // Sign in a user w/ an email address & password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(curUser => {
                // If email is NOT verified, show verify email modal
                if (!curUser.user.emailVerified) {
                    sendVerifyEmail();
                    return;
                }

                // Otherwise, check if user finished profile setup
                checkUserFinishedSetup(curUser.user);
            })
            .catch(error => {
                // Set error msg
                setErrorCode(error.code);
                setErrorMsg(error.message);
                setErrorModalVisible(true);
            });
    };

    const checkUserFinishedSetup = (user) => {
        // Get user's info doc
        firestore.collection('userInfo').doc(user.uid).get()
            .then(userInfo => {
                // If user finished basic profile setup, navigate to Home page
                if (Object.keys(userInfo.data()).length >= 13) {
                    props.navigation.navigate('Home');
                }
                // Otherwise, navigate to Profile Setup
                else {
                    props.navigation.navigate('ProfileSetupNavigator');
                }
            })
            .catch(error => {
                // Set error msg
                setErrorCode(error.code);
                setErrorMsg(error.message);
                setErrorModalVisible(true);
            });
    };

    const sendVerifyEmail = () => {
        // Make Verify Email Modal visible
        setVerifyEmailModalVisible(true);

        // From Firebase docs
        let currentUser = firebase.auth().currentUser;
        currentUser.sendEmailVerification()
            .then(() => {
                // Email sent.
            }).catch(error => {
                // An error happened.
                // Set error msg
                setVerifyEmailModalVisible(false);
                setErrorCode(error.code);
                setErrorMsg(error.message);
                setErrorModalVisible(true);
            });
    };

    const finishVerifyEmail = () => {
        // Stop showing modal
        setVerifyEmailModalVisible(false);

        // Navigate to Profile Setup Navigator
        props.navigation.navigate('ProfileSetupNavigator');
    };

    if (isLoading) return <Modal animationType='fade'><SplashScreen /></Modal>

    return (
        <KeyboardAvoidingView style={styles.background} behavior='padding'>
            <View style={styles.loginBackground}>
                <View style={styles.loginContainer}>

                    <Text style={styles.loginTitle}>
                        Sign In
                    </Text>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.placeholderFont}
                            placeholder='Email'
                            placeholderTextColor='#595959'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            autoCapitalize='none'
                            onChangeText={email => setEmail(email)} />
                    </View>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.placeholderFont}
                            placeholder='Password'
                            placeholderTextColor='#595959'
                            textContentType='password'
                            autoCapitalize='none'
                            secureTextEntry
                            onChangeText={password => setPassword(password)} />
                    </View>

                    <View>

                        <TouchableOpacity onPress={handleLogin}>
                            <View style={styles.signInContainer}>
                                <Text style={styles.signInFont}>
                                    Sign In
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => (props.navigation.navigate('Register'))}>
                            <View style={styles.registerContainer}>
                                <Text style={styles.registerFont}>
                                    Register
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity onPress={() => { return }}>
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>
                                Forgot Password?
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <AuthErrorModal
                        errorModalVisible={errorModalVisible}
                        setErrorModalVisible={setErrorModalVisible}
                        errorCode={errorCode}
                        errorMsg={errorMsg}
                    />

                    <VerifyEmailModal
                        verifyEmailModalVisible={verifyEmailModalVisible}
                        finishVerifyEmail={finishVerifyEmail}
                    />

                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default withNavigation(LoginPage);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F3F5'
    },
    loginBackground: {
        width: '92%',
        height: '60%',
        minHeight: 450,
        backgroundColor: '#FFFFFF',
        borderRadius: 30
    },
    loginContainer: {
        flex: 1,
        paddingHorizontal: '10%',
        justifyContent: 'center'
    },
    loginTitle: {
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
    signInContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#050E40',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 8
    },
    signInFont: {
        fontFamily: 'Helvetica Neue',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    registerContainer: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#050E40',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8
    },
    registerFont: {
        fontFamily: 'Helvetica Neue',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#050E40'
    },
    forgotPasswordContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    forgotPasswordText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 13
    }
});
