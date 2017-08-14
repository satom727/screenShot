'use strict';

const ele = require('electron');
const ipc = ele.ipcRenderer;
const desktop = ele.desktopCapturer;
(function(){
		console.log('screen js!');    
	ipc.on('iconClicked', function(event, message) {
		desktop.getSources({types: ['window', 'screen']}, function(error, sources) {
			if (error) throw error;
			var listArea = document.getElementById('listArea');
			var srcLen = sources.length;
			for (var i = 0; i < srcLen; ++i) {
				console.log(sources[i]);
				var imgTag = document.createElement('img');
				imgTag.setAttribute('src',sources[i].thumbnail.toDataURL());
				var br =document.createElement('br');
				var li = document.createElement('li');
				li.addEventListener('click',imgWindow, false);
				li.setAttribute('class', 'screens');
				li.setAttribute('id',sources[i].id );
				li.textContent = sources[i].name;
				li.appendChild(br);
				li.appendChild(imgTag);
				listArea.appendChild(li);
			}
		});
	});
	function imgWindow(eve){
        //ここでid取れてない
		var targetDispId = eve.srcElement.id;
		console.log(targetDispId);
		console.log('targetDispId in screenjs');
		ipc.send('imgWindow',targetDispId);
	}
}());


//var list = document.getElementById('listArea');
//	classに対して一括で指定できない
//var list = document.getElementsByClassName('screens');
//list.addEventListener('click',stub, false);