// selecting DOM Elements
const musicContainer = document.querySelector(".music-container");
const musicCoverImage = document.querySelector(".music-info__cover");
const musicName = document.querySelector(".music-info__name");
const musicSinger = document.querySelector(".music-info__singer");
const currentTimeEl = document.querySelector(".currentTime");
const durationEl = document.querySelector(".duration");
const progressBar = document.querySelector(".progress-bar");
const progressBarFiller = document.querySelector(".progressbar-filler");
const prevBtn = document.getElementById("prevbtn");
const nextBtn = document.getElementById("nextbtn");
const playPauseBtn = document.getElementById("playpausebtn");
const playPauseBtnIcon = document.querySelector("#playpausebtn i");
const audioEl = document.getElementById("audio");
// Music Array all the Data Stores Here

// Tracking the Index of the Music Array
let musicIndex = 0;
let playing = false;
let updateTimer;
const musicArray = [
  {
    title: "Purpose",
    singer: "Justin Bieber",
    coverImage: "./img/purpose.jpg",
    song: "./music/purpose.mp3",
  },
  {
    title: "Middle Child",
    singer: "JCole",
    coverImage: "./img/middlechild.jpg",
    song: "./music/middlechild.mp3",
  },
  {
    title: "Sicko Mode",
    singer: "Travis Scott Feat Drake",
    coverImage: "./img/sickomode.jpg",
    song: "./music/sickomode.mp3",
  },
];

const getMinutesAndSecond = function (duration) {
  const seconds = String(Math.floor(duration % 60)).padStart(2, 0);
  const minutes = Math.floor((duration - seconds) / 60);
  return `${minutes}:${seconds}`;
};

const onMusicLoad = function (idx) {
  musicName.textContent = idx.title;
  musicSinger.textContent = idx.singer;
  musicCoverImage.style.backgroundImage = `url(${idx.coverImage})`;
  audioEl.src = `${idx.song}`;
  // Sets the Content to 0:00
  durationEl.textContent = "0:00";
  updateTimer = setInterval(() => {
    if (!Number.isNaN(audioEl.duration)) {
      durationEl.textContent = getMinutesAndSecond(audioEl.duration);
    } else {
      durationEl.textContent = "0:00";
    }
  }, 1000);
};

// Plays the Song
const playSong = function () {
  playing = true;
  playPauseBtnIcon.classList.remove("fa-play");
  playPauseBtnIcon.classList.add("fa-pause");
  audioEl.play();
};
// Pauses the Song
const pauseSong = function () {
  playing = false;
  playPauseBtnIcon.classList.remove("fa-pause");
  playPauseBtnIcon.classList.add("fa-play");
  audioEl.pause();
};

// Dynamically Playing on Click
const playPauseSong = () => {
  if (playing) {
    pauseSong();
  } else {
    playSong();
  }
};

// Previous Song
const prev = function () {
  if (musicIndex === 0) {
    musicIndex = musicArray.length - 1;
  } else {
    musicIndex--;
  }
  pausePlayLoad();
};

// Next Song
const next = function () {
  if (musicIndex === musicArray.length - 1) {
    musicIndex = 0;
  } else {
    musicIndex++;
  }
  pausePlayLoad();
};

// Helper function
const pausePlayLoad = function () {
  clearInterval(updateTimer);
  onMusicLoad(musicArray[musicIndex]);
  pauseSong();
  playSong();
};

const updateProgress = function (e) {
  const { currentTime, duration } = e.srcElement;
  const progress = (currentTime / duration) * 100;
  progressBarFiller.style.width = `${progress}%`;

  if (!Number.isNaN(progress)) {
    currentTimeEl.textContent = getMinutesAndSecond(
      (currentTime / duration) * 100
    );
  } else {
    currentTimeEl.textContent = "0:00";
  }
};

const setProgress = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioEl.duration;
  audioEl.currentTime = (clickX / width) * duration;
  currentTimeEl.textContent = getMinutesAndSecond((clickX / width) * duration);
};

// Event Handlers
playPauseBtn.addEventListener("click", playPauseSong);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
audioEl.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", setProgress);
audioEl.addEventListener("ended", next);

// On Load
onMusicLoad(musicArray[musicIndex]);
