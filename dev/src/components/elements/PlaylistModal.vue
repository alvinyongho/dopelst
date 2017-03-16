<template>
  <transition name="modal" v-on:after-enter="focusForm">
    <div class="modal modal-mask" v-bind:id="rootId + '-modal'" v-on:click="closeModal" v-show="modalVisible" transition="modal">
      <div class="modal-wrapper">
        <div class="modal-container" v-on:click.stop>
          <div class="modal-body">
            <div class="modal-label" v-bind:id="rootId + '-modal-label'">{{name}}</div>
            <form class="modal-form" v-bind:id="rootId + '-modal-form'" v-on:submit.prevent="playlistAction">
              <input class="modal-autofocus" v-bind:id="rootId + '-modal-autofocus'" v-model="playlist.name" type="text" name="name" placeholder="Playlist Name" />
              <input type="text" v-model="playlist.description" name="description" placeholder="Playlist Description" />
              <div>
                <input class="modal-fileinput" v-bind:id="rootId + '-modal-fileinput'" type="file" name="file" v-on:change="onFileChange"/>
                <label for="file" v-on:click="clickFile">{{fileLabelText}}</label>
              </div>
              <div>
                <input type="submit" v-on:submit.prevent="playlistAction" v-bind:value="name" />
              </div>
              <div class="modal-error" v-show="modalError">Error: {{modalError}}</div><!-- .modal-error -->
            </form>
            <button class="modal-cancel" v-bind:id="rootId + '-modal-cancel'" v-on:click="closeModal">Cancel</button>
          </div><!-- .modal-body -->
        </div><!-- .modal-container -->
      </div><!-- .modal-wrapper -->
    </div><!-- #${rootId}-modal.modal-mask -->
  </transition>
</template>

<script>
export default {
  name: 'playlist-modal',
  props: [
    'name',

    'playlist',
    'currentImage',
    'imageUnchanged',
    'modalVisible',
    'modalError',

    'closeModal',
    'playlistAction',
    'onFileChange',
  ],
  data() {
    return {
    };
  },
  computed: {
    rootId() {
      return this.name.replace(/ /g, '-').toLowerCase();
    },
    fileLabelText() {
      return this.currentImage.name || (this.imageUnchanged && 'Image Unchanged') || 'Choose a File';
    },
  },
  methods: {
    focusForm() {
      document.getElementById(`${this.rootId}-modal-autofocus`).focus();
    },
    clickFile() {
      document.getElementById(`${this.rootId}-modal-fileinput`).click();
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      const KEY_ESC = 27;
      if (this.modalVisible && e.keyCode === KEY_ESC) {
        this.closeModal();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.modal-error {
  color: red;
}

.modal-label {
  margin-bottom: 0.8em;
  border-bottom: 1px solid #000;
  padding-bottom: 0.2em;

  display: inline-block;

  text-align: center;
  font-size: 1.5em;
}

.modal-form {
  text-align: center;

  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
}

.modal-form input,
.modal-form input[type="file"] + label,
.modal-cancel {
  margin-bottom: 2em;
  border: 1px solid #000;
  border-radius: 0;
  padding: 0.75em;
  width: 90%;

  -webkit-appearance: none;
  --moz-appearance: none;

  background-color: #fff;
  color: #000;
  font-weight: 400;
}

.modal-form input[type="file"] + label {
  margin: 0 auto;
  margin-bottom: 2em;
  padding: 0.25em;
  width: auto;

  display: inline-block;
  cursor: pointer;

  font-size: 0.8em;
}

.modal-form input[type="file"]:focus + label,
.modal-form input[type="file"] + label:hover {
  border-color: #46a805;
  background-color: #46a805;
  color: #fff;
}

.modal-form input[type="file"]:focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}

.modal-form input[type="submit"],
.modal-cancel {
  padding: 0.25em;
  width: auto;

  font-size: 0.8em;
  cursor: pointer;
}

.modal-form input[type="submit"] {
  &:hover {
    border-color: #3063bf;
    background-color: #3063bf;
    color: #fff;
  }
}

.modal-cancel {
  margin-top: 2em;

  &:hover {
    border-color: #a80e05;
    background-color: #a80e05;
    color: #fff;
  }
}

@media (min-width: 701px) {
  .modal-container {
    width: 400px;
  }
}

@media (max-width: 700px) {
  .modal-container {
    width: 80%;
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

  text-align: center;
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
