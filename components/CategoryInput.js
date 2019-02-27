import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';
import Colors from "../constants/Colors";
import {CategoryContext} from '../stores/category'

export default class CategoryInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    _onPressSuccess = (context) => {
        if (this.state.input === '') return; // do nothing
        //create the new category
        context.action.createCategory(this.state.input);
        // Tell Parent component everything is finished!
        this.props.onSuccess();
    };

    render() {
        if (this.props.hidden) return null;
        return (
            <CategoryContext.Consumer>
                {categoryContext =>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            Erstelle eine neue Kategorie
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({input: text})}
                            value={this.props.text}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableHighlight underlayColor="white"
                                                style={[styles.button, {
                                                    borderRightWidth: 4,
                                                    borderColor: Colors.inputButtonGroupSpacer
                                                }]}
                                                onPress={this.props.onClose}

                            >
                                <Text style={styles.buttonText}>Abbrechen</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#ffffff"
                                style={styles.button}
                                onPress={() =>this._onPressSuccess(categoryContext)}
                            >
                                <Text style={styles.buttonText}>Speichern</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                }
            </CategoryContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        borderRadius: 15,
        marginLeft: '5%',
        width: '90%',
        bottom: '50%',
        backgroundColor: Colors.inputBackground,
    },
    title: {
        color: Colors.textDefault,
        fontSize: 25,
        marginBottom: 15,
    },
    input: {
        width: '85%',
        height: 35,
        fontSize: 25,
        backgroundColor: 'white'
    },
    buttonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        height: 50,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.textDefault,
        fontSize: 25,
    }
});
//CategoryInput.contextType = CategoryContext;
