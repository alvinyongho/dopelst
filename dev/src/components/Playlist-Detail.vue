<template>
  <div id="playlist">
    <div id="playlist-banner">
      <h1>{{playlist[0].name}}</h1>
      <h4>{{playlist[0].description}}</h4>
      <p>Playlist · {{songs.length}} Songs</p>
    </div><!-- .playlist-banner -->

    <div id="playlist-album-img">
      <img v-bind:src="playlist[0].imgurl" alt="playlist album cover" />
    </div><!-- #playlist-album-img -->


    <a v-on:click="showCreateModal()">Add Song</a>

    <SongModal name="Create Song"
    v-bind:song="song"
    v-bind:modalVisible="createModalVisible"

    v-bind:closeModal="closeModal"
    v-bind:songAction="createSong"
    />

    <SongModal name="Edit Song"
    v-bind:song="song"
    v-bind:modalVisible="editModalVisible"

    v-bind:closeModal="closeModal"
    v-bind:songAction="editSong"
    />

    <!-- end #create-song -->

    <table>
      <thead>
        <th>SONGS</th>
        <th><a>ADD SONG</a></th>
        <!-- use the modal component, pass in the prop -->
      </thead>


      <tr v-for="song in songs">
        <!--  Song title and tags -->
        <td>
          <span class ="songs-list-details"><a href="/song-details.html" id="song-list-title">{{song.name}} </a> · {{song.artist}}</span>
        </td>
        <td>
            <!-- Song buttons -->
            <div class="songs-buttons">
              <span class="song-btn">4:19</span>

              <div class="dropdown" id="dropdown-menu">
                <button class="dropbtn">Play</button>
                <div class="dropdown-content" id="#dropdown-play">
                  <a href="">SPOTIFY</a>
                  <a href="">ITUNES</a>
                  <a href="">YOUTUBE</a>
                </div> <!--.dropdown-content-->
              </div><!--.dropdown #dropdown-play-->

              <a @click.prevent="showEditModal(song)" class="song-btn">Edit</a>

              <div class="dropdown" id="dropdown-menu">
                <button class="dropbtn">Menu</button>
                <div class="dropdown-content">
                  <a href="/share.html">SHARE</a>
                  <a v-on:click="removeSong(song)">DELETE</a>
                </div><!--.dropdown-content-->
              </div><!-- .dropdown -->
          </div><!-- #song-btn-wrapper -->
        </td>
      </tr> <!-- End of single entry -->
    </table>

  </div>
</template>




<script>
import firebase from 'firebase';
import SongModal from './elements/SongModal';

const db = firebase.database();
const playlistsRef = db.ref('playlists');
const songsRef = db.ref('songs');
// const playlistSingle = playlistsRef.orderByKey().equalTo(this.$route.params.id);

export default {
  name: 'detail',
  components: { SongModal },
  firebase() {
    return {
      playlist: {
        source: playlistsRef.orderByKey().equalTo(this.$route.params.id),
      },
      songs: {
        source: songsRef.orderByChild('playlist').equalTo(this.$route.params.id),
      },
    };
  },
  data() {
    return {
      song: {
        name: '',
        artist: '',
        link: '',
        playlist: this.$route.params.id,
      },
      createModalVisible: false,
      editModalVisible: false,
    };
  },
  methods: {
    createSong() {
      if (this.song.name.trim() &&
          this.song.artist.trim() &&
          this.song.link.trim()) {
        songsRef.push(this.song);
        this.song.name = '';
        this.song.artist = '';
        this.song.link = '';
        this.song.playlist = this.song.playlist;
        this.closeModal();
        // this.song.playlist = '';
      }
    },
    editSong() {
      if (this.song.name.trim() && this.song.artist.trim()) {
        const key = this.song['.key'];

        songsRef.child(key).update({
          name: this.song.name,
          artist: this.song.artist,
          link: this.song.link,
          playlist: this.song.playlist,
        }).then(
          () => {
            this.closeModal();
          },
          (err) => {
            // eslint-disable-next-line
            console.error(err);
          },
        );
      }
    },
    showEditModal(song) {
      this.song = song;
      this.editModalVisible = true;
    },
    showCreateModal() {
      this.createModalVisible = true;
    },
    removeSong(song) {
      songsRef.child(song['.key']).remove();
    },
    closeModal() {
      this.createModalVisible = false;
      this.editModalVisible = false;
      this.resetForms();
      // reset forms
    },
    resetForms() {
      this.song = {
        name: '',
        artist: '',
        link: '',
        playlist: this.song.playlist,
      };
      Array.prototype.slice.call(document.forms).forEach(form => form.reset());
    },
  },
};

</script>

<style scoped>

#playlist{
  padding: 80px;
}

</style>
