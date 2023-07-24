import './form.js';
import { renderGallery } from './gallery.js';
import { picturesContainer } from './render-photo-miniatures.js';
import { getData } from './api.js';
import { showAlert } from './util.js';


getData()
  .then((thumbnails) => {
    renderGallery(thumbnails, picturesContainer);
  })
  .catch((err) => {
    showAlert(err.message);
  });
