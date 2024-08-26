
import axios from 'axios';

const API_URL = 'https://api.thedogapi.com/v1/images/search';
const API_KEY = 'live_GhXL2pki6pFpAKEfE69Ddrr8AJBlF6kog2F0BNYBbYSloX9FXmcolr1mXK5Ni8QN';

export const fetchDogBreeds = async (page = 0, limit = 20) => {
    const response = await axios.get(API_URL, {
        params: {
            size: 'med',
            mime_types: 'jpg',
            format: 'json',
            has_breeds: true,
            order: 'RANDOM',
            page,
            limit,
        },
        headers: {
            'x-api-key': API_KEY,
        },
    });
    return response.data;
};
