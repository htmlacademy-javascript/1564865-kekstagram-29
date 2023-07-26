import { hideUploadOverlay, setOnFormSubmit } from './form.js';
import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { initFilterModule, getFilteredPictures } from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideUploadOverlay();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initFilterModule(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}
