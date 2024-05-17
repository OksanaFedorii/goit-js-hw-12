import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { createGalleryItemMarkup } from './js/render-function.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.js-search-form');
    const galleryEl = document.querySelector('.js-gallery');
    const loaderEl = document.querySelector('.js-loader');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const input = document.querySelector('.js-search-input');
        const searchQuery = input.value.trim();

        if (searchQuery === '') {
            galleryEl.innerHTML = '';
            input.value = '';
            iziToast.show({
                message: 'Input field can not be empty',
                position: 'topRight',
                timeout: 2000,
                color: 'red',
            });
            return;
        }

        galleryEl.innerHTML = '';
        loaderEl.classList.remove('is-hidden');

        try {
            const data = await fetchPhotosByQuery(searchQuery);
            if (data.totalHits === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images for this query',
                    position: 'topRight',
                    timeout: 2000,
                    color: 'red',
                });
            } else {
                galleryEl.innerHTML = createGalleryItemMarkup(data.hits);
                initializeLightbox();
            }
        } catch (error) {
            console.error('Fetch error:', error);
            iziToast.show({
                message: 'Failed to load images',
                position: 'topRight',
                timeout: 2000,
                color: 'red',
            });
        } finally {
            input.value = '';
            loaderEl.classList.add('is-hidden');
        }
    });
});

function initializeLightbox() {
    const lightbox = new SimpleLightbox('.gallery a', {
        overlayOpacity: 1,
        captionsData: 'alt',
        captionsDelay: 250,
        nav: true,
        close: true,
        showCounter: true,
        animationSpeed: 300,
        fadeSpeed: 300,
    });

    lightbox.refresh();
}