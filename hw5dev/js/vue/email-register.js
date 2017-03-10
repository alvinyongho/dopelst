var emailRegister = new Vue({
  el: '#register-form-container',
  data: {
    user: {
      email: '',
      password: ''
    },
    registerError: '',
  },

  methods: {
    doRegister: function(){

      var email = this.user.email
      var password = this.user.password
      console.log('registering')

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)

        this.registerError = error.message;

        if(this.registerError){
          var errtag = document.getElementById('errmsg');
          errtag.innerHTML = this.registerError;
        }

      });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var user = firebase.auth().currentUser;
          if (user != null) {
            window.location = 'index.html';
          }
        } else {
          console.log('failed to log in')
        }
      });


    }
  }
})
