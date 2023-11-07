import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import firebase from 'react-native-firebase';
import UserPage from './userPage';
import LoadingScreen from '../../../utils/loadingScreen.js';

/* TODO
(DONE) 1. Show accurate gender icon
2. Don't display self in results
3. New CSS design

*/

const ProfilePreview = (props) => {
    // Destructuring the props
    const { onPress, username, interestsMatched, personalityMatched, gender } = props;

    return (
        <TouchableOpacity
            style={styles.profilePreview}
            onPress={onPress}>

            <ImageBackground
                style={styles.genderImage}
                source={
                    (gender === 'Female') ? require('../../../resources/images/genderFemale.png') :
                        (
                            (gender === 'Male') ?
                                require('../../../resources/images/genderMale.png') :
                                require('../../../resources/images/genderOther.png')
                        )
                }
            >

                <Text style={styles.ageNumber}>
                    {props.age}
                </Text>

            </ImageBackground>

            <Text style={styles.previewUsernameText}>
                {username}
            </Text>

            <View style={styles.matchedContainer}>

                <Text style={styles.interestsMatchedText}>
                    {interestsMatched}/3
                </Text>

                <Text style={styles.personalityMatchedText}>
                    {personalityMatched}/4
                </Text>

            </View>

        </TouchableOpacity>
    );
};

export default function ResultsPage(props) {
    let [matchedUsers, setMatchedUsers] = React.useState([]);
    let [profileData, setProfileData] = React.useState([]);
    let [receiverUID, setReceiverUID] = React.useState('');
    let [modalVisible, setModalVisible] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);

    onPressFilter = () => {
        props.navigation.navigate('Filter');
    };

    onPressProfile = (user) => {
        setProfileData(user.userArray);
        setReceiverUID(user.uid);
        setModalVisible(true);
    };

    goBack = () => {
        setModalVisible(false);
    };

    React.useEffect(() => {
        if (matchedUsers.length === 0) {
            const useruid = firebase.auth().currentUser.uid;

            firebase.firestore().collection('queries').doc('query' + useruid).collection('users')
                .orderBy('totalMatched', 'desc').get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        console.log('No documents.');
                    }
                    else {
                        snapshot.forEach(doc => {
                            const data = doc.data();
                            const uid = { uid: doc.id };
                            const userData = { ...data, ...uid };
                            setMatchedUsers(matchedUsers => [...matchedUsers, userData]);
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }

        // Timeout for loading screen
        let timeoutID = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timeoutID);
    }, []);
        
    if (isLoading) return <Modal animationType='fade'><LoadingScreen /></Modal>

    return (
        <View style={styles.background}>

            <View style={styles.topBar}>

                <Text style={styles.searchHeader}>Search</Text>

                <TouchableOpacity onPress={onPressFilter}>
                    <Image style={{width: 25, height: 25}}
                    source = {require('./../../../resources/icons/filterButton.png')}>

                    </Image>
                </TouchableOpacity>

            </View>

            {
                matchedUsers.length === 0 &&
                <View>
                    <Text>
                        Please Filter to Find Users
                    </Text>
                </View>
            }
            
            {
                matchedUsers.length > 0 &&
                <FlatList
                    contentContainerStyle={styles.resultsList}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    data={matchedUsers}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={
                        ({ item }) =>
                            <ProfilePreview
                                username={item.userArray.username}
                                interestsMatched={item.interestsMatched}
                                personalityMatched={item.personalityMatched}
                                onPress={() => onPressProfile(item)}
                                gender={item.userArray.gender}
                            />
                    }
                />
            }

            <Modal
                visible={modalVisible}
                onRequestClose={goBack}
                animationType='fade'
            >
                <UserPage
                    userData={profileData}
                    goBack={goBack}
                    receiverUID={receiverUID}
                />
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F0F3F5'
    },
    topBar: {
        width: '100%',
        paddingHorizontal: 50,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    filterText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        fontSize: 15,
        // color: '#F0F3F5'
        color: '#626D75'
    },
    resultsList: {
        width: '100%',
        padding: 10
    },
    row: {
        flex: 1,
        justifyContent: 'center'
    },
    genderImage: {
        marginVertical: 20,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ageNumber: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#050E40'
    },
    matchedContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    interestsMatchedText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: '300',
        fontSize: 15,
        color: '#404040',
        marginRight: 10
    },
    personalityMatchedText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: '300',
        fontSize: 15,
        color: '#404040',
        marginLeft: 10
    },
    profilePreview: {
        width: '43%',
        height: 210,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        margin: 5
    },
    previewUsernameText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#404040'
    }
});
