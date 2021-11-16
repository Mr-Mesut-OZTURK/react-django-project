import React from 'react'
import { View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoList from './pages/todoList'
import Detail from './pages/detail'

const Stack = createNativeStackNavigator();


const Router = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator>
                <Stack.Screen name="Home" component={TodoList} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Router
