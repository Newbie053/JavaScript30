/* Get Our Elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build out functions */
function togglePlay(){
    // if(video.paused){
    //     video.play();
    // }
    // else{
    //     video.pause();
    // }
    const method = video.paused ? 'play':'pause';
    video[method]();
}
function updateButton(){
    const icon = this.paused ? '►':'❚ ❚';
    toggle.textContent = icon;
}
function skip(){
console.log(this.dataset.skip);
video.currentTime+=parseFloat(this.dataset.skip);;
}

function handleRangeUpdate(){
    video[this.name]=this.value;
    //console.log(this.value);

  if (this.name === "playbackRate") {
    const overlay = document.querySelector('.speed-overlay');
    overlay.textContent = `${this.value}×`;
    overlay.style.opacity = 1;

    // hide after 1s
    clearTimeout(window.speedTimeout);
    window.speedTimeout = setTimeout(() => {
      overlay.style.opacity = 0;
    }, 1000);
  }
}

function handleProgress(){
    const parcent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${parcent}%`;
}
function scrub(e){
    //console.log(e);
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;

}

/* Hook up the event listeners */
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
toggle.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',handleProgress);
skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate));

progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
let mousedown = false;
progress.addEventListener('mousedown',()=> mousedown=true);
progress.addEventListener('mouseup',()=> mousedown=false);