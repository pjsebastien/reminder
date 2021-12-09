//Libraries
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as appActions from '../store/actions/app';

function Projects(props) {
    //Variables
    const projects = useSelector(state => state.projects);
    const notes = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);
    //Functions
    const onLongPressHandler = projectId => {
        Alert.alert('Que souhaitez vous faire ?', undefined, [
            {
                text: 'Annuler',
                style: 'cancel',
            },
            {
                text: 'Modifier',
                style: 'cancel',
            },
            {
                text: 'Supprimer',
                style: 'destructive',
                onPress: () => onDeleteHandler(projectId),
            },
        ]);
    };
    const onLogoutPressedHandler = () => {
        Alert.alert('Souhaitez vous vous déconnecter ?', undefined, [
            {
                text: 'Annuler',
                style: 'cancel',
            },
            {
                text: 'Déconnecter',
                style: 'destructive',
                onPress: () => logoutConfirmation(),
            },
        ]);
    };

    const logoutConfirmation = () => {
        dispatch(appActions.logout());
    };

    const onDeleteHandler = projectId => {
        Alert.alert(
            'Etes vous sur de vouloir supprimer le projet ?',
            'Ainsi que toutes les notes associées',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        const notesForProject = notes.filter(
                            note => note.projectId == projectId,
                        );
                        notesForProject.forEach(note =>
                            dispatch(appActions.deleteNote(note.id, userId, token)),
                        );
                        dispatch(appActions.deleteProject(projectId, userId, token));
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Projets</Text>
                    {projects[0] && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.navigate('addProject')}
                        >
                            <View style={styles.addIcon}>
                                <Ionicons name={'add'} size={23} color="white" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                {!projects[0] ? (
                    <View style={styles.emptyproject}>
                        <Image
                            source={require('../assets/folder.png')}
                            style={styles.illustration}
                        />
                        <Text>Commencez par créer votre premier projets</Text>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.navigate('addProject')}
                        >
                            <LinearGradient
                                colors={['#ADCE74', '#61B15A']}
                                style={styles.addButton}
                            >
                                <Text style={styles.addButtonText}>Créer un projet</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={projects}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    props.navigation.navigate('Project', { item: item })
                                }
                                onLongPress={() => onLongPressHandler(item.id)}
                            >
                                <View style={styles.project}>
                                    <Text style={styles.projectText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.logout}
                    onPress={onLogoutPressedHandler}
                >
                    <Text>
                        <Ionicons name={'power'} size={23} color="white" />
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 25,
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: Platform.OS === 'android' ? 50 : 30,
    },
    addIcon: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 35,
        width: 35,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    emptyproject: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    addButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 18,
        color: 'white',
    },
    project: {
        backgroundColor: Colors.primaryFaded,
        padding: 15,
        marginBottom: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(50,205,50, .1)',
    },
    projectText: {
        fontSize: 17,
    },
    logout: {
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
});

export default Projects;
