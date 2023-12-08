const pianokeys = document.querySelectorAll(".piano-keys .key");
volumeslider = document.querySelector(".volume-slider input");
keyscheckbox = document.querySelector(".keys-checkbox input");


let allKeys = [];
let audio = new Audio("tunes/a.wav");

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key=${key}]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    })
}

pianokeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key))
}, 150);

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showhidekeys = () => {
    pianokeys.forEach(key => key.classList.toggle("hide"));
} 

const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
}

keyscheckbox.addEventListener("click", showhidekeys)
volumeslider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);