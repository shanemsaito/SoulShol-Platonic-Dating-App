import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import SearchPage from './resultsPage'
/*
Okay, so how are we going to retrieve the data?
We need to bind the data to a doc.
HOW DO WE MAKE SURE WE DONT ORDER OUR OWN USER?

Okay, we need to get the useruids that match the parameters I have specified, okay?
*/

class FilterTab extends Component {


    constructor(props) {
        super(props);
        this.state = {
        
        gender: 'Any',
        ageMin: 'Any',
        ageMax: 'Any',
        religiousIntensity: 'Any',
        religion: 'Any',
        politicalIntensity: 'Any',
        politics: 'Any',
        profanity: 'Any',
        interestOne: 'Any',
        interestTwo: 'Any',
        interestThree: 'Any',
        modalVisible: false,
        placeholderUser: [],
        matchedUsers: [],
        personalityMatched: 0,
        interestsMatched: 0,
        
        };
    }
    
    /*
    * The query process
    First we create a document called query with a unique ID number, then we fill it with all the criteria
    Wait we might not have to do that

    We will create a loop that goes through all criteria, the criteria will have to be numbers. So lets say the gender field is number 1.
    We would make the loop go from 0 to whatever. If a document matches it, then we add one to a state called amountMatched.
    Once we have gone through the entire document, we will create a new document in a query collection that has the document
    with all of the values as well as the amountMatched value.
    Then on the searchTab we will display all documents within that query collection ordered by amountMatched. 
    */



