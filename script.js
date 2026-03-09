// Handles loading the events for <model-viewer>'s slotted progress bar
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
document.querySelector('model-viewer').addEventListener('progress', onProgress);

const modelViewer = document.querySelector('model-viewer');
const audio = document.querySelector('#ar-audio');

modelViewer.addEventListener('ar-status', (event) => {
  if (event.detail.status === 'session-started') {
    audio.play();
  } else if (event.detail.status === 'not-presenting') {
    audio.pause();
    audio.currentTime = 0;
  }
});