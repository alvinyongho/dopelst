
var playlistImage = new Vue({
  el: '#playlist-album-img',
  firebase: {
    current_playlist: playlistRef.orderByKey().equalTo(decodeURI(location.search.split('id=')[1])),
    num_songs: songsRef.orderByChild('playlist').equalTo(decodeURI(location.search.split('id=')[1]))

  },
  data: {
  }
})



var editSongModal = Vue.component('editsongmodal', {
  template: '#modal-template',
  props: ['title', 'artist', 'link'],
  data: function () {
    return {
      songtitle: playlistDetail.song.title,
      songartist: playlistDetail.song.artist,
      songlink: playlistDetail.song.link
    }
  },
  methods: {
    addSong: function(){
      playlistDetail.song.title = this.songtitle;
      playlistDetail.song.artist = this.songartist;
      playlistDetail.song.link = this.songlink;
      playlistDetail.song.playlist = playlistDetail.playlist.identifier;
      playlistDetail.modifySong();
      playlistDetail.showEditModal = false;
    },
  }
})


var addSongModal = Vue.component('addsongmodal', {
  template: '#modal-template',
  props: ['title', 'artist', 'link'],
  data: function () {
    return {
      songtitle: this.title,
      songartist: this.artist,
      songlink: this.link
    }
  },
  methods: {
    addSong: function(){
      playlistDetail.song.title = this.songtitle;
      playlistDetail.song.artist = this.songartist;
      playlistDetail.song.link = this.songlink;
      playlistDetail.song.playlist = playlistDetail.playlist.identifier;
      playlistDetail.addSong();
      playlistDetail.showCreateModal = false;
    }
  }
})


var playlistHeader = new Vue({
  el: '#playlist-banner',
  firebase: {
    current_playlist: playlistRef.orderByKey().equalTo(decodeURI(location.search.split('id=')[1])),
    num_songs: songsRef.orderByChild('playlist').equalTo(decodeURI(location.search.split('id=')[1]))

  },
  data: {
  }
})


var playlistDetail = new Vue({
  el: '#playlist-details-app',
  firebase: {
    songs: songsRef.orderByChild('playlist').equalTo(decodeURI(location.search.split('id=')[1])),
  },
  data: {
    playlist:{
      identifier: decodeURI(location.search.split('id=')[1])
    },
    song: {
      title: '',
      artist: '',
      link: '',
      playlist:'',
      key:'',
    },
    showCreateModal: false,
    showEditModal: false

  },
  methods: {
    addSong: function(){
      console.log('adding playlist')
      if(this.song.title.trim() &&
         this.song.artist.trim() &&
         this.song.link.trim() &&
         this.song.playlist.trim()){

        songsRef.push(this.song);
        this.song.title = '';
        this.song.artist = '';
        this.song.link = '';
        this.song.playlist = '';
      }
    },
    removeSong: function(song){
      console.log('removing playlist')
      songsRef.child(song['.key']).remove()
    },
    editSong: function(song){
      console.log('editing song')
      this.showEditModal = true;
      this.song.title  =  song.title;
      this.song.artist =  song.artist;
      this.song.link   =  song.link;
      this.song.key    =  song['.key'];

      console.log(this.song.title)
      console.log(this.song.artist)
      console.log(this.song.link)
    },
    modifySong: function(){
      songsRef.child(this.song.key).update({title: this.song.title})
      songsRef.child(this.song.key).update({artist: this.song.artist})
      songsRef.child(this.song.key).update({link: this.song.link})
      songsRef.child(this.song.key).update({playlist: this.song.playlist})

    }

  },
  created: function(){

  }
})