    findResults = () => {
        const useruid = firebase.auth().currentUser.uid

        const queryRef = firebase.firestore().collection('userInfo')

        

        const personalityFieldArray = [
            'religion',
            'religiousIntensity',
            'politics',
            'politicalIntensity',
        ]

        const interestFieldArray = [
            'interestOne',
            'interestTwo',
            'interestThree',
        ]

        const personalityQuery = [
            this.state.religion,
            this.state.religiousIntensity,
            this.state.politics,
            this.state.politicalIntensity,
        ]

        firebase.firestore().collection('queries').doc('query' + useruid).delete()

        if (this.state.gender != 'Any') {
            queryRef.where( 'gender', '==', this.state.gender).get().then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return;
                }
                snapshot.forEach(doc => {
                    if (doc.id === firebase.auth().currentUser.uid) {
                        return;
                    }

                    this.setState({placeholderUser: doc.data()})
                    for (let i = 0; i < personalityQuery.length; i++) {
                        if (this.state.placeholderUser[personalityFieldArray[i]] === personalityQuery[i]) {
                            this.setState({personalityMatched: this.state.personalityMatched + 1})
                            }
                        }
                    for (var i = 0; i < interestFieldArray.length; i++) {
                        if (this.state.placeholderUser[interestFieldArray[i]] == this.state.interestOne) {
                            this.setState({interestsMatched: this.state.interestsMatched + 1})
                            }
                        if (this.state.placeholderUser[interestFieldArray[i]] == this.state.interestTwo) {
                            this.setState({interestsMatched: this.state.interestsMatched + 1})
                            }
                        if (this.state.placeholderUser[interestFieldArray[i]] == this.state.interestThree) {
                            this.setState({interestsMatched: this.state.interestsMatched + 1})
                            }
                        }
                    
                    firebase.firestore().collection('queries').doc('query' + useruid).set({
                        queriedBy: firebase.auth().currentUser.uid
                    })
                    firebase.firestore().collection('queries').doc('query' + useruid).collection('users').doc(doc.id).set({
                        userArray: doc.data(),
                        personalityMatched: this.state.personalityMatched,
                        interestsMatched: this.state.interestsMatched,
                        totalMatched: this.state.personalityMatched + this.state.interestsMatched
                    }).then(
                        this.setState({personalityMatched: 0, interestsMatched: 0}),
                        
                    )
                })
                })
        }
        else {
        queryRef.where('date', '>', '0').get().then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
        snapshot.forEach(doc => {
            if (doc.id === firebase.auth().currentUser.uid) {
                return;
            }
            this.setState({placeholderUser: doc.data()})
            for (var i = 0; i < personalityFieldArray.length; i++) {
                if (this.state.placeholderUser[personalityFieldArray[i]] === personalityQuery[i]) {
                    this.setState({personalityMatched: this.state.personalityMatched + 1})
                }
            }
            for (var i = 0; i < interestFieldArray.length; i++) {
                if (this.state.placeholderUser[interestFieldArray[i]] == this.state.interestOne) {
                    this.setState({interestsMatched: this.state.interestsMatched + 1})
                }
                if (this.state.placeholderUser[interestFieldArray[i]] == this.state.interestTwo) {
                    this.setState({interestsMatched: this.state.interestsMatched + 1})
                }
                if (this.state.placeholderUser[interestFieldArray[i]] == this.state.interestThree) {
                    this.setState({interestsMatched: this.state.interestsMatched + 1})
                }
            }
            
            firebase.firestore().collection('queries').doc('query' + useruid).set({
                queriedBy: firebase.auth().currentUser.uid
            })
            firebase.firestore().collection('queries').doc('query' + useruid).collection('users').doc(doc.id).set({
                userArray: doc.data(),
                personalityMatched: this.state.personalityMatched,
                interestsMatched: this.state.interestsMatched,
                totalMatched: this.state.personalityMatched + this.state.interestsMatched
            }).then(this.setState({personalityMatched: 0, interestsMatched: 0}))
            })
        })
        }
        
    }

    showResults = () => {
        this.props.navigation.navigate('Results')
    }
        


    render () {
        return (
            <View styles = {styles.background}>
                <Text>
                Filter
                </Text>

                <Text>
                Your Matching Preferences    
                </Text>

    
                <View style ={styles.filterAttribute}>
                    <Text style ={styles.attributeText}>
                    Gender:
                    </Text>
                    <Picker style = {styles.dropDown}
                    selectedValue = {this.state.gender}
                    onValueChange= {((value) => this.setState({gender: value}))}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Female' value = 'Female'/>
                        <Picker.Item label = 'Male' value = 'Male'/>
                        <Picker.Item label = 'Other' value = 'Other'/>
                    </Picker>

                </View>

                <View style ={styles.filterAttribute}>
                    <Text style ={styles.attributeText}>
                    Politics:
                    </Text>
                    <Picker style = {styles.dropDown}
                    selectedValue = {this.state.politics}
                    onValueChange= {((value) => this.setState({politics: value}))}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Liberal' value = 'Liberal'/>
                        <Picker.Item label = 'Moderate' value = 'Moderate'/>
                        <Picker.Item label = 'Conservative' value = 'Conservative'/>
                    </Picker>

                </View>
                

                <View style = {styles.filterAttribute}>

                    <Text style = {styles.attributeText}>
                    Political Intensity
                    </Text>


                    <Picker style = {styles.dropDown}
                    selectedValue = {this.state.politicalIntensity}
                    onValueChange= {(value) => this.setState({politicalIntensity: value})}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Passionate' value = 'Passionate'/>
                        <Picker.Item label = 'Moderate' value = 'Moderate'/>
                        <Picker.Item label = 'Uninterested' value = 'Uninterested'/>
                    </Picker>

                </View>

                <View style = {styles.filterAttribute}>

                    <Text style ={styles.attributeText}>
                    Religion
                    </Text>

                    <Picker style = {styles.dropDown} //I MIGHT DO CHECK BOXES INSTEAD OF A DROP DOWN, TOO MANY OPTIONS HERE
                    selectedValue = {this.state.religion}
                    onValueChange= {(value) => this.setState({religion: value})}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Christianity' value = 'Christianity'/>
                        <Picker.Item label = 'Judaism' value = 'Judaism'/>
                        <Picker.Item label = 'Islam' value = 'Islam'/>
                        <Picker.Item label = 'Hinduism' value = 'Hinduism'/>
                        <Picker.Item label = 'Buddhism' value = 'Buddhism'/>
                    </Picker>

                </View>

                <View style = {styles.filterAttribute}>

                    <Text style ={styles.attributeText}>
                    Religious Intensity:
                    </Text>

                    <Picker style = {styles.dropDown} //I MIGHT DO CHECK BOXES INSTEAD OF A DROP DOWN, TOO MANY OPTIONS HERE
                    selectedValue = {this.state.religiousIntensity}
                    onValueChange= {(value) => this.setState({religiousIntensity: value})}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Passionate' value = 'Passionate'/>
                        <Picker.Item label = 'Moderate' value = 'Moderate'/>
                        <Picker.Item label = 'Uninterested' value = 'Uninterested'/>
                        
                    </Picker>

                </View>

                <View style = {styles.filterAttribute}>

                    <Text style ={styles.attributeText}>
                    InterestOne:
                    </Text>

                    <Picker style = {styles.dropDown} //I MIGHT DO CHECK BOXES INSTEAD OF A DROP DOWN, TOO MANY OPTIONS HERE
                    selectedValue = {this.state.interestOne}
                    onValueChange= {(value) => this.setState({interestOne: value})}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Economics' value = 'Economics'/>
                        <Picker.Item label = 'Philosophy' value = 'Philosophy'/>
                        <Picker.Item label = 'Code' value = 'Code'/>
                        <Picker.Item label = 'Reading' value = 'Reading'/>
                        <Picker.Item label = 'Athletics' value = 'Athletics'/>
                        <Picker.Item label = 'Business' value = 'Business'/>
                        
                    </Picker>

                </View>

                <View style = {styles.filterAttribute}>

                    <Text style ={styles.attributeText}>
                    InterestTwo:
                    </Text>

                    <Picker style = {styles.dropDown} //I MIGHT DO CHECK BOXES INSTEAD OF A DROP DOWN, TOO MANY OPTIONS HERE
                    selectedValue = {this.state.interestTwo}
                    onValueChange= {(value) => this.setState({interestTwo: value})}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Economics' value = 'Economics'/>
                        <Picker.Item label = 'Philosophy' value = 'Philosophy'/>
                        <Picker.Item label = 'Code' value = 'Code'/>
                        <Picker.Item label = 'Reading' value = 'Reading'/>
                        <Picker.Item label = 'Athletics' value = 'Athletics'/>
                        <Picker.Item label = 'Business' value = 'Business'/>
                        
                    </Picker>

                </View>

                <View style = {styles.filterAttribute}>

                    <Text style ={styles.attributeText}>
                    InterestThree:
                    </Text>

                    <Picker style = {styles.dropDown} //I MIGHT DO CHECK BOXES INSTEAD OF A DROP DOWN, TOO MANY OPTIONS HERE
                    selectedValue = {this.state.interestThree}
                    onValueChange= {(value) => this.setState({interestThree: value})}
                    mode = 'dropdown'>
                        <Picker.Item label = 'Any' value = 'Any'/>
                        <Picker.Item label = 'Economics' value = 'Economics'/>
                        <Picker.Item label = 'Philosophy' value = 'Philosophy'/>
                        <Picker.Item label = 'Code' value = 'Code'/>
                        <Picker.Item label = 'Reading' value = 'Reading'/>
                        <Picker.Item label = 'Athletics' value = 'Athletics'/>
                        <Picker.Item label = 'Business' value = 'Business'/>
                        
                    </Picker>

                </View>

                




                
                

                <TouchableOpacity onPress = {this.findResults}>
                    <Text>
                    Filter
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {this.showResults}>
                    <Text>
                    Show Results
                    </Text>
                </TouchableOpacity>
                
            


                

            </View>
        )
    }
}



export default FilterTab



const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F3F5'
    },
    filterAttribute: {
        flexDirection: 'row'
    },
    attributeText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#000000'
    },
    dropDown: {
        width: 200,
        height: 40,
        backgroundColor: '#FFFFFF'
    },
    dropDownText: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#000000'
    },
    dropDownMenu: {
        width: 200,
        height: 50,
        backgroundColor: '#FFFFFF'
    },
})