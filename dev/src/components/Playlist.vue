<template>
  <div id="playlists">
    <h1>Playlists</h1>
    <a>Add a playlist</a>

    <form v-on:submit.prevent="createPlaylist()">
      <input v-model="playlist.name" type="text" name="name" placeholder="playlist name"/>
      <input v-model="playlist.description" type="text" name="description" placeholder="playlist description"/>
      <input type="file" />
      <input type="submit" v-on:submit.prevent="createPlaylist()" value="Create Playlist"/>
    </form>

    <div id="index-grid">
      <div class="title-line"></div><!-- .title-line -->
      <div class="index-element" v-for="playlist in playlists">
        <img v-bind:src="playlist.imgurl" class="index-img" alt="album-img">
        <p><a>{{playlist.name}}</a></p>

        <button v-on:click="removePlaylist(playlist)">Delete</button>
        <button @click.prevent="editPlaylist(playlist)">Edit</button>
        <button v-on:click="openPlaylist(playlist)">Details</button>

      </div><!-- .index-element -->
    </div><!-- #index-grid -->

  </div>
</template>

<script>
// import firebase from 'firebase';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAieH1g0trAjkHGDBbmuSV2iKPQXwTYz7Y',
  authDomain: 'dopelst-a697d.firebaseapp.com',
  databaseURL: 'https://dopelst-a697d.firebaseio.com',
  storageBucket: 'dopelst-a697d.appspot.com',
  messagingSenderId: '492354135751',
};

const app = firebase.initializeApp(config);
const db = app.database();
const playlistsRef = db.ref('playlists');

export default {
  name: 'playlists',
  firebase: {
    playlists: playlistsRef,
  },
  data() {
    return {
      playlist: {
        name: '',
        description: '',
        image: '',
      },
    };
  },
  methods: {
    createPlaylist() {
      if (this.playlist.name.trim() && this.playlist.description.trim()) {
        playlistsRef.push(this.playlist);
        this.playlist.name = '';
        this.playlist.description = '';
        this.playlist.image = '';
      }
    },
    removePlaylist(playlist) {
      playlistsRef.child(playlist['.key']).remove();
    },
    openPlaylist(playlist) {
      this.$router.push({ name: 'Playlist-Detail', params: { id: playlist['.key'] } });
    },
  },

};

</script>

<style scoped>

</style>
