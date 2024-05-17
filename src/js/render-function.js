export function createGalleryItemMarkup(items) {
    return items.map(item => `
        <a href="${item.largeImageURL}" class="gallery-item" data-lightbox="gallery">
            <img src="${item.webformatURL}" alt="${item.tags}" />
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Likes</strong> ${item.likes}</li>
                <li class="list-group-item"><strong>Views</strong> ${item.views}</li>
                <li class="list-group-item"><strong>Comments</strong> ${item.comments}</li>
                <li class="list-group-item"><strong>Downloads</strong> ${item.downloads}</li>
              </ul>
            </div>
        </a>   
    `).join('');
};
