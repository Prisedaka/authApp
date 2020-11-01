import {action, makeAutoObservable, observable} from "mobx"
import {GoogleUser} from "expo-google-app-auth"
import {authTypes} from "../api/auth"

export class UserStore {
    @observable user: GoogleUser | { name: string } | null = null
    @observable authType: authTypes = null

    @action
    setUser(user: GoogleUser | null, auth: authTypes) {
        this.user = user
        this.authType = auth
    }

    @action
    signOut() {
        this.user = null
        this.authType = null
    }
}
