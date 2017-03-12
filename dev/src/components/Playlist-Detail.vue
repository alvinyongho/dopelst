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



    <!-- #create-song-->
    <div id="create-song">
      <form v-on:submit.prevent="addSong">
        <input v-model="song.name" type="text" name="name" placeholder="song name" />
        <input v-model="song.artist" type="text" name="artist" placeholder="song artist" />
        <input v-model="song.link" type="text" name="link" placeholder="song link" />
        <input type="submit" v-on:submit.prevent="addSong" value="submit" />
      </form>
    </div>

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
          <span class ="songs-list-details"><a href="/song-details.html" id="song-list-title">{{song.title}} </a> · {{song.artist}}</span>
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

              <a @click.prevent="editSong(song)" class="song-btn">Edit</a>

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

const db = firebase.database();
const playlistsRef = db.ref('playlists');
const songsRef = db.ref('songs');
// const playlistSingle = playlistsRef.orderByKey().equalTo(this.$route.params.id);

export default {
  name: 'detail',
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
      showCreateModal: false,
      showEditModal: false,
    };
  },
  methods: {
    addSong() {
      if (this.song.name.trim() &&
          this.song.artist.trim() &&
          this.song.link.trim() &&
          this.song.playlist.trim()) {
        songsRef.push(this.song);
        this.song.name = '';
        this.song.artist = '';
        this.song.link = '';
        // this.song.playlist = '';
      }
    },
    removeSong(song) {
      songsRef.child(song['.key']).remove();
    },
  },

};

</script>

<style scoped>

#playlist{
  padding: 80px;
}

</style>
