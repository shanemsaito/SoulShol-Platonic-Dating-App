import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase'
import MyContext from '../../utils/MyContext';

function HomePage(props) {
    let [userData, setUserData] = React.useState([]);
    
    let { user, setUser } = React.useContext(MyContext);
    const userUID = (user) ? user.uid : '';
    
    let infoRef = firebase.firestore().collection('userInfo').doc(userUID);

    const handleSignOut = () => {
        firebase.auth().signOut().then(()=>{
            setUser(undefined);
            props.navigation.navigate('Login');
        }).catch(error => {
            console.log(error);
        });
        // props.navigation.navigate('Login');
    };

    React.useEffect(() => {
        infoRef.get().then((doc) => {
            if (doc.exists) {
                setUserData(doc.data());
            }
        });
    }, []);

    return (
        <View style={styles.background}>

            <Text style={styles.usernameText}>
                {userData.username}
            </Text>

            <View style={styles.bioBackground}>

                <Text style={styles.bioTitle}>
                    About
                </Text>

                <Text style={styles.bioText}>
                    {userData.about}
                </Text>

            </View>

            <View style={styles.bioBackground}>

                <Text style={styles.bioTitle}>
                    Bio
                </Text>

                <Text style={styles.bioText}>
                    Birthday: {userData.month} / {userData.date} / {userData.year}
                </Text>

                <Text style={styles.bioText}>
                    Gender: {userData.gender}
                </Text>

                <Text style={styles.bioText}>
                    Religion: {userData.religion} {userData.religiousIntensity}
                </Text>

                <Text style={styles.bioText}>
                    Politics: {userData.politics} {userData.politicalIntensity}
                </Text>

            </View>

            <View style={styles.bioBackground}>

                <Text style={styles.bioTitle}>
                    Interests
                </Text>

                <Text style={styles.bioText}>
                    {userData.interestOne}
                </Text>

                <Text style={styles.bioText}>
                    {userData.interestTwo}
                </Text>

                <Text style={styles.bioText}>
                    {userData.interestThree}
                </Text>

            </View>

            <TouchableOpacity
                style={styles.toLoginContainer}
                onPress={handleSignOut}
            >
                <Text style={styles.toLoginFont}>
                    Sign Out
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default withNavigation(HomePage);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F3F5'
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
        paddingHorizontal: '4%'
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
        margin: 8
    },
    toLoginFont: {
        fontFamily: 'HelveticaNeue',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
});
