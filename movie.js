'use strict';

const ele = require('electron');
const ipc = ele.ipcRenderer;
const desktop = ele.desktopCapturer;
(function(){

	ipc.on('show_movie',function(event,targetDispId){
		console.log(targetDispId);
		console.log('targetDispId');
      showMovie(targetDispId);
    });

	function showMovie(id){
		desktop.getSources({types:['window','screen']},function(error,sources){
			if (error) throw error;
			for (var i = 0; i < sources.length; ++i) {
if (sources[i].id == id) {//キャプチャ対象のnameを設定

	navigator.webkitGetUserMedia({
		audio: false,
		video: {
			mandatory: {
				chromeMediaSource: 'desktop',
				chromeMediaSourceId: sources[i].id,
				minWidth: 1280,
				maxWidth: 1280,
				minHeight: 720,
				maxHeight: 720
			}
		}
	}, gotStream, getUserMediaError);

return;
}
}
});
	}
	function gotStream(stream) {
  document.querySelector('video').src = URL.createObjectURL(stream);
}

function getUserMediaError(e) {
  console.log('getUserMediaError->'+e);
}
}());


//var list = document.getElementById('listArea');
//	classに対して一括で指定できない
//var list = document.getElementsByClassName('screens');
//list.addEventListener('click',stub, false);