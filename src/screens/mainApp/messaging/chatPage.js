import React from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import MyContext from '../../../utils/MyContext';
import LoadingScreen from '../../../utils/loadingScreen';

/* TODO 
1. When the page first loads, the messages begin to add in one by one. They should all be loaded beforehand.
2. Have text input expand vertically instead of horizontally when typing a large message
3. Better shadow for iOS & Android (universal)
4. Show keyboard on iOS

*/

const Message = ({messageBackgroundStyle, messageTextStyle, message}) => {
    // Individual message "bubble" containing text
    // Props change look of message bubble (sent vs recevied)
    return (
        <View style={messageBackgroundStyle}>
            <Text style={messageTextStyle}>
                {message}
            </Text>
        </View>
    );
};

export default function ChatPage({curChatID, closeChat}) {
    // props = curChatID & closeChat()

    let [conversation, setConversation] = React.useState([]);
    let [message, setMessage] = React.useState('');
    let [username, setUsername] = React.useState('');

    let [isLoading, setIsLoading] = React.useState(true);

    let { user } = React.useContext(MyContext);
    const userUID = (user) ? user.uid : '';

    const curChatRef = firebase.firestore().collection('chatrooms').doc(curChatID);
    const messagesCollectionRef = curChatRef.collection('messages');
    const userInfoCollectionRef = firebase.firestore().collection('userInfo');
    let users = [];

    React.useEffect(() => {
        // get users[]
        curChatRef.get()
            .then(curChatDoc => {
                users = curChatDoc.data().users;
                userInfoCollectionRef.doc(users[0] === userUID ? users[1] : users[0]).get()
                    .then(doc => {
                        setUsername(doc.data().username);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
        
        // messagesCollectionRef.orderBy('time', 'desc').get()
        //     .then(messages => {
        //         messages.docs.forEach(msg => {
        //             setConversation(conversation => [msg.data(), ...conversation])
        //         });
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        // Listen for updates in conversation
        let unsubscribe = messagesCollectionRef.orderBy('time', 'asc')
            .onSnapshot((snapshot) => {
                snapshot.docChanges.forEach((change) => {
                    if (change.type === 'added') {
                        setConversation(conversation => [change.doc.data(), ...conversation]);
                    }
                    // if (change.type === "modified") {
                    //     console.log("Modified city: ", change.doc.data());
                    // }
                    // if (change.type === "removed") {
                    //     console.log("Removed city: ", change.doc.data());
                    // }
                });
            }, error => {
                console.error(error);
            });

        // Timeout for loading screen
        let timeoutID = setTimeout(() => setIsLoading(false), 500);
        return () => {
            clearTimeout(timeoutID);

            // When user closes chatPage, stop listening for updates
            unsubscribe();
        }
    }, []);

    const sendMessage = () => {
        // don't send if message is blank
        if (message === '') {
            return;
        }

        // clear message input so user can't spam send message multiple times
        const msg = message;
        setMessage('');

        // create timestamp & new msg obj
        let now = firebase.firestore.Timestamp.now();
        let newMsgObj = {
            sender: userUID,
            text: msg,
            time: now
        };

        // add new msg doc to messages collection
        messagesCollectionRef.doc().set(newMsgObj)
            .catch(error => {
                console.error(error);
            });

        // update latest msg field
        curChatRef.update({
            latestMsg: newMsgObj
        })
            .catch(error => {
                console.error(error);
            });

        // update users' latest msgs info
        users.forEach((userID) => {
            userInfoCollectionRef.doc(userID).collection('chats').doc(curChatID).set({ latestTime: now });
        });
    };

    if (isLoading) return <Modal animationType='fade' ><LoadingScreen /></Modal>

    return (
        <Modal style={styles.background} onRequestClose={closeChat} animationType='fade'>

            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={closeChat}
                >
                    <View style={styles.backButtonView}>
                        <Text style={styles.backButtonText}>
                            &lt;
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.chatTitleView}>
                    <Text style={styles.chatTitleText}>
                        {username}
                    </Text>
                </View>

            </View>

            {
                conversation.length > 0 &&
                <FlatList
                    data={conversation}
                    inverted
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <Message
                            message={item.text}
                            messageBackgroundStyle={(item.sender === userUID) ? styles.userMessageBackground : styles.receiverMessageBackground}
                            messageTextStyle={(item.sender === userUID) ? styles.userMessageText : styles.receiverMessageText}
                        />
                    }
                    // style={styles.messages}
                    contentContainerStyle={styles.messages}
                />
            }

            <View style={styles.bottom}>

                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.messageText}
                        value={message}
                        placeholder='Type a message...'
                        placeholderTextColor='#C3D4D9'
                        textAlignVertical='center'
                        multiline={true}
                        onChangeText={msg => setMessage(msg)}
                    />
                </View>

                <TouchableOpacity
                    onPress={sendMessage}
                    style={styles.sendButton}
                >
                    <Text style={styles.sendText}>
                        Send
                    </Text>
                </TouchableOpacity>

            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0
    },
    header: {
        height: 60,
        flexDirection: 'row',
        width: '100%'
    },
    backButtonContainer: {
        width: '20%',
        height: '100%',
        // temp
        // borderWidth: 1,
        // borderColor: 'green'
    },
    backButtonView: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    backButtonText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 30,
        color: '#98AFB3',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    chatTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
        height: '100%',
        paddingLeft: 20,
        // temp
        // borderWidth: 1,
        // borderColor: 'blue'
    },
    chatTitleText: {
        fontFamily: 'HelveticaNeue',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '600',
        color: '#98AFB3',
        textAlignVertical: 'center',
        // temp
        // borderWidth: 1,
        // borderColor: 'red'
    },
    userMessageBackground: {
        marginBottom: 5,
        right: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#104150',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '70%',
        borderRadius: 20,
        borderTopRightRadius: 0,
        paddingVertical: 8,
        paddingHorizontal: 10,
        // shadow
        shadowColor: '#104150',
        shadowOpacity: 0.5,
        shadowRadius: 20
    },
    receiverMessageBackground: {
        marginBottom: 5,
        left: 20,
        alignSelf: 'flex-start',
        backgroundColor: '#F2F2F2',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '70%',
        borderRadius: 20,
        borderTopLeftRadius: 0,
        paddingVertical: 8,
        paddingHorizontal: 15,
        // shadow
        shadowColor: '#F2F2F2',
        shadowOpacity: 0.5,
        shadowRadius: 20
    },
    userMessageText: {
        fontFamily: 'HelveticaNeue',
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
    receiverMessageText: {
        fontFamily: 'HelveticaNeue',
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '600',
        color: '#323333'
    },
    messages: {
        paddingVertical: 10
    },
    bottom: {
        alignSelf: 'center',
        margin: 5,
        width: '90%',
        borderColor: '#C3D4D9',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'flex-end',
        minHeight: 40,
    },
    textInputContainer: {
        width: '80%',
        minHeight: 40,
        maxHeight: 160,
        justifyContent: 'center',
        paddingHorizontal: 10,
        // paddingVertical: 5,
        borderRadius: 13
    },
    messageText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        fontSize: 13,
        minHeight: 40,
        padding: 0
    },
    sendButton: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#104150',
        borderRadius: 13
    },
    sendText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: '600',
        fontSize: 15,
        color: 'white'
    }
});
