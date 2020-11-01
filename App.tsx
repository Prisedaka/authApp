import {StatusBar} from 'expo-status-bar'
import React, {useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import 'firebase/auth'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import auth from "./api/auth"
import {observer} from "mobx-react-lite"

function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    useEffect(() => {
        // auth.init()
    }, [])
    
    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme}/>
                <StatusBar/>
            </SafeAreaProvider>
        )
    }
}

export default observer(App)
