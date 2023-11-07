import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import firebase from 'react-native-firebase'

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutInput: ''
    };
  }

  submitData () {
    const useruid = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection('userInfo').doc(useruid)
    ref.update({
        about: this.state.aboutInput,
        })
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style = {styles.background}>
        <Text style = {styles.aboutTitle}>
        About
        </Text>

        <Text style = {styles.aboutPrompt}>
        Write a small note to anyone viewing your profile
        </Text>

        <View style = {styles.textInputContainer}>
          <TextInput 
          style = {styles.placeholderFont}
          placeholder = 'Please write here'
          placeholderColor = '#595959'
          onChangeText = {(value) => this.setState({aboutInput: value})}>


          </TextInput>

        </View>

        <TouchableOpacity style = {styles.nextContainer}
          onPress = {() => this.submitData()}>
            <Text style = {styles.nextFont}>
            Submit
            </Text>

          </TouchableOpacity>
        


      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F3F5'
  },
  aboutTitle: {
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#050E40'
  },
  aboutPrompt: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 15,
    color: '#050E40'
  },
  textInputContainer: {
    height: '50%',
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'center'

  },
  placeholderFont: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: 13,
  },
  nextContainer: {
    height: 30,
    width: 100,
    backgroundColor: '#000000',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    },
  nextFont: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF'
},
})