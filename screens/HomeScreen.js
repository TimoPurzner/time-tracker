import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Icon} from 'expo';

import Colors from "../constants/Colors";
import {CategoryContext} from "../stores/category";
import DropDown from "../components/DropDown";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Übersicht',
        headerStyle: {
            backgroundColor: Colors.headerBackground,
            borderBottomColor: Colors.headerBackground,
        },
        headerTitleStyle: {
            color: Colors.textDefault
        },
    };

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>

                <DropDown/>
                <Text style={{color:'white'}}>Ich bin verdeckt?</Text>

                <View style={styles.addButton}>
                    <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                        size={90}
                        style={{}}
                        color={Colors.textDefault}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: Colors.screenBackground,
    },
    addButton: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        width: '100%',
        bottom: 10,
        color: Colors.textDefault
    }
});
