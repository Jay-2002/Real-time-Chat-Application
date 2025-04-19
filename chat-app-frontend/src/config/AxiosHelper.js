import axios from 'axios';

// public axios
export const baseURL = "http://localhost:8080"; // backend endpoint
export const httpClient = axios.create({
    baseURL: baseURL,
});