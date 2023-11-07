import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase'

export default class Beliefs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Religion
            religionSelected: '',
            religionInterested: true,

            // Politics
            politicsSelected: '',
            politicsInterested: true
        };
    };

    componentWillUnmount = () => {
        const useruid = firebase.auth().currentUser.uid;
        const ref = firebase.firestore().collection('userInfo').doc(useruid);
        ref.update({
            religion: (this.state.religionInterested ? this.state.religionSelected : ''),
            religionInterested: this.state.religionInterested,
            politics: (this.state.politicsInterested ? this.state.politicsSelected : ''),
            politicsInterested: this.state.politicsInterested
        });
    };

    onPressReligion = (religionSelected) => {
        this.setState({ religionSelected });
    };

    onPressPolitics = (politicsSelected) => {
        this.setState({ politicsSelected });
    };

    render() {
        return (
            <View style={styles.beliefsBackground}>

                {/* Header */}

                <View style={styles.headerContainer}>

                    <Text style={styles.headerText}>
                        Beliefs
                    </Text>

                    <Text style={styles.promptText}>
                        All Fields Are Required
                    </Text>

                </View>

                {/* Religion */}

                <Text style={styles.promptText}>
                    Religion:
                </Text>

                <View style={styles.religionSelections}>

                    <View style={styles.selectionRow}>

                        <TouchableOpacity
                            style={
                                this.state.religionInterested ? (this.state.religionSelected === 'Christian' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressReligion.bind(this, 'Christian')}
                        >
                            <Text style={(this.state.religionInterested && this.state.religionSelected === 'Christian') ? styles.selectedText : styles.unselectedText}>
                                Christian
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                this.state.religionInterested ? (this.state.religionSelected === 'Islamic' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressReligion.bind(this, 'Islamic')}
                        >
                            <Text style={(this.state.religionInterested && this.state.religionSelected === 'Islamic') ? styles.selectedText : styles.unselectedText}>
                                Islamic
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                this.state.religionInterested ? (this.state.religionSelected === 'Jewish' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressReligion.bind(this, 'Jewish')}
                        >
                            <Text style={(this.state.religionInterested && this.state.religionSelected === 'Jewish') ? styles.selectedText : styles.unselectedText}>
                                Jewish
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.selectionRow}>

                        <TouchableOpacity
                            style={
                                this.state.religionInterested ? (this.state.religionSelected === 'Buddhist' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressReligion.bind(this, 'Buddhist')}
                        >
                            <Text style={(this.state.religionInterested && this.state.religionSelected === 'Buddhist') ? styles.selectedText : styles.unselectedText}>
                                Buddhist
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                this.state.religionInterested ? (this.state.religionSelected === 'Hindu' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressReligion.bind(this, 'Hindu')}
                        >
                            <Text style={(this.state.religionInterested && this.state.religionSelected === 'Hindu') ? styles.selectedText : styles.unselectedText}>
                                Hindu
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                this.state.religionInterested ? (this.state.religionSelected === 'Atheist' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressReligion.bind(this, 'Atheist')}
                        >
                            <Text style={(this.state.religionInterested && this.state.religionSelected === 'Atheist') ? styles.selectedText : styles.unselectedText}>
                                Atheist
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <TouchableOpacity
                    style={styles.uninterestedCheck}
                    onPress={() => this.setState({ religionInterested: !this.state.religionInterested })}
                >

                    <View style={this.state.religionInterested ? styles.uninterestedBox : styles.uninterestedBoxChecked} />

                    <Text style={styles.uninterestedText}>
                        Uninterested in conversations about religion
                    </Text>

                </TouchableOpacity>

                {/* Politics */}

                <Text style={styles.promptText}>
                    Politics:
                </Text>

                <View>

                    <View style={styles.selectionRow}>

                        <TouchableOpacity
                            style={
                                this.state.politicsInterested ? (this.state.politicsSelected === 'Left' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressPolitics.bind(this, 'Left')}
                        >
                            <Text style={(this.state.politicsInterested && this.state.politicsSelected === 'Left') ? styles.selectedText : styles.unselectedText}>
                                Left
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                this.state.politicsInterested ? (this.state.politicsSelected === 'Moderate' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressPolitics.bind(this, 'Moderate')}
                        >
                            <Text style={(this.state.politicsInterested && this.state.politicsSelected === 'Moderate') ? styles.selectedText : styles.unselectedText}>
                                Moderate
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                this.state.politicsInterested ? (this.state.politicsSelected === 'Right' ? styles.selectedContainer : styles.unselectedContainer) : styles.uninterestedContainer
                            }
                            onPress={this.onPressPolitics.bind(this, 'Right')}
                        >
                            <Text style={(this.state.politicsInterested && this.state.politicsSelected === 'Right') ? styles.selectedText : styles.unselectedText}>
                                Right
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <TouchableOpacity
                    style={styles.uninterestedCheck}
                    onPress={() => this.setState({ politicsInterested: !this.state.politicsInterested })}
                >

                    <View style={this.state.politicsInterested ? styles.uninterestedBox : styles.uninterestedBoxChecked} />

                    <Text style={styles.uninterestedText}>
                        Uninterested in conversations about politics
                    </Text>

                </TouchableOpacity>

            </View>
        );
    };
};

const styles = StyleSheet.create({
    beliefsBackground: {
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        width: '92%',
        height: 455,
        borderRadius: 30,
        marginVertical: 12,
        padding: 24
    },
    headerContainer: {
        justifyContent: 'space-between'
    },
    headerText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#050E40'
    },
    promptText: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#575757'
    },
    selectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    uninterestedContainer: {
        width: '30%',
        height: 26,
        borderRadius: 15,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedContainer: {
        width: '30%',
        height: 26,
        borderRadius: 15,
        backgroundColor: '#050E40',
        justifyContent: 'center',
        alignItems: 'center'
    },
    unselectedContainer: {
        width: '30%',
        height: 26,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#050E40',
        borderWidth: 2
    },
    selectedText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    unselectedText: {
        fontFamily: 'Helvetica Neue',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#050E40'
    },
    uninterestedCheck: {
        flexDirection: 'row',
        // width: 293,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    uninterestedBox: {
        width: 19,
        height: 19,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        borderColor: '#050E40',
        borderWidth: 2
    },
    uninterestedBoxChecked: {
        width: 19,
        height: 19,
        borderRadius: 5,
        backgroundColor: '#050E40'
    },
    uninterestedText: {
        fontFamily: 'Helvetica',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#404040'
    },
    religionSelections: {
        height: 67,
        justifyContent: 'space-between'
    }
});
