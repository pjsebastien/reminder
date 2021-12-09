//Libraries
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/app';

function AddNote(props) {
    //Variable
    const project = props.route.params.project;
    const notes = useSelector(state => state.notes);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);

    // Fonction
    const onSubmit = data => {
        const note = {
            content: data.note,
            creationDate: new Date(),
            projectId: project.id,
        };

        dispatch(appActions.addNote(note, userId, token));
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.title}>Ajouter une note</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <Controller
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Entrez votre texte..."
                                value={value}
                                onChangeText={value => onChange(value)}
                                multiline={true}
                            />
                        )}
                        name="note"
                        rules={{
                            minLength: {
                                value: 3,
                                message: 'Veuillez saisir au minimum 2 caractères',
                            },
                            required: {
                                value: true,
                                message: 'Champ obligatoire',
                            },
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.submit}
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.submitText}>Ajouter</Text>
                    <Ionicons name={'arrow-forward'} size={23} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => props.navigation.goBack()}
                    style={styles.close}
                >
                    <Ionicons name={'close'} size={23} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryFaded,
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: Platform.OS === 'android' ? 50 : 30,
        alignSelf: 'center',
    },
    projectName: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    close: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
        width: 50,
        position: 'absolute',
        bottom: 50,
    },
    inputContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    input: {
        maxHeight: 150,
        fontSize: 16,
    },
    submit: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
    },
    submitText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default AddNote;
