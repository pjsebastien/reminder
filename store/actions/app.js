import axios from '../../axios-instance';
import Keys from '../../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_PROJECT = 'ADD_PROJECT';
export const GET_PROJECTS = 'GET_PROJECTS';
export const ADD_NOTE = 'ADD_NOTE';
export const GET_NOTES = 'GET_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const START_GET_NOTES = 'START_GET_NOTES';
export const END_GET_NOTES = 'END_GET_NOTES';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_TRIAL_LOGIN = 'SET_TRIAL_LOGIN';
export const FETCH_REFRESH_TOKEN = 'FRESH_REFRESH_TOKEN';
export const LOGOUT = 'LOGOUT';

export const addProject = (project, userId, token) => {
    return dispatch => {
        axios
            .post(`/projects/${userId}.json?auth=${token}`, project)
            .then(response => {
                console.log(response.data);
                const newProject = {
                    id: response.data.name,
                    name: project.name,
                    logo: response.data.logo,
                };
                dispatch({ type: ADD_PROJECT, project: newProject });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const addNote = (note, userId, token) => {
    return dispatch => {
        axios
            .post(`/notes/${userId}.json?auth=${token}`, note)
            .then(response => {
                console.log(response.data);
                const newNote = {
                    id: response.data.name,
                    content: note.content,
                    creationDate: note.creationDate,
                    projectId: note.projectId,
                };
                dispatch({ type: ADD_NOTE, note: newNote });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const getProjects = (userId, token) => {
    return dispatch => {
        axios
            .get(`/projects/${userId}.json?auth=${token}`)
            .then(response => {
                const fetchedProjects = [];
                for (let key in response.data) {
                    fetchedProjects.push({
                        id: key,
                        name: response.data[key].name,
                        logo: response.data.logo,
                    });
                }
                dispatch({ type: GET_PROJECTS, projects: fetchedProjects });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const getNotes = (userId, token) => {
    return dispatch => {
        dispatch({ type: START_GET_NOTES });
        axios
            .get(`/notes/${userId}.json?auth=${token}`)
            .then(response => {
                const fetchedNotes = [];
                for (let key in response.data) {
                    fetchedNotes.push({
                        id: key,
                        content: response.data[key].content,
                        creationDate: response.data[key].creationDate,
                        projectId: response.data[key].projectId,
                    });
                }
                dispatch({ type: GET_NOTES, notes: fetchedNotes });
                dispatch({ type: END_GET_NOTES });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: END_GET_NOTES });
            });
    };
};

export const deleteNote = (noteId, userId, token) => {
    return dispatch => {
        axios
            .delete(`/notes/${userId}/${noteId}.json?auth=${token}`)
            .then(response => {
                dispatch({ type: DELETE_NOTE, noteId: noteId });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const deleteProject = (projectId, userId, token) => {
    return dispatch => {
        axios
            .delete(`/projects/${userId}/${projectId}.json?auth=${token}`)
            .then(response => {
                dispatch({ type: DELETE_PROJECT, projectId: projectId });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        await axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Keys.firebase}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                },
            )
            .then(response => {
                saveDataToStorage(response.data.idToken, response.data.refreshToken);
                dispatch({
                    type: AUTHENTICATE,
                    userId: response.data.localId,
                    token: response.data.idToken,
                });
            })
            .catch(error => {
                throw new Error(error.response.data.error.message);
            });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        await axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Keys.firebase}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                },
            )
            .then(response => {
                saveDataToStorage(response.data.idToken, response.data.refreshToken);
                dispatch({
                    type: AUTHENTICATE,
                    userId: response.data.localId,
                    token: response.data.idToken,
                });
            })
            .catch(error => {
                throw new Error(error.response.data.error.message);
            });
    };
};

const saveDataToStorage = (token, refreshToken) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            refreshToken: refreshToken,
        }),
    );
};

export const setDidTrial = () => {
    return {
        type: SET_TRIAL_LOGIN,
    };
};

export const fetchRefreshToken = refreshToken => {
    return dispatch => {
        axios
            .post(`https://securetoken.googleapis.com/v1/token?key=${Keys.firebase}`, {
                refreshToken: refreshToken,
                grantType: 'refresh_token',
            })
            .then(response => {
                dispatch({
                    type: FETCH_REFRESH_TOKEN,
                    token: response.data.id_token,
                    refreshToken: response.data.refresh_token,
                    userId: response.data.user_id,
                });
                saveDataToStorage(response.data.id_token, response.data.refresh_token);
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const logout = () => {
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT,
    };
};
