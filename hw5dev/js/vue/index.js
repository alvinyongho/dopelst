var currPlaylistKey = ''


var editPicture = Vue.component('editPicture', {
  template: '<img v-bind:src="imagePreview" alt="image Preview" height="42" width="42">',
  props: ['imagePreview'],

})



var editPlaylistModal = Vue.component('editplaylistmodal', {
  template: '#modal-template',
  props: ['formname', 'playname', 'description', 'uploadprogress', 'imgsrc'],
  data: function () {
    return {
      playlistname: playlistApp.playlist.name,
      playlistdescription: playlistApp.playlist.description,
      playlistuploadprogress: playlistApp.playlist.uploadprogress,
      playlistimgsrc: playlistApp.playlist.imgsrc
    }
  },
  methods: {
    onFileChange: function(e){
      console.log('handling file change')
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length)
        return;
      // this.createImage(files[0]);
      target_file = files[0]

      var relative_url = albumImageDir+target_file.name
      var albumUploadPathRef = storageRef.child(relative_url)
      this.playlistuploadprogress = 'uploading...'
      var uploadTask = albumUploadPathRef.put(target_file)
      manageUpload(uploadTask, relative_url)
    },

    // editPlaylist: function(playlist){
    //   console.log('editing playlist')
    // },

    modifyPlaylist: function(){
      playlistApp.playlist.name = this.playlistname;
      playlistApp.playlist.description = this.playlistdescription;
      playlistApp.modifyPlaylist();
      playlistApp.showEditModal = false;
    },

    addPlaylist: function(){
      playlistApp.playlist.name = this.playlistname;
      playlistApp.playlist.description = this.playlistdescription;
      playlistApp.modifyPlaylist();
      playlistApp.showEditModal = false;
    }
  }
})








var addPlaylistModal = Vue.component('addplaylistmodal', {
  template: '#modal-template',
  props: ['formname', 'name', 'description', 'uploadprogress', 'uploadimg'],
  data: function () {
    return {
      playlistname: this.name,
      playlistdescription: this.description,
      playlistuploadprogress: this.uploadprogress,
      playlistalbumimg: this.uploadimg
    }
  },
  methods: {
    onFileChange: function(e){
      console.log('handling file change')
      var files = e.target.files || e.dataTransfer.files;
      var vm = this;
      if (!files.length)
        return;
      // this.createImage(files[0]);
      target_file = files[0]

      var relative_url = albumImageDir+target_file.name
      var albumUploadPathRef = storageRef.child(relative_url)
      this.playlistuploadprogress = 'uploading...'
      var uploadTask = albumUploadPathRef.put(target_file)
      manageUpload(uploadTask, relative_url, vm)
    },

    addPlaylist: function(){
      playlistApp.playlist.name = this.playlistname;
      playlistApp.playlist.description = this.playlistdescription;
      playlistApp.addPlaylist();
      playlistApp.showCreateModal = false;
    }
  }
})



function manageUpload(uploadTask, relative_url){
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, function() {
    var downloadURL = uploadTask.snapshot.downloadURL;


    playlistApp.uploadsuccess = true
    playlistApp.playlist.image = relative_url
    playlistApp.playlist.imgurl = downloadURL
    alert('finished uploading')
  });
}

var playlistApp = new Vue({
  el: '#playlist-crud-app',
  firebase: {
    playlists: playlistRef
  },
  data: {
    playlist: {
      name: '',
      description: '',
      image: '',
      imgsrc: '',
      imgurl: '',
      key:''

    },
    uploadprogress: '',
    uploadsuccess: false,
    showCreateModal: false,
    showEditModal: false


  },


  mounted: function(){

  },

  methods:{
    playlistalbum: function(playlist) {
    // console.log(playlist.image)
    if(playlist.image){
      // console.log('THERES AN IMAGE')
      var playlistalbum = storageRef.child(playlist.image);
      if(playlistalbum){
        // console.log(playlistalbum.fullPath)
        playlistalbum.getDownloadURL().then(function(url){
          console.log(url)
          this.playlist.imgsrc = url
        }).catch(function(error) {
          this.playlist.imgsrc = 'blank.png';

        });
      }

      // return playlist.image

    }
    },

    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length)
        return;
      // this.createImage(files[0]);
      target_file = files[0]

      var relative_url = albumImageDir+target_file.name
      var albumUploadPathRef = storageRef.child(relative_url)
      this.uploadprogress = 'uploading...'
      var uploadTask = albumUploadPathRef.put(target_file)
      manageUpload(uploadTask, relative_url)

    },

    updateProgress: function(){
      this.uploadprogress = 'done'
    },

    addPlaylist: function(){
      console.log('adding playlist')

      console.log('add to' + this.playlist.name)
      console.log(this.playlist.description)


      if(this.playlist.name.trim() && this.playlist.description.trim()){
        playlistRef.push(this.playlist);
        this.playlist.name = '';
        this.playlist.description = '';
        this.playlist.image = '';
        this.uploadprogress = '',
        this.uploadsuccess = false

      }
    },

    modifyPlaylist: function(){
      playlistRef.child(this.playlist.key).update({name: this.playlist.name})
      playlistRef.child(this.playlist.key).update({description: this.playlist.description})
      playlistRef.child(this.playlist.key).update({image: this.playlist.image})
      playlistRef.child(this.playlist.key).update({imgurl: this.playlist.imgurl})

    },

    removePlaylist: function(playlist){
      console.log('removing playlist')
      playlistRef.child(playlist['.key']).remove()
    },

    openPlaylist: function(playlist){
      window.location='/playlist.html?id=' + encodeURI(playlist['.key'])
    },

    editPlaylist: function(playlist){
      console.log('editing playlist')
      this.showEditModal = true;
      this.playlist.name  =  playlist.name;
      this.playlist.description =  playlist.description;
      this.playlist.image   =  playlist.image;
      this.playlist.imgurl    =  playlist.imgurl;
      this.playlist.imgsrc    =  playlist.imgsrc;
      this.playlist.key     = playlist['.key'];
      // console.log('playlist detail' + playlistDetail)

      // Vue.set(playlistDetail.playlist, 'identifier', playlist['.key'])
      // window.location='/playlist.html?id=' + encodeURI(playlist['.key'])
    }

  }
})
