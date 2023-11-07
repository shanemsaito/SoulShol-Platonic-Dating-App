import { createBottomTabNavigator, createAppContainer, withNavigation, createSwitchNavigator } from 'react-navigation';
import ResultsPage from '../screens/mainApp/searchPage/resultsPage';
import FilterTab from '../screens/mainApp/searchPage/filterTab';

const SearchNavigator = createSwitchNavigator({
    Results: {
        screen: ResultsPage
    },
    Filter: {
        screen: FilterTab
    }
},
    {
        initialRouteName: 'Results'
    });

export default createAppContainer(SearchNavigator);
