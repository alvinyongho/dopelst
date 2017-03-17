<template>
  <div id="playlist">
    <div id="playlist-banner">
      <div class="songs-content" id="playlist-banner-text">
        <div v-for="(pl, i) in playlist" v-if="i === 0">
          <h1>{{pl.name}}</h1>
          <h4>{{pl.description}}</h4>
        </div>
        <p>Playlist · {{songs.length}} Songs</p>
      </div><!-- .songs-content -->
      <div id="playlist-album-img">
        <img v-bind:id="'playlist-img'" alt="playlist album cover" />
      </div><!-- #playlist-album-img -->

    </div><!-- .playlist-banner -->



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
    <div id="songs-chart">
      <table>
        <thead>
          <th>SONGS</th>
          <th><a id="add-song" v-on:click="showCreateModal()">ADD SONG</a></th>
          <!-- use the modal component, pass in the prop -->
        </thead>

        <tr v-if="songs.length <= 0">
          <td id="no-song">No songs to display, add one to get started</td>
        </tr>


        <tr v-for="song in songs">
          <!--  Song title and tags -->
          <td>
            <span class ="songs-list-details"><a v-bind:href="song.link" id="song-list-title">{{song.name}} </a> · {{song.artist}}</span>
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
const playlistImagesRef = db.ref('playlistImages');

// const playlistSingle = playlistsRef.orderByKey().equalTo(this.$route.params.id);

export default {
  name: 'detail',
  components: { SongModal },
  firebase() {
    return {
      playlist: playlistsRef.orderByKey().equalTo(this.$route.params.id),
      songs: songsRef.orderByChild('playlist').equalTo(this.$route.params.id),
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
      if (vals) {
        const valArray = Object.keys(vals).map(key => vals[key]);

        this.$nextTick(() => {
          const img = document.getElementById('playlist-img');
          playlistImagesRef.child(valArray[0].imageRef).on('value', (playlistImageSnapshot) => {
            img.src = playlistImageSnapshot.val();
          });
        });
      }
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
$banner-gradient-1st-color: #0e0a0a;
$banner-gradient-2nd-color: #6C237C;

$side-margin-size: 12%;
$song-chart-height-margin: 10%;



#playlist {


  #playlist-banner {
    position: relative;
    height: 350px;
    width: 100%;
    /* Banner gradient properties*/
    background: $banner-gradient-1st-color;
    background: -webkit-linear-gradient(left, $banner-gradient-1st-color, $banner-gradient-2nd-color);
    background: -moz-linear-gradient(left, $banner-gradient-1st-color, $banner-gradient-2nd-color);
    background: -ms-linear-gradient(left, $banner-gradient-1st-color, $banner-gradient-2nd-color);
    background: -o-linear-gradient(left, $banner-gradient-1st-color, $banner-gradient-2nd-color);
    background: linear-gradient(to right, $banner-gradient-1st-color, $banner-gradient-2nd-color);



    #playlist-banner-text {
      display: inline-block;
      position: relative;
      margin-left: $side-margin-size;
      margin-right: $side-margin-size;


      h4,p {
        margin: 0;
        margin-bottom: 5px;
      }

      h1 {
        padding-top: 0px;
        font-family: 'Muli', sans-serif;
        color: #fff;
        font-size: 1.75em;
        width: 100%;
        word-wrap: break-word;
      }

      h4 {
        font-family: 'Muli', sans-serif;
        color: #cdcdcd;
        font-size: 1em;
      }

      p {
        font-family: 'Muli', sans-serif;
        color: #cdcdcd;
        font-size: 0.75em;
      }
    }
    #playlist-album-img {
      display: inline-block;
      height: 300px;
      width: 300px;
      position: absolute;
      margin: 0;
      top: 20%;
      right: 10%;
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
      background-color: #fff;
      img{
        height: 100%;
        width: 100%;
      }




    label {
      margin: 0;
      font-size: .75em;
    }

    }


  }

  #songs-chart {
    margin-top: $song-chart-height-margin;
    margin-bottom: $song-chart-height-margin;
    margin-left: $side-margin-size;
    margin-right: $side-margin-size;

    table{
      font-family: 'Muli', sans-serif;
      width: 100%;
      padding: 80px;
      border-collapse: collapse;

      thead{
        border-bottom: 1.5px solid #000;

        #add-song{
            font-size: .75em;
            float: right;
            font-family: "Montserrat", Helvetica, sans-serif;
            padding-right: 2em;

            &:hover {
              color: #636363;
            }
        }
      }
      th{
        border-bottom: 2px solid #000;

      }
      th, td {
        text-align: left;
        padding-left: 1em;
        padding-bottom: 10px;

      }

      tr td{
        padding: 15px;
        border-bottom: 1px solid #d2d2d2;
        .songs-buttons {
          float: right;
          .song-btn {
            margin-right: 25px;
          }
        }
        #song-list-title {
            text-decoration: none;
            color: #000;
            font-weight: bold;
        }

      }
    }
  }
}


