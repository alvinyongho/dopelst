<template>
  <div id="playlist">
    <div id="playlist-banner">
      <h1>{{playlist[0].name}}</h1>
      <h4>{{playlist[0].description}}</h4>
      <p>Playlist · {{songs.length}} Songs</p>
    </div><!-- .playlist-banner -->

    <div id="playlist-album-img">
      <!-- <img v-bind:src="playlist[0].imgurl" alt="playlist album cover" /> -->

      <img id="playlist-img" class="playlist-img" v-bind:alt="playlist[0].name" />

    </div><!-- #playlist-album-img -->


    <!-- <a v-on:click="showCreateModal()">Add Song</a> -->

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
    <div class="songs">
      <table>
        <thead>
          <th>SONGS</th>
          <th><a id="add-song" v-on:click="showCreateModal()">ADD SONG</a></th>
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
                <a @click.prevent="showEditModal(song)" class="song-btn">Edit</a>
                <a v-on:click="removeSong(song)">Delete</a>
            </div><!-- #song-btn-wrapper -->
          </td>
        </tr> <!-- End of single entry -->
      </table>
    </div>

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
  mounted() {
    playlistsRef.orderByKey().equalTo(this.$route.params.id).on('value', (snapshot) => {
      const vals = snapshot.val();
      const valArray = Object.keys(vals).map(key => vals[key]);

      this.$nextTick(() => {
        const img = document.getElementById('playlist-img');
        const downloadingImage = new Image();
        downloadingImage.onload = function onLoad() {
          img.src = this.src;
        };
        downloadingImage.src = valArray[0].imgurl;
      });
    });
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

<style scoped lang="scss">

// #playlist{
//   padding: 80px;
// }
#playlist-banner h4, p{
  margin: 0;
  margin-bottom: 5px;
}

.songs {
  margin: 5% 10%;
}

table{
  font-family: 'Muli', sans-serif;
  width: 100%;
  padding: 80px;
  border-collapse: collapse;

}

table th, td {
  text-align: left;
  padding-left: 1em;
  padding-bottom: 10px;

}

table thead{
  border-bottom: 1.5px solid #000;
}

table th{
  border-bottom: 2px solid #000;

}


table tr td{
  padding: 15px;
  border-bottom: 1px solid #d2d2d2;

}

.songs-buttons {
  float: right;
}

#song-list-title {
    text-decoration: none;
    color: #000;
    font-weight: bold;
}

.songs th, td {
    // border-bottom: 1px solid #d2d2d2;
    padding-left: 1em;
}

.song-btn {
  margin-right: 25px;
}

#add-song{
    font-size: .75em;
}

#add-song:hover{
    color: blue;
}

#add-song {
    float: right;
    font-family: Montserrat,sans-serif;
    padding-right: 2em;
}


#playlist-wrapper {
	min-height: 100%;
}

#playlist-banner {
	height: 170px;
  padding: 80px;
	background: #0e0a0a;
	background: -webkit-linear-gradient(left, #0e0a0a, #65151e);
	background: -moz-linear-gradient(left, #0e0a0a, #65151e);
	background: -ms-linear-gradient(left, #0e0a0a, #65151e);
	background: -o-linear-gradient(left, #0e0a0a, #65151e);
	background: linear-gradient(to right, #0e0a0a, #65151e);
}



#playlist-banner h1 {
  padding-top: 80px;
	font-family: 'Muli', sans-serif;
	color: #fff;
	font-size: 1.75em;
}

#playlist-banner h4 {
	font-family: 'Muli', sans-serif;
	color: #fff;
	font-size: 1em;
}

#playlist-banner>p {
	font-family: 'Muli', sans-serif;
	color: #cdcdcd;
	font-size: 0.75em;
}

#playlist-album-img {
	height: 230px;
	width: 230px;
	position: absolute;
	margin: 0;
	top: 20%;
	right: 10%;
	box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
}

#playlist-album-img img{
	height: 100%;
	width: 100%;
}


@media screen and (max-width: 1056px) {

  #playlist-album-img {
  	height: 316px;
  	width: 316px;
  	position: absolute;
  	margin: 0;
    visibility: hidden;
    margin-top: 100px;
  	box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  }


  #playlist-album-img img{
  	height: 100%;
  	width: 100%;
    visibility: hidden;
  }

  #playlist-body{
    visibility: hidden;
    position: absolute;
  }


}


#playlist-body {
	margin: 2% 10%;
	width: 50%;
}

#playlist-body p {
	font-family: 'Muli', sans-serif;
	font-size: 0.75em;
	font-weight: 200;
}

#playlist-album-img{
  label {
    margin: 0;
    font-size: .75em;

  }
  input {

  }
}



</style>
