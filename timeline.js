var tlCanvas = document.getElementById("timeline-canvas");
var tlCanvasCtx;
var tlIntervalID;

var offset;
var baseBPM;
var timingObjects = [];
var timing = 0;
var zoomRate = 1;

function prepareCanvas() {
    if (tlCanvas.getContext) {
        tlCanvasCtx = tlCanvas.getContext("2d");
        
        // https://developer.mozilla.org/ja/docs/Web/API/Window/devicePixelRatio
        
        const width = $("#timeline-canvas").attr('width');
        const height = $("#timeline-canvas").attr('height');
        tlCanvas.style.width = `${width}px`;
        tlCanvas.style.height = `${height}px`;

        const scale = window.devicePixelRatio;
        tlCanvas.width = Math.floor(width * scale);
        tlCanvas.height = Math.floor(height * scale);

        tlCanvasCtx.scale(scale, scale);

        const interval = 1.0 / 60.0;
        tlIntervalID = setInterval(loop, interval);
    }
}

function loop() {
    timing = wavesurfer.getCurrentTime();
    drawTimeline(timing, zoomRate);
}

function drawTimeline(timing, zoomRate) {
    tlCanvasCtx.beginPath();
    tlCanvasCtx.clearRect(0, 0, 1000, 150);
    tlCanvasCtx.fillRect(0, 14, 1000, 1);

    tlCanvasCtx.font = "12px Arias";
    tlCanvasCtx.fillStyle = "#333";
    tlCanvasCtx.textBaseline = "top";
    tlCanvasCtx.textAlign = "left";
    tlCanvasCtx.fillText(`${timing.toFixed(3)}`, 0, 0);

    tlCanvasCtx.font = "12px Arias";
    tlCanvasCtx.fillStyle = "#333";
    tlCanvasCtx.textBaseline = "top";
    tlCanvasCtx.textAlign = "right";
    tlCanvasCtx.fillText(`${duration}`, 1000, 0);
}

function newTimingObject(timing, sgnTop, sgnBottom) {
    return {timing: timing, sgnTop: sgnTop, sgnBottom: sgnBottom};
}