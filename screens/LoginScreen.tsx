import * as React from 'react'
import {StyleSheet} from 'react-native'

import {Text, View} from '../components/Themed'
import SignInForm from "../components/SignInForm"

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login page</Text>
            <SignInForm/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        alignSelf: 'center',
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
