// Tailwind configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'accent': '#52b3a2',
            },
            fontFamily: {
                'rasa': ['Rasa', 'serif'],
            },
        }
    }
};

// Video player functionality
function resetVideoPlayer() {
    const thumbnailImage = document.getElementById('thumbnailImage');
    const playButton = document.getElementById('playButton');
    const videoPlayer = document.getElementById('videoPlayer');
    const pauseOverlay = document.getElementById('pauseOverlay');
    
    videoPlayer.classList.add('hidden');
    pauseOverlay.classList.add('hidden');
    thumbnailImage.classList.remove('hidden');
    playButton.classList.remove('hidden');
    
    // Reset video time to start
    videoPlayer.currentTime = 0;
}

function toggleVideo() {
    const thumbnailImage = document.getElementById('thumbnailImage');
    const playButton = document.getElementById('playButton');
    const videoPlayer = document.getElementById('videoPlayer');
    const pauseOverlay = document.getElementById('pauseOverlay');
    
    // If video hasn't started playing yet
    if (thumbnailImage.classList.contains('hidden') === false) {
        thumbnailImage.classList.add('hidden');
        playButton.classList.add('hidden');
        videoPlayer.classList.remove('hidden');
        videoPlayer.play();
        return;
    }
    
    // If video is already playing, toggle play/pause
    if (videoPlayer.paused) {
        videoPlayer.play();
        pauseOverlay.classList.add('hidden');
    } else {
        videoPlayer.pause();
        pauseOverlay.classList.remove('hidden');
    }
}

// Initialize video player when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.addEventListener('ended', resetVideoPlayer);
    }
});
