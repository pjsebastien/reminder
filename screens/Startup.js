//Librairies

import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as appActions from '../store/actions/app';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';

function Startup(props) {
    const dispatch = useDispatch();

    //Cycle de Vie
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                dispatch(appActions.setDidTrial());
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, refreshToken } = transformedData;

            if (!token || !refreshToken) {
                dispatch(appActions.setDidTrial());
                return;
            }

            dispatch(appActions.fetchRefreshToken(refreshToken));
        };
        tryLogin();
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary}></ActivityIndicator>
        </View>
    );
}

export default Startup;
