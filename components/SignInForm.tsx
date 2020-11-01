import * as React from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    GestureResponderEvent,
    Text
} from 'react-native'
import {useState} from "react"
import auth, { authTypes } from "../api/auth"
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import {useStores} from "../store"

interface Props {
}

const SignInForm = (props: Props) => {
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [isHidePass, setIsHidePass] = useState(true)
    const [isEmailDirty, setIsEmailDirty] = useState(false)
    const [isPassDirty, setIsPassDirty] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigation = useNavigation()
    const { userStore } = useStores()

    const validateEmail = (value: string) => {
        if (!isEmailDirty) setIsEmailDirty(true)
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            setIsValidEmail(true)
            return
        }
        setIsValidEmail(false)
    }

    const validatePassword = (value: string) => {
        if (!isPassDirty) setIsPassDirty(true)
        if (/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(value)) {
            setIsValidPassword(true)
            return
        }
        setIsValidPassword(false)
    }


    const onPressSignInBtn = (type: authTypes) => {
        auth.login(type)()
            .then(() => {
                if (userStore.user === null) return
                userStore.authType = type
                navigation.navigate('Root')
            })
    }

    const onPressEyeIcon = (e: GestureResponderEvent) => {
        setIsHidePass(!isHidePass)
    }

    const onChangeEmail = (value: string) => {
        validateEmail(value)
        setEmail(value)
    }

    const onChangePass = (value: string) => {
        validatePassword(value)
        setPass(value)
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{...styles.input, borderColor: isValidEmail || !isEmailDirty ? 'black' : 'red'}}
                    placeholder='E-mail'
                    onChangeText={onChangeEmail}
                />
                <Text style={{...styles.validationText, opacity: isValidEmail || !isEmailDirty ? 0 : 1}}>
                    E-mail is not valid
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.passInput}>
                    <TextInput
                        style={{...styles.input, borderColor: isValidPassword || !isPassDirty ? 'black' : 'red'}}
                        placeholder='Password'
                        secureTextEntry ={isHidePass}
                        onChangeText={onChangePass}
                    />
                    <TouchableHighlight onPress={onPressEyeIcon} style={styles.eyeIcon} underlayColor="#DDDDDD">
                        <AntDesign name={isHidePass ? 'eyeo' : 'eye'} size={24} color="black"/>
                    </TouchableHighlight>
                </View>
                <Text style={{...styles.validationText, opacity: isValidPassword || !isPassDirty ? 0 : 1}}>
                    Password should contain digits and letters
                </Text>
            </View>

            <View style={styles.btnContainer}>
                <Button
                    title='Sign In'
                    onPress={onPressSignInBtn.bind(null, 'internal')}
                    disabled={!isValidEmail || !isValidPassword}
                />
                <Button
                    title='Google Sign-In'
                    onPress={onPressSignInBtn.bind(null, 'google')}
                />
                <Button
                    title='Facebook Sign-In'
                    onPress={onPressSignInBtn.bind(null, 'facebook')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    input: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 12
    },
    inputContainer: {
        flexDirection: 'column',
        justifyContent: "center",
        marginHorizontal: 20
    },
    passInput: {

    },
    eyeIcon: {
        position: 'absolute',
        right: 2,
        top: 18
    },
    btnContainer: {
        padding: 10,
        flexWrap: 'wrap',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    validationText: {
        fontSize: 12,
        color: 'red',
        marginTop: -10
    }
})

export default SignInForm
