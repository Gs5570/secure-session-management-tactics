/**
 * Allow us to set the url of the back end application so we do not have to retype it.
 */

import axios from "axios";

const BASE_URL = 'http://localhost:8080';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true

    //difference with the last baby
});