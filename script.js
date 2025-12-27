const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const trackArt = document.getElementById('track-art');
const TrackNumber = document.getElementById('track-number');

// Массив треков
const tracks = [
    {
        title: "Тема 1",
        artist: "Нереальный чел",
        src: "sound.mp3", 
        cover: "podcast.jpg" 
    },
    {
        title: "Тема 2",
        artist: "Крутой перец",
        src: "sound.mp3", 
        cover: "podcast2.jpg"
    },
    {
        title: "Тема 3",
        artist: "Чумачечий чувак",
        src: "sound.mp3",
        cover: "podcast3.jpg"
    }
];

let currentTrackIndex = 0;

// Функция загрузки трека в плеер
function loadTrack(index) {
    const track = tracks[index];
    trackName.innerText = track.title;
    trackArtist.innerText = track.artist;
    audio.src = track.src;
    trackArt.src = track.cover;
}

// Инициализация при загрузке страницы
window.onload = () => {
    loadTrack(currentTrackIndex);
};

// Плей / Пауза
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = 'Pause';
    } else {
        audio.pause();
        playBtn.innerText = 'Play';
    }
});

// Кнопка Вперед
document.getElementById('next').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; 
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.innerText = 'Pause';
});

// Кнопка Назад
document.getElementById('prev').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; 
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.innerText = 'Pause';
});

// Автопереключение при окончании трека
audio.addEventListener('ended', () => {
    document.getElementById('next').click();
});

// Громкость
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});
