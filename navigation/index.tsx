import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as React from 'react'
import {ColorSchemeName} from 'react-native'

import NotFoundScreen from '../screens/NotFoundScreen'
import {RootStackParamList} from '../types'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import LoginScreen from "../screens/LoginScreen"
import { useStores } from '../store'
import {observer} from "mobx-react-lite"

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

interface Props {
    colorScheme: ColorSchemeName
}

function Navigation({colorScheme}: Props) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    )
}

export default observer(Navigation)
// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
    const { userStore } = useStores()

    return (
        <Stack.Navigator
            initialRouteName={userStore.user ? 'Root' : 'Login'}
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    )
}
