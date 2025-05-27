let intervalId = null;
let time = 0;

let countDown = document.getElementById('countdown');
let startBtn = document.getElementById('start');
let timeInput = document.getElementById('timeInput');

function parseTime(input) {
    let parts = input.split(':').map(part => parseInt(part, 10));
    if (parts.some(isNaN)) return null;

    let seconds = 0;
    if (parts.length === 3) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
        seconds = parts[0];
    } else {
        return null;
    }
    return seconds;
}

function formatTime(t) {
    let h = Math.floor(t / 3600);
    let m = Math.floor((t % 3600) / 60);
    let s = t % 60;

    return (h > 0 ? String(h).padStart(2, '0') + ':' : '') +
           String(m).padStart(2, '0') + ':' +
           String(s).padStart(2, '0');
}

function updateCountdown() {
    if (time <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        countDown.innerHTML = "Time's up!";
        startBtn.textContent = 'Start'; 
        return;
    }

    countDown.innerHTML = formatTime(time);
    time--;
}


timeInput.addEventListener('input', () => {
    clearInterval(intervalId);
        intervalId = null;
        startBtn.textContent = 'Start'; 
    let newTime = parseTime(timeInput.value.trim());
    if (newTime !== null && newTime >= 0) {
        time = newTime;
        countDown.innerHTML = formatTime(time);
    }
});

startBtn.addEventListener('click', () => {
    if (intervalId === null) {
        
        if (time <= 0) {
            let inputSeconds = parseTime(timeInput.value.trim());
            if (inputSeconds === null || inputSeconds <= 0) {
                alert('Please enter a valid time in HH:MM:SS format.');
                return;
            }
            time = inputSeconds;
        }

        updateCountdown(); 
        intervalId = setInterval(updateCountdown, 1000);
        startBtn.textContent = 'Pause';
    } else {
        clearInterval(intervalId);
        intervalId = null;
        startBtn.textContent = 'Start';
    }
});