<template>
  <div id="playlist">
    <section id="playlist-view">
      <div id="header">
        <h1>Playlists</h1>
        <a v-on:click="showModal()">ADD PLAYLIST</a>
      </div><!-- #header -->
      <div id="playlist-grid">
        <div class="playlist-element" v-for="playlist in playlists">
          <img v-bind:src="playlist.imgurl" class="playlist-img" v-bind:alt="playlist.name" v-on:click="openPlaylist(playlist)" />
          <a class="playlist-name" v-on:click="openPlaylist(playlist)">{{playlist.name}}</a>

          <button v-on:click="removePlaylist(playlist)">Delete</button>
          <button v-on:click.prevent="editPlaylist(playlist)">Edit</button>
        </div><!-- .playlist-element -->
      </div><!-- #playlist-grid -->
    </section><!-- #playlist-view -->

    <transition name="modal" v-on:after-enter="focusForm">
      <div id="create-playlist-modal" class="modal-mask" v-on:click="closeModal" v-show="modalVisible" transition="modal">
        <div class="modal-wrapper">
          <div class="modal-container" v-on:click.stop>
            <div class="modal-body">
              <form v-on:submit.prevent="createPlaylist">
                <input id="create-playlist-modal-autofocus" v-model="playlist.name" type="text" name="name" placeholder="playlist name" />
                <input v-model="playlist.description" type="text" name="description" placeholder="playlist description" />
                <input type="file" />
                <input type="submit" v-on:submit.prevent="createPlaylist" value="Create Playlist" />
              </form>
              <button v-on:click="closeModal">Cancel</button>
            </div><!-- .modal-body -->
          </div><!-- .modal-container -->
        </div><!-- .modal-wrapper -->
      </div><!-- #create-playlist-modal.modal-mask -->
    </transition>
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
      modalVisible: false,
    };
  },
  methods: {
    createPlaylist() {
      if (this.playlist.name.trim() && this.playlist.description.trim()) {
        playlistsRef.push(this.playlist);
        this.closeModal();
      }
    },
    removePlaylist(playlist) {
      playlistsRef.child(playlist['.key']).remove();
    },
    openPlaylist(playlist) {
      this.$router.push({ name: 'Playlist-Detail', params: { id: playlist['.key'], name: playlist.name } });
    },
    showModal() {
      this.modalVisible = true;
    },
    focusForm() {
      document.getElementById('create-playlist-modal-autofocus').focus();
    },
    closeModal() {
      this.modalVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.playlist.name = '';
      this.playlist.description = '';
      this.playlist.image = '';
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      const KEY_ESC = 27;
      if (this.showModal && e.keyCode === KEY_ESC) {
        this.closeModal();
      }
    });
  },
};

</script>

<style scoped>
#playlist {
  padding-top: 62px;
}

section#playlist-view {
  margin: 0 auto;
}

section#playlist-view #header {
  margin-top: 2em;
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid black;
}

section#playlist-view #header h1 {
  margin: 0;

  display: inline-block;

  font-size: 2em;
}

section#playlist-view #header a {
  margin: 0;

  float: right;

  font-size: 0.75em;
}

#playlist-grid {
  text-align: center;
}

#playlist-grid .playlist-element {
  margin: 5px 20px 40px;
  width: 160px;

  display: inline-block;
}

#playlist-grid .playlist-element .playlist-img {
  width: 160px;
  height: 160px;

  cursor: pointer;

  box-shadow: 0 2px 4px rgba(0,0,0,.5);
}

#playlist-grid .playlist-element .playlist-name {
  display: block;

  cursor: pointer;

  font-weight: bold;
  text-transform: uppercase;
}

#playlist-grid .playlist-element .playlist-name:hover {
  color: #7c7c7c;
}

@media (min-width: 701px) {
  section#playlist-view {
    width: 60%;
  }
}

@media (max-width: 700px) {
  section#playlist-view {
    width: 90%;
  }
}


/* Modal Styles */

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
