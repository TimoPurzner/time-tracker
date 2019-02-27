import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text, FlatList,
    TouchableHighlight,
} from 'react-native';
import Colors from "../constants/Colors";
import {Icon} from 'expo';
import CategoryInput from '../components/CategoryInput';
import {CategoryContext} from "../stores/category";

export default class CategoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Kategorieren',
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
            modalHidden: true,
        };
    }

    _onPressAddButton = () => {
        this.setState({modalHidden: false})
    };

    _renderListItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.id} {item.title}</Text>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <CategoryContext.Consumer>
                    {categoryContext =>
                        <View style={{flex:1}}>
                            {!categoryContext.state.loading ?
                                <Text>Laden…</Text>
                                :
                                <FlatList
                                    contentContainerStyle={styles.list}
                                    numColumns={2}
                                    keyExtractor={item => item.id.toString()}
                                    data={categoryContext.state.categories}
                                    renderItem={({item}) => this._renderListItem(item)}
                                />
                            }
                        </View>
                    }
                </CategoryContext.Consumer>

                <TouchableHighlight onPress={this._onPressAddButton}>
                    <View style={styles.addButton}>
                        <Icon.Ionicons
                            name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                            size={90}
                            style={{}}
                            color={Colors.textDefault}
                        />
                    </View>
                </TouchableHighlight>

                <CategoryInput
                    hidden={this.state.modalHidden}
                    onClose={() => this.setState({modalHidden: true})}
                    onSuccess={() => this.setState({modalHidden: true})}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
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
    },
    list: {
        minHeight: '100%',
    },
    item: {
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        alignSelf: "center",
        margin: 5,
        minWidth: 170,
        maxWidth: 223,
        height: 304,
        maxHeight:304,
        backgroundColor: '#CCC',
    },
    itemText: {
        color: Colors.textDefault,
    }

});
