import moment from 'moment';
import {
    ADD_PROJECT,
    ADD_NOTE,
    GET_PROJECTS,
    GET_NOTES,
    DELETE_NOTE,
    DELETE_PROJECT,
    START_GET_NOTES,
    END_GET_NOTES,
    AUTHENTICATE,
    SET_TRIAL_LOGIN,
    FETCH_REFRESH_TOKEN,
    LOGOUT,
} from '../actions/app';

const initialState = {
    notes: [],
    projects: [],
    loadedNotes: false,
    userId: null,
    token: null,
    didTrialAutoLogin: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state,
                projects: [action.project, ...state.projects],
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: [action.note, ...state.notes],
            };
        case GET_NOTES:
            const fetchedNotes = [...action.notes];
            //Pour trier par odre chronologique
            fetchedNotes.sort(function (a, b) {
                let dateA = moment(a.creationDate),
                    dateB = moment(b.creationDate);
                return dateB - dateA;
            });
            return {
                ...state,
                notes: fetchedNotes,
            };
        case GET_PROJECTS:
            const fetchedProjects = [...action.projects];
            //Pour trier par odre chronologique
            fetchedProjects.sort(function (a, b) {
                let dateA = moment(a.creationDate),
                    dateB = moment(b.creationDate);
                return dateB - dateA;
            });
            return {
                ...state,
                projects: fetchedProjects,
            };
        case DELETE_NOTE:
            let actualNotes = [...state.notes];
            actualNotes = actualNotes.filter(note => note.id != action.noteId);
            return {
                ...state,
                notes: [...actualNotes],
            };
        case DELETE_PROJECT:
            let actualProjects = [...state.projects];
            actualProjects = actualProjects.filter(
                project => project.id != action.projectId,
            );
            return {
                ...state,
                projects: [...actualProjects],
            };
        case START_GET_NOTES:
            return {
                ...state,
                loadedNotes: true,
            };
        case END_GET_NOTES:
            return {
                ...state,
                loadedNotes: false,
            };
        case AUTHENTICATE:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
            };
        case SET_TRIAL_LOGIN:
            return {
                ...state,
                didTrialAutoLogin: true,
            };
        case FETCH_REFRESH_TOKEN:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                didTrialAutoLogin: true,
            };
        case LOGOUT:
            return {
                ...state,
                userId: null,
                token: null,
            };

        default:
            return state;
    }
};
