<template>
  <div id="playlist">
    <section id="playlist-view">
      <div id="header">
        <h1>Playlists</h1>
        <a v-on:click="showCreateModal()">ADD PLAYLIST</a>
      </div><!-- #header -->
      <div id="playlist-grid">
        <div class="playlist-element" v-for="playlist in playlists">
          <img v-bind:src="playlist.imgurl" class="playlist-img" v-bind:alt="playlist.name" v-on:click="openPlaylist(playlist)" />
          <a class="playlist-name" v-on:click="openPlaylist(playlist)">{{playlist.name}}</a>

          <button v-on:click="removePlaylist(playlist)">Delete</button>
          <button v-on:click.prevent="showEditModal(playlist)">Edit</button>
        </div><!-- .playlist-element -->
      </div><!-- #playlist-grid -->
    </section><!-- #playlist-view -->

    <playlist-modal
      name="Create Playlist"

      v-bind:playlist="playlist"
      v-bind:currentImage="currentImage"
      v-bind:uploadingImage="uploadingImage"
      v-bind:uploadProgress="uploadProgress"
      v-bind:modalVisible="createModalVisible"

      v-bind:closeModal="closeModal"
      v-bind:playlistAction="createPlaylist"
      v-bind:onFileChange="onFileChange"
    />

    <playlist-modal
      name="Edit Playlist"

      v-bind:playlist="playlist"
      v-bind:currentImage="currentImage"
      v-bind:imageUnchanged="imageUnchanged"
      v-bind:uploadingImage="uploadingImage"
      v-bind:uploadProgress="uploadProgress"
      v-bind:modalVisible="editModalVisible"

      v-bind:closeModal="closeModal"
      v-bind:playlistAction="editPlaylist"
      v-bind:onFileChange="onFileChange"
    />
  </div>
</template>

<script>
import firebase from 'firebase';

// eslint-disable-next-line
import PlaylistModal from './elements/PlaylistModal.vue';

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

const storageRef = firebase.storage().ref();
const playlistImagesDir = 'playlistImages';

export default {
  name: 'playlists',
  components: {
    PlaylistModal,
  },
  firebase: {
    playlists: playlistsRef,
  },
  data() {
    return {
      playlist: {
        name: '',
        description: '',
        image: '',
        imgurl: '',
      },
      currentImage: {},
      imageUnchanged: true,
      uploadingImage: false,
      uploadProgress: 0,
      createModalVisible: false,
      editModalVisible: false,
    };
  },
  methods: {
    createPlaylist() {
      if (this.playlist.name.trim() && this.playlist.description.trim()) {
        this.uploadImage(() => {
          playlistsRef.push(this.playlist);
          this.uploadingImage = false;
          this.closeModal();
        });
      }
    },
    editPlaylist() {
      if (this.playlist.name.trim() && this.playlist.description.trim()) {
        const key = this.playlist['.key'];

        if (this.imageUnchanged) {
          playlistsRef.child(key).update({
            name: this.playlist.name,
            description: this.playlist.description,
          }).then(
            () => this.closeModal(),
            (err) => {
              // eslint-disable-next-line
              console.error(err);
            },
          );
        } else {
          this.uploadImage(() => {
            playlistsRef.child(key).update({
              name: this.playlist.name,
              description: this.playlist.description,
              image: this.playlist.image,
              imgurl: this.playlist.imgurl,
            }).then(
              () => {
                this.uploadingImage = false;
                this.closeModal();
              },
              (err) => {
                // eslint-disable-next-line
                console.error(err);
              },
            );
          });
        }
      }
    },
    removePlaylist(playlist) {
      playlistsRef.child(playlist['.key']).remove();
    },
    openPlaylist(playlist) {
      this.$router.push({ name: 'Playlist-Detail', params: { id: playlist['.key'], name: playlist.name } });
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.currentImage = files[0];
      this.imageUnchanged = false;
    },
    uploadImage(cb) {
      this.uploadingImage = true;

      const targetFile = this.currentImage;
      const filename = `${firebase.auth().currentUser.uid}_${Date.now()}_${targetFile.name}`;
      const relativeUrl = `${playlistImagesDir}/${filename}`;
      const uploadPathRef = storageRef.child(relativeUrl);

      const uploadTask = uploadPathRef.put(targetFile);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadProgress = progress.toFixed(2);

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              // eslint-disable-next-line
              // console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              // eslint-disable-next-line
              // console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (err) => {
          // eslint-disable-next-line
          console.error(err);

          this.uploadingImage = false;
        },
        () => {
          this.playlist.image = relativeUrl;
          this.playlist.imgurl = uploadTask.snapshot.downloadURL;

          cb();
        },
      );
    },
    showCreateModal() {
      this.createModalVisible = true;
    },
    showEditModal(playlist) {
      this.playlist = playlist;

      this.editModalVisible = true;
    },
    closeModal() {
      this.createModalVisible = false;
      this.editModalVisible = false;
      this.resetForms();
    },
    resetForms() {
      this.playlist = {
        name: '',
        description: '',
        image: '',
        imgurl: '',
      };

      this.currentImage = {};
      this.imageUnchanged = true;
      this.uploadProgress = 0;

      Array.prototype.slice.call(document.forms).forEach(form => form.reset());
    },
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
</style>
