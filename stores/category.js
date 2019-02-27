import React, {Component} from 'react';
import {Constants, SQLite} from 'expo';

const CategoryContext = React.createContext({
    state: {},
    actions: {}
});

const db = SQLite.openDatabase('db.db');
class CategoryProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            categories: []
        };
        this.actions = {
            createCategory: this.createCategory
        };
    }

    async componentWillMount() {
        this.loadCategories();
    }

    loadCategories = () => {
        console.log('load all existing categories');
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM categories;',
                null,
                (t, rs) => {
                    console.log('hit or miss?', rs);
                    console.log(rs.rows._array);
                    console.log(t);
                    this.setState({categories: rs.rows._array})
                }
            );
        });
    };

    createCategory = (name) => {
        console.log('A new Category huh?');
        console.log(name);
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO categories (title) VALUES ("${name}"); `,
                null,
                (t, rs) => {
                    this.loadCategories();
                },
                (t, e) => {
                    console.log('error while sql', e);
                    console.log(t)
                }
            );
        });
    };

    render() {
        return (
            <CategoryContext.Provider value={{
                state: this.state,
                action: this.actions
            }}>
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}

export {
    CategoryProvider,
    CategoryContext
}
