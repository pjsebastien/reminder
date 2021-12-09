import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    //Pour IOS
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import * as appActions from '../store/actions/app';

function Authenticator(props) {
    // Variables

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.userId);

    console.log(isAuth);
    //State
    const [loginMode, setLoginMode] = useState(false);
    // Fonction
    const onSubmit = async data => {
        console.log(data);
        if (loginMode) {
            //Connexion

            try {
                await dispatch(appActions.login(data.email, data.password));
                props.navigation.navigate('app');
            } catch (error) {
                switch (error.message) {
                    case 'EMAIL_NOT_FOUND':
                        Alert.alert(
                            'Impossible de vous connecter',
                            "Cette adresse email n'existe pas.",
                        );
                        break;
                    case 'INVALID_PASSWORD':
                        Alert.alert(
                            'Impossible de vous connecter',
                            'Le mot de passe est incorrect',
                        );
                        break;
                    case 'USER_DISABLED':
                        Alert.alert(
                            'Impossible de vous connecter',
                            'Votre compte a été désactivé',
                        );
                        break;
                    default:
                        Alert.alert(
                            'Impossible de vous connecter',
                            'Une erreur est survenue, réessayez plus tard.',
                        );
                }
            }
        } else {
            //Inscription
            try {
                await dispatch(appActions.signup(data.email, data.password));
                props.navigation.navigate('app');
            } catch (error) {
                switch (error.message) {
                    case 'EMAIL_EXISTS':
                        Alert.alert(
                            'Impossible de vous inscrire',
                            'Cette adresse email est déjà utilisé.',
                        );
                        break;
                    default:
                        Alert.alert(
                            'Impossible de vous inscrire',
                            'Une erreur est survenue, réessayez plus tard.',
                        );
                }
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        >
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.littleContainer}>
                        <Text style={styles.title}>Reminder</Text>
                        <Text style={styles.slogan}>
                            Organisez votre vie dans votre appli
                        </Text>
                        <View style={styles.form}>
                            <Text style={styles.label}>Adresse mail</Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Entrez votre adresse mail"
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        keyboardType="email-address"
                                    />
                                )}
                                name="email"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Champ obligatoire',
                                    },
                                    pattern: {
                                        //regex adresse mail
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Saisissez un mail valide.',
                                    },
                                }}
                            />
                            {errors.email && (
                                <Text style={styles.error}>{errors.email.message}</Text>
                            )}
                            <Text style={{ ...styles.label, marginTop: 15 }}>
                                Mot de passe
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Entrez votre mot de passe"
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        secureTextEntry={true}
                                    />
                                )}
                                name="password"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Champ obligatoire',
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Veuillez saisir au minimum 6 caractères.',
                                    },
                                }}
                            />
                            {errors.password && (
                                <Text style={styles.error}>
                                    {errors.password.message}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <View style={styles.submit}>
                                <Text style={styles.submitText}>
                                    {loginMode ? 'Se connecter' : "S'inscrire"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setLoginMode(prevState => !prevState)}
                        >
                            <Text style={styles.switchButton}>
                                Passer en mode {loginMode ? 'inscription' : 'connexion'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    littleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold',
    },
    slogan: {
        color: 'white',
        paddingHorizontal: 15,
        fontSize: 16,
    },
    submit: {
        backgroundColor: '#ffa801',
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        padding: 5,
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        width: '100%',
    },
    form: {
        marginTop: 30,
        padding: 25,
        backgroundColor: '#fdcb6e',
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.8,
    },
    label: {
        marginBottom: 5,
        color: 'white',
    },
    error: {
        color: '#ff5e57',
        fontSize: 12,
        paddingTop: 3,
    },
    switchButton: {
        color: 'white',
        paddingTop: 15,
    },
});

export default Authenticator;
