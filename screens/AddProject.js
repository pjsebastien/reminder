//Libraries
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/app';
import * as ImagePicker from 'expo-image-picker';

function AddProject(props) {
    // Variables
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);

    //State
    const [image, setImage] = useState();

    // Fonction
    const onSubmit = data => {
        let image64;

        if (image) {
            const uriParts = image.uri.split('.');
            const fileType = uriParts[uriParts.length - 1];
            image64 = `data:image/${fileType};base64,${image.base64}`;
        }
        const project = {
            name: data.name,
            logo: image64,
        };

        dispatch(appActions.addProject(project, userId, token));
        props.navigation.goBack();
    };

    const onPressPickerHandler = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission refusée',
                    "Vous n'avez pas accordé l'accès à vos photos, vous pouvez le modifier dans vos paramètres",
                );
            }
        }
        //Ouvrir la bibliothèque de photo
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
            base64: true,
            // aspect: [1, 1]
        });

        if (result.cancelled) {
            Alert.alert('Image non sélectionnée', 'Vous avez annulé la sélection.');
            setImage();
        } else {
            setImage(result);
        }
    };
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.title}>Ajouter un projet</Text>
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Entrez le nom de votre projet"
                                value={value}
                                onChangeText={value => onChange(value)}
                                multiline={true}
                            />
                        )}
                        name="name"
                        rules={{
                            required: true,
                        }}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressPickerHandler}>
                    <View
                        style={{
                            ...styles.inputContainer,
                            marginTop: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons name={'images'} size={23} color={Colors.primary} />
                        <Text style={{ marginLeft: 15 }}>
                            {image
                                ? 'Vous avez selectionné une image'
                                : 'Ajouter une image'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submit}
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.submitText}>Créer</Text>
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

export default AddProject;
