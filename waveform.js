var file;
var working;

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    height: 30,
    normalize: true,
    barGap: 3,
    barWidth: 1,
    cursorWidth: 1,
    cursorColor: '#159',
    progressColor: '#4cf',
    waveColor: '#444',
});

var duration;

wavesurfer.on('finish', function(){
    wavesurfer.seekTo(0);
    $('#toolbar2 input:nth-child(1)').attr('value', '再生');
});

wavesurfer.on('ready', function(url){
    duration = wavesurfer.getDuration().toFixed(3);
    prepareCanvas();
});

$('.toolbar-file > label > input').on('change', function(){
    file = $(this).prop('files')[0];

    wavesurfer.loadBlob(file);

    $('.toolbar-file > p').text(file.name);
});

function playpause() {
    wavesurfer.playPause();
    if (wavesurfer.isPlaying())
        $('#toolbar2 input:nth-child(1)').attr('value', '停止');
    else
        $('#toolbar2 input:nth-child(1)').attr('value', '再生');
}