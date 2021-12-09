//Libraries
import React from 'react';
import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

//Composants
import Note from '../components/Note/Note';

function Project(props) {
    const project = props.route.params.item;
    const notes = useSelector(state => state.notes).filter(
        note => note.projectId == project.id,
    );
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => props.navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name={'arrow-back'} size={23} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{project.name}</Text>
                {notes.content}

                {notes[0] ? (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                props.navigation.navigate('addNote', {
                                    project: project,
                                })
                            }
                        >
                            <View style={styles.addIcon}>
                                <Text style={styles.textAddButton}>Ajouter une note</Text>
                            </View>
                        </TouchableOpacity>
                        <FlatList
                            data={notes}
                            renderItem={({ item }) => <Note item={item} />}
                        />
                    </>
                ) : (
                    <>
                        <Image
                            source={require('../assets/empty.png')}
                            style={styles.image}
                        />
                        <Text>Commencez par créer une première note pour ce projet</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                props.navigation.navigate('addNote', {
                                    project: project,
                                })
                            }
                        >
                            <LinearGradient
                                colors={['#ADCE74', '#61B15A']}
                                style={styles.addButton}
                            >
                                <Text style={styles.addButtonText}>Ajouter une note</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                )}
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
    backButton: {
        marginTop: Platform.OS === 'android' ? 50 : 30,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 30,
    },
    image: {
        width: 320,
        height: 150,
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
    addIcon: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        height: 30,
        width: 140,
        marginBottom: 30,
    },
    textAddButton: {
        color: 'white',
    },
});

export default Project;
