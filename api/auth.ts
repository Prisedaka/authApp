import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

import {userStore} from '../store'

export type authTypes = 'internal' | 'google' | 'facebook' | null

const config = {
    androidClientId: '398338684335-809io9envp2pjbiklf9rvu9hkach1u5g.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
}

export class auth {
    private accessToken: string | null = null
    private type = null

    async init() {
        await this._syncUserWithStateAsync()
    }

    async loginWithGoogle() {
        try {
            await this._syncUserWithStateAsync()
        } catch ({message}) {
            alert('Google login error:' + message)
        }
    }

    async _syncUserWithStateAsync() {
        const { type, accessToken, user }: any = await Google.logInAsync(config)

        if (type === 'success') {
            userStore.setUser(user, 'google')
            this.type = type
            this.accessToken = accessToken
        }
    }

    async logoutWithGoogle() {
        try {
            if (this.type === 'success' && this.accessToken) {
                await Google.logOutAsync({ accessToken: this.accessToken, ...config });
                userStore.signOut()
                this.type = null
                this.accessToken = null
            }
        }
        catch({message}) {
            alert('Google logout error:' + message)
        }
    }

    async logInWithFacebook() {
        try {
            await Facebook.initializeAsync({
                appId: '<APP_ID>',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            }: any = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                userStore.setUser({ name: (await response.json()).name}, 'facebook')
                this.type = type
                this.accessToken = token
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    async logoutWithFacebook() {
        try {
            if (this.type === 'success') {
                await Facebook.logOutAsync();
                userStore.signOut()
                this.type = null
                this.accessToken = null
            }
        }
        catch({message}) {
            alert('Facebook logout error:' + message)
        }
    }

    login(type: authTypes) {
        if (type === "internal") {
            alert('Error: you are not registered!')
            return
        }
        const auths = {
            'internal': () => {},
            'google': this.loginWithGoogle.bind(this),
            'facebook': this.logInWithFacebook.bind(this),
        }

        // @ts-ignore
        return auths[type]
    }

    logout() {
        if (!userStore.authType) return

        const logouts = {
            // 'internal': () => {},
            'google': this.logoutWithGoogle.bind(this),
            'facebook': this.logoutWithFacebook.bind(this),
        }

        // @ts-ignore
        return logouts[userStore.authType]
    }
}

export default new auth()
