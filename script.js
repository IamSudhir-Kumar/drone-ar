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
const arButton = document.querySelector('#ar-button');

// Function to safely play audio
const playAudio = () => {
  // Reset and play to ensure it starts from the beginning on each AR entry
  audio.currentTime = 0;
  audio.play().catch(err => {
    console.warn("Audio playback failed:", err);
  });
};

// Function to safely pause
const stopAudio = () => {
  audio.pause();
};

// Unlock and start audio on user gesture (the AR button click)
arButton.addEventListener('click', () => {
  // On iOS, ar-status 'session-started' does not fire for Quick Look.
  // We must start the audio immediately when they click the button.
  playAudio();
});

modelViewer.addEventListener('ar-status', (event) => {
  console.log("AR Status changed to:", event.detail.status);
  
  if (event.detail.status === 'session-started') {
    // This fires for WebXR (Android / some iOS browsers)
    playAudio();
  } else if (event.detail.status === 'not-presenting') {
    // This fires when exiting AR
    stopAudio();
  }
});

// Fallback: Detect when user returns to Safari from Quick Look
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // When switching to Quick Look app
    // We keep playing or let iOS pause it
  } else {
    // When returning to the browser
    // If we're not in AR anymore, stop the music
    if (modelViewer.getAttribute('ar-status') !== 'session-started') {
      stopAudio();
    }
  }
});