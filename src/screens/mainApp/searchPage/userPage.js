import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import firebase from 'react-native-firebase'

/*
TODO:
1. When a user sends a message, they cannot click out of the message modal.
*/

export default class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {      
             modalVisible: false,
             message: ''
        };
    }

    openMessage = () => {
        this.setState({modalVisible: true})
    }

    sendMessage = () => {
        const senderUID = firebase.auth().currentUser.uid
        const receiverUID = this.props.receiverUID
        const messageRef = firebase.database().ref('messages/conversations/' + senderUID +  '_' + receiverUID)
        const recentMessagesReceiverRef = firebase.database().ref('messages/recentMessages/' + receiverUID + '/' + senderUID)
        const recentMessagesSenderRef = firebase.database().ref('messages/recentMessages/' + senderUID + '/' + receiverUID)
        messageRef.push({
            sender: senderUID,
            message: this.state.message,
            time: Date.now(),
            
        })
        recentMessagesReceiverRef.set({
            sender: senderUID,
            receiver: receiverUID,
            message: this.state.message,
            time: Date.now()
        })
        recentMessagesSenderRef.set({
            sender: senderUID,
            receiver: receiverUID,
            message: this.state.message,
            time: Date.now()
        })
    }

    render () {
        return (
            <View style = {styles.background}>

                <TouchableOpacity onPress = {this.props.goBack}>
                    <Text>
                    Back
                    </Text>
                </TouchableOpacity>

                <Text style = {styles.usernameText}>
                {this.props.userData.username}
                </Text>

                <View style = {styles.bioBackground}>
                    <Text style = {styles.bioTitle}>
                    About
                    </Text>

                    <Text style = {styles.bioText}>
                    {this.props.userData.about}
                    </Text>
                </View>

                <View style = {styles.bioBackground}>

                    <Text style = {styles.bioTitle}>
                    Bio
                    </Text>

                    <Text style = {styles.bioText}>
                    Birthday: {this.props.userData.month} / {this.props.userData.date} / {this.props.userData.year}
                    </Text>

                    <Text style = {styles.bioText}>
                    Gender: {this.props.userData.gender}
                    </Text>

                    <Text style = {styles.bioText}>
                    Religion: {this.props.userData.religion} {this.props.userData.religiousIntensity}
                    </Text>

                    <Text style = {styles.bioText}>
                    Politics: {this.props.userData.politics} {this.props.userData.politicalIntensity}
                    </Text>

                </View>

                <View style = {styles.bioBackground}>

                    <Text style = {styles.bioTitle}>
                    Interests
                    </Text>

                    <Text style ={styles.bioText}>
                    {this.props.userData.interestOne}
                    </Text>

                    <Text style ={styles.bioText}>
                    {this.props.userData.interestTwo}
                    </Text>

                    <Text style ={styles.bioText}>
                    {this.props.userData.interestThree}
                    </Text>

                    
                </View>

                <TouchableOpacity onPress = {this.openMessage}>
                    <Text>
                    Message
                    </Text>
                </TouchableOpacity>

                <Modal 
                visible = {this.state.modalVisible}
                style = {styles.modalFormat}
                transparent = {true}
                presentationStyle = 'overFullScreen'
                animationType = 'fade'>
                    <View style = {styles.modalBackground}>

                    
                    <View style = {styles.messageContainer}>
                        <Text style = {styles.messageToText}>
                        To {this.props.userData.username}
                        </Text>

                        <View style = {styles.messageInput}>
                        <TextInput 
                        style = {styles.messagePlaceholderText}
                        placeholder = 'Write your message here...'
                        placeholderTextColor = '#707070'
                        onChangeText = {message => this.setState({ message })}
                        />
                        </View>

                        <TouchableOpacity onPress = {this.sendMessage}>
                            <View style = {styles.sendMessageButton}>
                                <Text style = {styles.sendMessageText}>
                                Send Message
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>

            

            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F3F5',
    },
    usernameText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#050E40'
    },
    bioBackground: {
        width: '92%',
        height: 170,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingHorizontal: '4%',
    },
    bioTitle: {
        fontFamily: 'HelveticaNeue',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#707070'
    },
    bioText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 15,
        fontWeight: '300',
        color: '#C4C4C4'
    },
    toLoginContainer: {
        height: 30,
        width: 100,
        backgroundColor: '#000000',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    toLoginFont: {
        fontFamily: 'HelveticaNeue',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    modalFormat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    messageContainer: {
        height: '45%', 
        width: '83%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: '11%'
    },
    messageToText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#707070',
        marginTop: 40,
    },
    messageInput: {
        width: '100%',
        height: '62%',
        marginTop: 12,
    },
    messagePlaceholderText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: '300',
        fontSize: 15,
    },
    sendMessageButton: {
        width: 120,
        height: 30,
        backgroundColor: '#050E40',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendMessageText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 10,
    }


})