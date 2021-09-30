
var sound;

function draw() {
    document.getElementById("upload").addEventListener("change", handleFiles, false);
}

function handleFiles(event) {
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();

    document.getElementById("src").createAtrribute("download");
}

