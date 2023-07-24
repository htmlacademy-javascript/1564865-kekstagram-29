import { hideUploadOverlay, setOnFormSubmit } from './form.js';
import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

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
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
