import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

/* TODO
1. Fix CSS for multi-line error msg

Should we remove the error code from displaying?
Should we change "user not found" to "incorrect user or password"? (to prevent password spamming / hacking)

*/

const authErrorModal = props => {
    // Destructuring the props
    const { errorModalVisible, setErrorModalVisible, errorCode, errorMsg } = props;

    return (
        <Modal
            animationType="fade"
            visible={errorModalVisible}
            transparent={true}
        >
            <View style={styles.background}>
                <View style={styles.modalBox}>

                    <Text style={styles.errorHeader}>Error</Text>

                    <Text style={styles.errorMsg}>
                        {
                            errorCode.length !== 0 &&
                            'Error Code: "' + errorCode + '" - '
                        }
                        {errorMsg}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            setErrorModalVisible(!errorModalVisible);
                        }}
                        style={styles.dismissButton}
                    >
                        <Text style={styles.dismissText}>Dismiss</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBox: {
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
        width: '75%',
        height: '25%',
        borderRadius: 30,
        padding: 20
    },
    background: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    errorHeader: {
        fontFamily: 'Helvetica Neue',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        color: 'black'
    },
    dismissButton: {
        height: 30,
        width: 100,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#050E40',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    dismissText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#050E40'
    },
    errorMsg: {
        fontFamily: 'Helvetica Neue',
        fontSize: 17,
        color: 'red',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default authErrorModal;
