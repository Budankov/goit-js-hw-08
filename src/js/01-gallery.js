// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galleryListEl = document.querySelector('.gallery');

const createMarkupElemetsGallery = ({ preview, original, description }) =>
  `<a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`;

const makeGalleryItem = galleryItems.map(createMarkupElemetsGallery).join('');

galleryListEl.insertAdjacentHTML('beforeend', makeGalleryItem);

// Usage SimpleLightbox
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
