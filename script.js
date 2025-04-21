const glitterBtn = document.getElementById('glitter-btn');
const popupMessage = document.getElementById('popupMessage');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const goodbyeBtn = document.getElementById('goodbyeBtn');

let glitterSound;
window.addEventListener('load', () => {
  glitterSound = new Audio();

  const soundPaths = [
    'sounds/sound-effect-twinklesparkle-115095.mp3',  // Most common
  ];
  
  const testAudio = (index = 0) => {
    if (index >= soundPaths.length) return;
    
    glitterSound.src = soundPaths[index];
    glitterSound.volume = 0.5;
    
    glitterSound.play().then(() => {
      console.log("Audio works at path:", soundPaths[index]);
      glitterSound.pause();
      glitterSound.currentTime = 0;
    }).catch(e => {
      console.log("Trying next path...", e);
      testAudio(index + 1);
    });
  };
  
  testAudio();
});

// Show pop-up when button is clicked

glitterBtn.addEventListener('click', () => {
  popupMessage.style.display = 'block';
  overlay.style.display = 'block';

// Play sound with multiple fallbacks
  try {
    if (glitterSound) {
      glitterSound.currentTime = 0; // Rewind if already played
      glitterSound.play().catch(e => {
        console.error("Main audio failed, trying fallback:", e);
        playFallbackSound();
      });
    } else {
      playFallbackSound();
    }
  } catch (e) {
    console.error("Sound error:", e);
    playFallbackSound();
  }
});

function playFallbackSound() {

  const fallback = new Audio('https://www.myinstants.com/media/sounds/myspace.mp3');
  fallback.volume = 0.3;
  fallback.play().catch(e => console.log("Fallback audio failed:", e));
}
        
  // Close pop-up with X button
  closeBtn.addEventListener('click', closePopup);

  // Close pop-up with glitter GIF button
  goodbyeBtn.addEventListener('click', closePopup);

  // Close when clicking outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup();
    }
  });

  function closePopup() {
    popupMessage.style.display = 'none';
    overlay.style.display = 'none';
  }