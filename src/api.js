import axios from 'axios';

const userDetails = JSON.parse(localStorage.getItem('userDetails'));

const api = axios.create({
    baseURL: 'http://localhost:3000', // Adjust the base URL as necessary
    headers: {
        Authorization: `Bearer ${userDetails.token}`,
        'Content-Type': 'application/json',
    },
});

export default api;
