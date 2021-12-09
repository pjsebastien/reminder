import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from '../../constants/Colors';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../store/actions/app';

function Note(props) {
    //Variables
    const dispatch = useDispatch();
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);

    //Functions
    const onLongPressHandler = () => {
        Alert.alert('Que souhaitez vous faire ?', undefined, [
            {
                text: 'Annuler',
                style: 'cancel',
            },
            {
                text: 'Supprimer',
                style: 'destructive',
                onPress: () => onDeleteHandler(),
            },
        ]);
    };

    const onDeleteHandler = () => {
        Alert.alert('Etes vous sur de vouloir supprimer la note ?', undefined, [
            {
                text: 'Annuler',
                style: 'cancel',
            },
            {
                text: 'Supprimer',
                style: 'destructive',
                onPress: () => {
                    dispatch(appActions.deleteNote(props.item.id, userId, token));
                },
            },
        ]);
    };
    return (
        <TouchableOpacity activeOpacity={0.5} onLongPress={onLongPressHandler}>
            <View style={styles.note}>
                <Text>{props.item.content}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    note: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginVertical: 3,
    },
});

export default Note;
