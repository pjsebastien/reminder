//Libraries
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

//Ecrans
import HomeScreen from '../screens/Home';
import ProjectScreen from '../screens/Project';
import ProjectsScreen from '../screens/Projects';
import AddNoteScreen from '../screens/AddNote';
import AddProjectScreen from '../screens/AddProject';
import AuthenticatorScreen from '../screens/Authenticator';
import StartupScreen from '../screens/Startup';

//AppModalsNavigator
const ModalsNavigator = createStackNavigator();

export const AppModalsNavigator = () => {
    return (
        <ModalsNavigator.Navigator mode="modal">
            <ModalsNavigator.Screen
                name="app"
                component={AppTabNavigator}
                options={{ headerShown: false }}
            />
            <ModalsNavigator.Screen
                name="addNote"
                component={AddNoteScreen}
                options={{ headerShown: false }}
            />
            <ModalsNavigator.Screen
                name="addProject"
                component={AddProjectScreen}
                options={{ headerShown: false }}
            />
        </ModalsNavigator.Navigator>
    );
};

//AppTabNavigator
const TabNavigator = createBottomTabNavigator();

const AppTabNavigator = () => {
    return (
        <TabNavigator.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == 'tabHome') {
                        iconName = focused ? 'albums' : 'albums-outline';
                    } else if (route.name == 'tabProjects') {
                        iconName = focused ? 'bookmarks' : 'bookmarks-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: Colors.primary,
            }}
        >
            <TabNavigator.Screen
                name="tabHome"
                component={HomeScreen}
                options={{ title: 'Notes' }}
            />
            <TabNavigator.Screen
                name="tabProjects"
                component={ProjectsStackNavigator}
                options={{ title: 'Projets' }}
            />
        </TabNavigator.Navigator>
    );
};

//ProjectsStackNavigator
const ProjectsNavigator = createStackNavigator();

const ProjectsStackNavigator = () => {
    return (
        <ProjectsNavigator.Navigator>
            <ProjectsNavigator.Screen
                name="Projects"
                component={ProjectsScreen}
                options={{ headerShown: false }}
            />
            <ProjectsNavigator.Screen
                name="Project"
                component={ProjectScreen}
                options={{ headerShown: false }}
            />
        </ProjectsNavigator.Navigator>
    );
};

//StartupStackNavigator
const StartupNavigator = createStackNavigator();

export const StartupStackNavigator = () => {
    return (
        <StartupNavigator.Navigator>
            <StartupNavigator.Screen
                name="Projects"
                component={StartupScreen}
                options={{ headerShown: false }}
            />
        </StartupNavigator.Navigator>
    );
};

//AuthenticatorStackNavigator
const AuthenticatorNavigator = createStackNavigator();

export const AuthenticatorStackNavigator = () => {
    return (
        <AuthenticatorNavigator.Navigator>
            <AuthenticatorNavigator.Screen
                name="Authenticator"
                component={AuthenticatorScreen}
                options={{ headerShown: false }}
            />
        </AuthenticatorNavigator.Navigator>
    );
};
