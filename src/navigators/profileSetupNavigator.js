import ProfileSetup from '../screens/profileSetup/profileSetup';
// import BioInfo from '../screens/profileSetup/bioInfo';
// import BeliefsOne from '../screens/profileSetup/beliefsOne';
// import BeliefsTwo from '../screens/profileSetup/beliefsTwo';
// import PersonalityOne from '../screens/profileSetup/personalityOne';
// import About from '../screens/profileSetup/about';
// import Interests from '../screens/profileSetup/interests';
import AppNavigator from '../navigators/appNavigator'
import { createSwitchNavigator, createAppContainer, withNavigation } from 'react-navigation';

/*TODO

*/

const ProfileSetupNavigator = createSwitchNavigator({
    ProfileSetup: {
        screen: ProfileSetup
    },
    // BioInfo: {
    //     screen: BioInfo
    // },
    // BeliefsOne: {
    //     screen: BeliefsOne
    // },
    // BeliefsTwo: {
    //     screen: BeliefsTwo
    // },
    // PersonalityOne: {
    //     screen: PersonalityOne
    // },
    // Interests: {
    //     screen: Interests
    // },
    // About: {
    //     screen: About
    // },
    Home: {
        screen: AppNavigator
    }
},
    {
        initialRouteName: 'ProfileSetup'
    });

export default createAppContainer(ProfileSetupNavigator);
