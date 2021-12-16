import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kamera from '../src/pages/Camera.js'
import Calculator from '../src/pages/Calculator.js'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                height: '10%',
                backgroundColor: '#005197',
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                borderRadius: 15,
            },
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 14,
                paddingBottom: 10,
            },
            tabBarActiveTintColor: 'white',
            unmountOnBlur: true,
        }}>
            <Tab.Screen name="Calculator" component={Calculator} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={require('../assets/calculator.png')}
                        style={{
                            width: 35,
                            height: 35,
                            marginBottom: -10,
                            tintColor: focused ? 'white' : 'gray',
                        }} />
                )
            }} />
            <Tab.Screen name="Camera" component={Kamera} options={{
                tabBarIcon: ({ focused }) => (
                    <Image source={require('../assets/camera.png')}
                        style={{
                            width: 35,
                            height: 35,
                            marginBottom: -10,
                            tintColor: focused ? 'white' : 'gray',
                        }} />
                ),
            }} />
        </Tab.Navigator>
    )
}

export default Tabs
