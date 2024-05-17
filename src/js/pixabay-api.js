import axios from 'axios';
const API_KEY = '43843798-e4c61f3cfe0ada13281a73887';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = async (q) => {
    const searchParams = new URLSearchParams({
        q,
        key: API_KEY,
        per_page: 20,
        image_type: "photo",
        orientation: 'horizontal',
        safesearch: true
    });

    try {
        const response = await axios.get(`${BASE_URL}?${searchParams}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
};

