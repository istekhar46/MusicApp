console.log("hello");
let audioElem = new Audio("./songs/1.mp3");
let playbtn = document.getElementById("playbtn");
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById("gif");
let songinfo = document.getElementById("song-info");
let songitem = Array.from(document.getElementsByClassName("song-item"));
let songIndex = 0;


let songs = [
    { songname: "Ncs 1.mp3", filepath: "./songs/1.mp3", coverpath: "./covers/1.jpg" },
    { songname: "Ncs 2.mp3", filepath: "./songs/2.mp3", coverpath: "./covers/2.jpg" },
    { songname: "Ncs 3.mp3", filepath: "./songs/3.mp3", coverpath: "./covers/3.jpg" },
    { songname: "Ncs 4.mp3", filepath: "./songs/4.mp3", coverpath: "./covers/4.jpg" },
    { songname: "Ncs 5.mp3", filepath: "./songs/5.mp3", coverpath: "./covers/5.jpg" },
    { songname: "Ncs 6.mp3", filepath: "./songs/6.mp3", coverpath: "./covers/6.jpg" },
    { songname: "Ncs 7.mp3", filepath: "./songs/6.mp3", coverpath: "./covers/6.jpg" }
]

songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songname;
    // element.getElementsByClassName("timestamp")[0].innerHTML = new Audio(songs[i].currentTime).currentTime;
})

// handle play pause click

playbtn.addEventListener('click', (e) => {
    if (audioElem.paused || audioElem.currentTime <= 0) {
        audioElem.play();
        playbtn.classList.remove('fa-circle-play');
        playbtn.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElem.pause();
        playbtn.classList.remove('fa-circle-pause');
        playbtn.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioElem.addEventListener('timeupdate', () => {
    progress = parseInt((audioElem.currentTime / audioElem.duration) * 100);
    progressbar.value = progress;
})

progressbar.addEventListener('change', () => {
    audioElem.currentTime = parseInt((progressbar.value * audioElem.duration) / 100);
})


const makePlayAll = () => {
    Array.from(document.getElementsByClassName("song-play-btn")).forEach((element) => {

        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');

    })
}

Array.from(document.getElementsByClassName("song-play-btn")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makePlayAll();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElem.src = `./songs/${songIndex+1}.mp3`;
        audioElem.currentTime = 0;
        audioElem.play();
        playbtn.classList.remove('fa-circle-play');
        playbtn.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        songinfo.innerText = songs[songIndex].songname;
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElem.src = `./songs/${songIndex}.mp3`
    audioElem.currentTime = 0;
    audioElem.play();
    playbtn.classList.remove('fa-circle-play');
    playbtn.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    songinfo.innerText = songs[songIndex].songname;

})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6;
    }
    else {
        songIndex -= 1;
    }
    audioElem.src = `./songs/${songIndex}.mp3`
    audioElem.currentTime = 0;
    audioElem.play();
    playbtn.classList.remove('fa-circle-play');
    playbtn.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    songinfo.innerText = songs[songIndex].songname;

})


