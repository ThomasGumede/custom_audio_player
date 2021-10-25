const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress_bar");
const progressContainer = document.getElementById("progress_container");
const audio = document.getElementById("audio");
const repeat = document.getElementById("repeat");
const cover = document.getElementById("cover");
const currTime = document.querySelector(".currTime");
const durTime = document.querySelector(".duration");
const music_title = document.querySelectorAll(".audio_title");
const artists = document.getElementById("artist");

const songs = [
  {
    id: 1,
    src: "/songs/hey.mp3",
    imgSrc: "/imgs/hey.jpg",
    title: "Hey",
    artists: "Zola ft hulu",
  },
  {
    id: 2,
    src: "/songs/summer.mp3",
    imgSrc: "/imgs/summer.jpg",
    title: "Summer",
    artists: "Zola ft hulu",
  },
  {
    id: 3,
    src: "/songs/ukulele.mp3",
    imgSrc: "/imgs/ukulele.jpg",
    title: "Ekulele",
    artists: "Zola ft hulu",
  }
];

let songIndex = songs.length - 1

startSong(songs[songIndex])

// startSong
function startSong(song) {
    music_title.forEach(ele => {
        ele.innerText = song.title;
    });
    artists.textContent = song.artists;
    audio.src = song.src
    cover.src = song.imgSrc
}

// Play song
function playSong() {
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  startSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  startSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// format time for music
const formatTime=secs=>{
  let min = Math.floor((secs % 3600) / 60); 
  let sec = Math.floor(secs % 60)
  if (sec<10){
    sec=`0${sec}`
  }

  return `${min}:${sec}`
}

playBtn.addEventListener("click", () => {

  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});



// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Time of song
audio.addEventListener("timeupdate", DurTime);