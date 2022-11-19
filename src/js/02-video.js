import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimedUpdate, 500));

function onTimedUpdate(e) {
  localStorage.setItem(STORAGE_CURRENT_TIME, e.seconds);
}

const getCurrentTime = localStorage.getItem(STORAGE_CURRENT_TIME);
if (getCurrentTime !== null) {
  player.setCurrentTime(getCurrentTime);
}
