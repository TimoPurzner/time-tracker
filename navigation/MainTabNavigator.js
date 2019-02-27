import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CategoryScreen from '../screens/CategoryScreen';
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Zeit',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-alarm` : 'md-alarm'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabTextSelected,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: Colors.tabBarBackground,
    }
  }
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Statistiken',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabTextSelected,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: Colors.tabBarBackground,
    }
  }
};

const CategroyStack = createStackNavigator({
  Category: CategoryScreen,
});

CategroyStack.navigationOptions = {
  tabBarLabel: 'Kategorien',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabTextSelected,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: Colors.tabBarBackground,
    }
  }
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  CategroyStack,
});
