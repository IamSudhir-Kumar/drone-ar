// Handles loading the events for <model-viewer's> slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

const enterAR = () => {
  const modelViewer = document.querySelector('model-viewer');
  modelViewer.addEventListener('load', () => {
    // Automatically enter AR mode when the model is loaded
    const arButton = modelViewer.shadowRoot.querySelector('button[slot="ar-button"]');
    if (arButton) {
      arButton.click();
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const modelViewer = document.querySelector('model-viewer');
  modelViewer.addEventListener('progress', onProgress);
  enterAR();
});
