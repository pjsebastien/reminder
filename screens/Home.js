//Libraries
import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../store/actions/app';

//Components
import Note from '../components/Note/Note';

function Home(props) {
    //Variable
    const date = moment().format('LL');
    const notes = useSelector(state => state.notes);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();
    const loadedNotes = useSelector(state => state.loadedNotes);
    const userId = useSelector(state => state.userId);
    const token = useSelector(state => state.token);

    //Cycle de Vie
    useEffect(() => {
        //action : charger les notes
        dispatch(appActions.getNotes(userId, token));
        //action : charger les projets
        dispatch(appActions.getProjects(userId, token));
    }, []);

    if (loadedNotes) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.date}>{date}</Text>
                <View style={styles.cards}>
                    <LinearGradient colors={['#61B15A', '#FFF76A']} style={styles.card}>
                        <Text style={styles.cardNumber}>{notes.length}</Text>
                        <Text style={styles.cardText}>Note</Text>
                    </LinearGradient>
                    <LinearGradient colors={['#FFF76A', '#FFA63E']} style={styles.card}>
                        <Text style={styles.cardNumber}>{projects.length}</Text>
                        <Text style={styles.cardText}>Projet</Text>
                    </LinearGradient>
                </View>
                <Text style={styles.title}>Notes ({notes.length})</Text>
                {!notes[0] ? (
                    <>
                        <Image
                            source={require('../assets/empty.png')}
                            style={styles.image}
                        />
                        <Text>
                            Commencez par créer votre premier projet pour pouvoir ajouter
                            une note
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.navigate('tabProjects')}
                        >
                            <LinearGradient
                                colors={['#ADCE74', '#61B15A']}
                                style={styles.addButton}
                            >
                                <Text style={styles.addButtonText}>Voir mes projets</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                ) : (
                    <FlatList
                        data={notes}
                        renderItem={({ item }) => <Note item={item} />}
                    />
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
    date: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: Platform.OS === 'android' ? 50 : 30,
    },
    cards: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        width: '47%',
        height: 150,
        padding: 15,
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    cardNumber: {
        fontSize: 50,
        color: 'white',
    },
    cardText: {
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 45,
        marginBottom: 15,
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
});

export default Home;
