import React from 'react';
import {Icon} from 'expo';
import {StyleSheet, Text, View, FlatList, TouchableHighlight, Modal} from 'react-native';
import Colors from '../constants/Colors';

export default class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    _click = () => {
        this.setState({open: !this.state.open})
    };

    _select = () => {
        this.setState({open: false})
    };

    _renderItem = (item) => (
        <View>
            <Text style={styles.itemText}>aadsf</Text>
            <TouchableHighlight onPress={this._select}>
                <Text style={styles.itemText}>{item.text}</Text>
            </TouchableHighlight>
        </View>
    );


    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._click}>
                    <Text style={{color: 'white'}}>Klick mich</Text>
                </TouchableHighlight>
                {this.state.open &&
                <Modal
                    style={styles.items}
                    animationType="slide"
                    transparent={true}
                    visible={this.state.open}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <FlatList
                        data={[{text: 'select 1', icon: 'a', key: "1"}, {key:"2",text: 'select 2', icon: 'bcs'}]}
                        renderItem={this._renderItem}

                    />
                </Modal>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    items: {
        top: 20,
        flex: 1,
        width: '100%',
        height: 100,
        maxHeight: 100,
        backgroundColor: Colors.inputBackground,
        zIndex: 1000000,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        position: 'absolute',
    },
    itemText: {
        color: Colors.textDefault
    }
});
