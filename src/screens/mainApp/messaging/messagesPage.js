import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import ChatPage from './chatPage';
import MyContext from '../../../utils/MyContext';
import LoadingScreen from '../../../utils/loadingScreen';

/* TODO
1. Have the time stamps on messages respect the users' specified timezones
2. Redo MessagePreview UI

*/

//This username list will be very memory intensive once the userbase grows.
//It would be best to simply query for the user that matches the correct UID

const MessagePreview = (props) => {
    let { formatDate } = React.useContext(MyContext);

    //This component shows a conversation's latest message.
    //It has the title of the conversation (usually the user), the message itself, and the time send
    return (
        <TouchableOpacity
            style={styles.messagePreviewBg}
            onPress={props.onPress}
        >

            <View style={styles.messagePreviewHeader}>

                <View style={styles.messagePreviewTitleView}>

                    {/* Insert status icon here */}

                    <Text style={styles.messagePreviewTitleText}>
                        {props.users[0]}
                    </Text>

                </View>

                <Text style={styles.messagePreviewTime}>
                    {formatDate(props.latestTime.toDate())}
                </Text>

            </View>

            <View style={styles.messagePreviewTextView}>
                <Text
                    style={styles.messagePreviewText}
                    numberOfLines={2}
                >
                    {props.latestText}
                </Text>
            </View>

        </TouchableOpacity>
    );
};

export default function MessagesPage() {
    let [messagePreviews, setMessagePreviews] = React.useState([]);
    let [chatModalVisible, setChatModalVisible] = React.useState(false);
    let [curChatID, setCurChatID] = React.useState('');

    let [isLoading, setIsLoading] = React.useState(true);

    let { user } = React.useContext(MyContext);
    const userUID = (user) ? user.uid : '';

    React.useEffect(() => {
        // save useruid --> username doc
        let uidToUsernameList = {};
        firebase.firestore().collection('userAuth').doc('uidToUsername').get()
            .then(uidToUsernameDoc => {
                uidToUsernameList = uidToUsernameDoc.data();
            })
            .catch(error => {
                console.log(error);
            });

        firebase.firestore().collection('userInfo').doc(userUID).collection('chats').orderBy('latestTime', 'desc').get()
            .then(chats => {
                chats.forEach(chatroomIDDoc => {
                    // get chat ID
                    let chatroomID = chatroomIDDoc.id;

                    // setup chat preview
                    let chat = {
                        chatID: chatroomID,
                        users: [],
                        latestText: '',
                        latestTime: undefined
                    };

                    firebase.firestore().collection('chatrooms').doc(chatroomID).get()
                        .then(chatroomDoc => {
                            let chatroomData = chatroomDoc.data();

                            // push usernames to chat.users[]
                            chatroomData.users.forEach(chatUserUID => {
                                if (chatUserUID === userUID) return;
                                chat.users.push(uidToUsernameList[chatUserUID]);
                            });

                            // get latest message text & time
                            chat.latestText = chatroomData.latestMsg.text;
                            chat.latestTime = chatroomData.latestMsg.time;

                            setMessagePreviews(messagePreviews => [...messagePreviews, chat]);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
            })
            .catch(error => {
                console.log(error);
            });

        // Timeout for loading screen
        let timeoutID = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timeoutID);
    }, []);

    const viewChat = (chatID) => {
        setCurChatID(chatID);
        setChatModalVisible(true);
    };

    const closeChat = () => {
        setChatModalVisible(false);
    };

    if (isLoading) return <Modal animationType='fade'><LoadingScreen /></Modal>

    return (
        <View style={styles.background}>

            {
                messagePreviews.length === 0 &&
                <View style={styles.inboxEmptyView}>

                    <View style={styles.inboxEmptyMessagesPageHeaderView}>
                        <Text style={styles.inboxEmptyMessagesPageHeaderText}>
                            Messages
                        </Text>
                    </View>

                    <Text style={styles.inboxEmptyText}>
                        Inbox Empty{'\n'}
                        Message others using the search tab!
                    </Text>

                </View>
            }

            {
                messagePreviews.length > 0 &&
                <View style={styles.messagesPageContainer}>

                    <View style={styles.messagesPageHeaderView}>
                        <Text style={styles.messagesPageHeaderText}>
                            Messages
                        </Text>
                    </View>

                    <FlatList
                        style={styles.flatList}
                        data={messagePreviews}
                        keyExtractor={(item) => item.chatID}
                        renderItem={({ item }) =>
                            <MessagePreview
                                users={item.users}
                                latestText={item.latestText}
                                latestTime={item.latestTime}
                                onPress={() => viewChat(item.chatID)}
                            />
                        }
                    />

                </View>
            }

            {
                chatModalVisible &&
                // <Modal onRequestClose={closeChat}>
                //     {/* <TouchableOpacity onPress={closeChat}>
                //         <View style={{height: 100, width: 100, borderWidth: 1, backgroundColor: 'gray'}}>
                //             <Text>
                //                 hi
                //             </Text>
                //         </View>
                //     </TouchableOpacity> */}
                //     <ChatPage
                //         curChatID={curChatID}
                //         closeChat={closeChat}
                //     />
                // </Modal>
                <ChatPage
                    curChatID={curChatID}
                    closeChat={closeChat}
                />
            }

        </View>
    );

};

const styles = StyleSheet.create({
    // message preview
    messagePreviewBg: {
        width: '100%',
        height: 85,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 21,
        // temp
        // borderWidth: 1,
        // borderColor: 'green'
    },
    messagePreviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // temp
        // borderWidth: 1,
        // borderColor: 'sienna'
    },
    messagePreviewTitleView: {
        flexDirection: 'row',
        // temp
        // borderWidth: 1,
        // borderColor: 'hotpink'
    },
    messagePreviewTitleText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 15,
        color: '#104150',
        fontWeight: '600',
        margin: 5,
        marginLeft: 0,
        textAlign: 'left',
        textAlignVertical: 'center'
    },
    messagePreviewTime: {
        fontFamily: 'HelveticaNeue',
        fontSize: 13,
        color: '#969696',
        textAlign: 'right',
        textAlignVertical: 'center'
    },
    messagePreviewTextView: {
        height: 35
    },
    messagePreviewText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 13,
        color: '#969696',
        // temp
        // borderWidth: 1,
        // borderColor: 'plum'
    },
    // messages page
    background: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        height: '100%'
    },
    // inbox empty
    inboxEmptyView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inboxEmptyMessagesPageHeaderView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    inboxEmptyMessagesPageHeaderText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 30,
        fontWeight: '600',
        color: '#104150'
    },
    inboxEmptyText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 13,
        fontWeight: '600',
        color: '#969696',
        textAlign: 'center',
        lineHeight: 20
    },
    // inbox NOT empty
    messagesPageContainer: {
        width: '100%',
        top: 0,
        justifyContent: 'flex-start',
        // temp
        // borderWidth: 1,
        // borderColor: 'black'
    },
    messagesPageHeaderView: {
        top: 0,
        width: '100%',
        height: 105,
        // temp
        // borderWidth: 1,
        // borderColor: 'crimson'
    },
    messagesPageHeaderText: {
        fontFamily: 'HelveticaNeue',
        fontSize: 30,
        fontWeight: '600',
        color: '#104150',
        left: 25,
        top: 50
    },
    flatList: {
        // position: 'absolute',
        // top: 125,
        width: '100%',
        paddingHorizontal: 5,
        // temp
        // borderWidth: 1,
        // borderColor: 'skyblue'
    }
});
