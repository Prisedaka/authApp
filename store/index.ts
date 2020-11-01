import { UserStore } from "./user"
import React from "react"

export const userStore = new UserStore()

const storesContext = React.createContext({
    userStore
})

export const useStores = () => React.useContext(storesContext)
