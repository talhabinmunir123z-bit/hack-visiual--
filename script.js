let time = 300;
let progress = 0;

function speakWarning() {
    let voice = new SpeechSynthesisUtterance(
        "Warning. Your device is at risk. Security breach detected."
    );

    voice.rate = 0.85;
    voice.pitch = 0.7;
    voice.volume = 1;

    speechSynthesis.speak(voice);
}

function startScan(){

    const login = document.getElementById("login");
    if (login) {
        login.classList.add("hidden");
    }

    const scan = document.getElementById("scan");
    if (scan) {
        scan.classList.remove("hidden");
    }

    let bar = document.getElementById("bar");
    let percent = document.getElementById("percent");
    let timer = document.getElementById("timer");
    let terminal = document.getElementById("terminal");

    // Voice 10 times
    let voiceCount = 0;

    function repeatVoice(){

        if(voiceCount >= 10) return;

        speakWarning();
        voiceCount++;

        setTimeout(repeatVoice, 5000);
    }

    repeatVoice();

    setInterval(() => {

        progress += 1;

        if(progress > 100)
            progress = 1;

        bar.style.width = progress + "%";
        percent.textContent = progress + "%";

        let min = Math.floor(time / 60);
        let sec = time % 60;

        timer.textContent =
            String(min).padStart(2,"0") + ":" +
            String(sec).padStart(2,"0");

        time--;

        if(time < 0){
            time = 300;
        }

        let lines = [
            "> Scanning system files...",
            "> Checking device security...",
            "> Analyzing network...",
            "> Accessing system modules...",
            "> Monitoring processes...",
            "> Security protocol active...",
            "> Encryption check running..."
        ];

        terminal.innerHTML =
            lines[Math.floor(Math.random()*lines.length)];

    },1000);
}