@media screen and (min-width:1056px){
  #playlist-banner-text{
    margin-top: 25vh;
  }
}

/* view for ipad*/
@media screen and (max-width: 1056px) {

  #playlist #playlist-banner #playlist-album-img {
    height: 250px;
    width: 250px;
    position: relative;


    right: 0;
    margin: 0%;
  }
}

/* view for mobile*/
@media screen and (max-width: 600px) {
  $banner-gradient-1st-color: #0e0a0a;
  $banner-gradient-2nd-color: #6C237C;

  $banner-deets-color: #8e8e8e;

  $side-margin-size: 12%;
  $side-margin-song-m: 0%;
  $song-chart-height-margin: 10%;

  $banner-height: 30%;

  $album-img-dimension: 100px;

  $song-border-th-size: 1px;



#playlist {

  height: 100%;
  width: 100%;
  #playlist-banner {
    position: relative;
    height: $banner-height;
    width: 100%;
    background: none; /*take out later*/

    margin-top: 15%;

    border-bottom: 1px solid #eaeaea;



    #playlist-banner-text {
      display: inline-block;
      position: relative;
      margin-left: $side-margin-size;
      margin-right: $side-margin-size;


      top: 50%;
      transform: translateY(-50%);

      width: 40%;

      h4,p {
        margin: 0;
        margin-bottom: 5px;
      }

      h1 {
        padding-top: 0px;
        margin-top: 0px;
        font-family: 'Muli', sans-serif;
        color: #000;
        font-size: 1em;
        width: 100%;
        word-wrap: break-word;
      }

      h4 {
        font-family: 'Muli', sans-serif;
        color: $banner-deets-color;
        font-size: 1em;
        width: 100%;
        word-wrap: break-word;
      }

      p {
        font-family: 'Muli', sans-serif;
        color: $banner-deets-color;
        font-size: 0.75em;
      }
    }
    #playlist-album-img {
      display: inline-block;
      height: $album-img-dimension;
      width: $album-img-dimension;
      position: absolute;
      margin: 0;
      top: 20%;
      right: 10%;
      box-shadow: none;
      background-color: #fff;
      img{
        height: 100%;
        width: 100%;
      }




    label {
      margin: 0;
      font-size: .75em;
    }

    }


  }

  #songs-chart {
    margin-top: $song-chart-height-margin;
    margin-bottom: $song-chart-height-margin;
    margin-left:  $side-margin-song-m;
    margin-right: $side-margin-song-m;

    table{
      font-family: 'Muli', sans-serif;
      width: 100%;
      padding: 80px;
      border-collapse: collapse;

      thead{
        border-bottom: $song-border-th-size solid #000;

        #add-song{
            font-size: .75em;
            float: right;
            font-family: "Montserrat", Helvetica, sans-serif;
            padding-right: 2em;

            &:hover {
              color: #636363;
            }
        }
      }
      th{
        border-bottom: 2px solid #000;

      }
      th, td {
        text-align: left;
        padding-left: 1em;
        padding-bottom: 10px;

      }

      tr td{
        padding: 15px;
        border-bottom: 1px solid #d2d2d2;
        .songs-buttons {
          float: right;
          .song-btn {
            margin-right: 25px;
          }
        }
        #song-list-title {
            text-decoration: none;
            color: #000;
            font-weight: bold;
        }

      }
    }
  }
}
}

#playlist #songs-chart table tr td#no-song {
  border-bottom: none;
}

</style>
