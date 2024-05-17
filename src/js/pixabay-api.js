const API_KEY = '43843798-e4c61f3cfe0ada13281a73887';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = (q) => {
    const searchParams = new URLSearchParams({
        q,
        key: API_KEY,
        per_page: 20,
        image_type: "photo",
        orientation: 'horizontal',
        safesearch: true
    });

    return fetch(`${BASE_URL}?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};