//Libraries
import React from 'react';
import {
    AppModalsNavigator,
    AuthenticatorStackNavigator,
    StartupStackNavigator,
} from './Navigators';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function AppNavigator() {
    //Variable
    const didTrialAutoLogin = useSelector(state => state.didTrialAutoLogin);
    const isAuth = !!useSelector(state => state.userId);
    return (
        <NavigationContainer>
            {didTrialAutoLogin && !isAuth && <AuthenticatorStackNavigator />}
            {didTrialAutoLogin && isAuth && <AppModalsNavigator />}
            {!didTrialAutoLogin && <StartupStackNavigator />}
        </NavigationContainer>
    );
}

export default AppNavigator;
