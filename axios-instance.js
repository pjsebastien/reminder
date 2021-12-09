import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reminder-fcb1b-default-rtdb.firebaseio.com/',
});
export default instance;
