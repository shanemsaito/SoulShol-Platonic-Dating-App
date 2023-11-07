import React from 'react';
import firebase from 'react-native-firebase';
import AuthNavigator from './src/navigators/authNavigator';
// import SearchNavigator from './src/navigators/searchNavigator';
// import AppNavigator from './src/navigators/appNavigator';
// import appNavigator from './src/navigators/appNavigator';
import MyContext from './src/utils/MyContext';
import LoadingScreen from './src/utils/loadingScreen';

export default function App() {
    let [user, setUser] = React.useState(undefined);

    const formatDate = (date) => {
        let millisecondsSince = Date.now() - date.getTime();

        // if date is within the last 24 hours: 'HH:MM AM/PM'
        if (millisecondsSince < 24 * 60 * 60 * 1000) {
            // handle hours formatting
            let dateHours = date.getHours();
            let ampm = ' AM';
            if (dateHours >= 12) ampm = ' PM';
            if (dateHours > 12) dateHours -= 12;
            if (dateHours === 0) dateHours += 12;

            let dateMinutes = date.getMinutes();

            return dateHours + ':' + (dateMinutes < 10 ? '0' + dateMinutes : dateMinutes) + ampm;
        }

        // else if date is in the current year: 'Mth (D)D'
        else if (date.getFullYear() === new Date(Date.now()).getFullYear()) {
            return date.toDateString().slice(4, 8) + date.getDate();
        }

        // finally, if date is before the current year: 'MM/DD/YYYY'
        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    };

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var isAnonymous = user.isAnonymous;
                // var uid = user.uid;
                // var providerData = user.providerData;

                setUser(user);
            } else {
                // User is signed out.
                // setUser(undefined);
                setUser(undefined);
            }
        });
    }, []);

    return (
        <MyContext.Provider value={{ user, setUser, formatDate }}>
            <AuthNavigator />
        </MyContext.Provider>
    );
};
