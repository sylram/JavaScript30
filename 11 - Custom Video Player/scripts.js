
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

// const controls = player.querySelector('.player__controls');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const togglePlayButton = player.querySelector('.toggle');
const playerButton = player.querySelector('.player__button');
const pauseButton = player.querySelector('.player__button.pause');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullScreen');


video.addEventListener('click', togglePlay);
togglePlayButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', sizeVideo);

function togglePlay(){
    video.paused ? video.play() : video.pause(); 
    updateButton();
}

function updateButton(){
    const icon = video.paused ? '►' : '❚ ❚';
    togglePlayButton.textContent = icon;
}

function skip(){
    const number = this.getAttribute("data-skip");
    // const number = this.dataset.skip;
    video.currentTime += parseFloat(number);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    console.log(e.offsetX);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function sizeVideo(){
    video.requestFullscreen();

}
//****Alternative with classList add/remove */
// pauseButton.addEventListener('click', togglePlay);
// function togglePlay(){
//     if(video.paused){
//         video.play();
//         playerButton.classList.add('display');
//         pauseButton.classList.remove('display');
//     }else {
//         video.pause();
//         playerButton.classList.remove('display');
//         pauseButton.classList.add('display');
//     }
//     // video.paused ? video.play() : video.pause(); 
// }