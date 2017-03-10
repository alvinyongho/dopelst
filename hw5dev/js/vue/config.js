var config = {
  apiKey: "AIzaSyAvwIsqBLMWpS_HcG3_YrdOnwC-rapgkK0",
  authDomain: "dopelstvue.firebaseapp.com",
  databaseURL: "https://dopelstvue.firebaseio.com",
  storageBucket: "dopelstvue.appspot.com",
  messagingSenderId: "544719897710"
};
var app = firebase.initializeApp(config);
var db = app.database();
Vue.use(VueFire)

var playlistRef = db.ref('playlists');
var songsRef = db.ref('songs');
var storageRef = firebase.storage().ref();


var albumImageDir = ('albumImages/')
