'use strict';
const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const window = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

var appIcon = null;
app.on('ready', function(){
	var eleScreen = electron.screen;
	appIcon = new Tray(__dirname + '/icon.png');
	appIcon.setToolTip('This is my application.');
	appIcon.window = new window({title:"menu",show:false});
	app.dock.hide();
	appIcon.window.loadURL('file://' + __dirname + '/main.html');
	var con = appIcon.window.webContents;

	var imgWindow = null;
	ipcMain.on('imgWindow', function(event,targetDispId) {
		console.log(targetDispId);
		console.log("targetDispId in mainjs");
		imgWindow = new window({width: 800, height: 500,frame:true});
		var con = imgWindow.webContents;
		imgWindow.loadURL('file://' + __dirname + '/img.html');
		setTimeout(function(){
			con.send('show_movie',targetDispId);
		}
		,1000);
		event.sender.send('re-imgWindow','imgWindow!');
	});

	appIcon.on('click',function(eve,bound){
		con.send('iconClicked');
		appIcon.window.show();
		app.dock.show();
		console.log('app icon clicked & make screen select window!(in mainjs)');
		var allDisp = eleScreen.getAllDisplays();
		for (var i = allDisp.length - 1; i >= 0; i--) {
			console.log(allDisp[i]);
		};
	});
});