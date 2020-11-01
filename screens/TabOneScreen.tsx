import * as React from 'react'
import {Button, StyleSheet} from 'react-native'

import {Text, View} from '../components/Themed'
import auth from "../api/auth"
import {observer} from "mobx-react-lite"
import {useStores} from "../store"
import {useNavigation} from "@react-navigation/native"

function TabOneScreen() {
    const { userStore } = useStores()
    const navigation = useNavigation()

    const onPress = () => {
        auth.logout()()
            .then(() => {
                if (userStore.user === null) navigation.navigate('Login')
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {userStore.user?.name}</Text>
            <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)'/>
            <Button
                title='Sign out'
                onPress={onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})

export default observer(TabOneScreen)