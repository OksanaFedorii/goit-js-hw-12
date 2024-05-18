import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { createGalleryItemMarkup } from './js/render-function.js';

let currentPage = 1;
let currentQuery = '';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.js-search-form');
    const galleryEl = document.querySelector('.js-gallery');
    const loaderEl = document.querySelector('.js-loader');
    const loadMoreBtn = document.querySelector('.js-load-more');

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
        loadMoreBtn.classList.add('is-hidden');
        currentPage = 1;
        currentQuery = searchQuery;

        try {
            const data = await fetchPhotosByQuery(currentQuery, currentPage);
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
                loadMoreBtn.classList.remove('is-hidden');
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

    loadMoreBtn.addEventListener('click', async function () {
        currentPage += 1;
        loaderEl.classList.remove('is-hidden');
        loadMoreBtn.classList.add('is-hidden');

        try {
            const data = await fetchPhotosByQuery(currentQuery, currentPage);
            galleryEl.insertAdjacentHTML('beforeend', createGalleryItemMarkup(data.hits));
            initializeLightbox();
            loadMoreBtn.classList.remove('is-hidden');
        } catch (error) {
            console.error('Fetch error:', error);
            iziToast.show({
                message: 'Failed to load more images',
                position: 'topRight',
                timeout: 2000,
                color: 'red',
            });
        } finally {
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