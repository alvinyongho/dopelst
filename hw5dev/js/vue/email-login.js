var emailLogin = new Vue({
  el: '#login-form-container',
  data: {
    user: {
      email: '',
      password: ''
    },
    registerError: '',
  },

  methods: {
    doLogin: function(){

      var email = this.user.email
      var password = this.user.password
      console.log('logging in')

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        this.loginError = error.message;

        if(this.loginError){
          var errtag = document.getElementById('errmsg');
          errtag.innerHTML = this.loginError;
        }
      });



    }
  }
})

window.onload = function() {

  firebase.auth().onAuthStateChanged(function(user) {
    console.log("function called");
    if (user) {
      var user = firebase.auth().currentUser;
      if (user != null) {
        window.location = 'login.html';
      }
    } else {
      console.log('failed to log in');
    }
  });

};
