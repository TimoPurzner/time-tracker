import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text, FlatList,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import Colors from "../constants/Colors";
import {Icon} from 'expo';
import CategoryInput from '../components/CategoryInput';
import {CategoryContext} from "../stores/category";
import DropDown from "../components/DropDown";

export default class CategoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Kategorien',
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
        console.log('hello');
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
                <DropDown/>
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


                <TouchableOpacity onPress={this._onPressAddButton} style={styles.addButton}>
                    <View style={'addButtonWrap'}>
                        <Icon.Ionicons
                            name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                            size={90}
                            style={{}}
                            color={Colors.textDefault}
                        />
                    </View>
                </TouchableOpacity>

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
        alignItems: 'center',
        backgroundColor: Colors.screenBackground,
    },
    addButton: {
        position: 'absolute',
        height: 90,
        bottom: 15,
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
