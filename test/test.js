
var soundfile;

var song;

function preload() {
    song = loadSound(soundfile);
}

function draw() {
    document.getElementById("upload").addEventListener("change", handleFiles, false);
}

function handleFiles(event) {
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();

    soundfile = document.getElementById("src").getAttribute("src");
}

function toggleMusic() {
    // if (song.isPlaying()) {
    //     song.stop();
    // } else {
    //     song.play();
    // }
    console.log(soundfile)
}
