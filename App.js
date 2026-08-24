import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './src/HomeScreen';
import SeviceDetail from './src/ServiceDetail';
import LoginScreen from './src/LoginScreen';
import EditService from './src/EditService';
import CustomerInfor from './src/CustomerInfor';
import AddCustomer from './src/AddCustomer';
import AddService from './src/AddService';
import TransactionInfor from './src/TransactionInfor';
import CustomerDetail from './src/CustomerDetail';
import Setting from './src/Setting';
import TransactionDetail from './src/TransactionDetail';
import EditCustomer from './src/EditCustomer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name == 'TransactionInfor') {
            iconName = focused ? 'cash' : 'cash-outline';
          }
          if (route.name == 'CustomerInfor') {
            iconName = focused ? 'people' : 'people-outline';
          }
          if (route.name == 'Setting') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ef506b',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="TransactionInfor" component={TransactionInfor} />
      <Tab.Screen name="CustomerInfor" component={CustomerInfor} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="SeviceDetail" component={SeviceDetail} />
        <Stack.Screen name="TransactionInfor" component={TransactionInfor} />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="EditService" component={EditService} />
        <Stack.Screen name="EditCustomer" component={EditCustomer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
