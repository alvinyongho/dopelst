window.onload = function() {

  firebase.auth().onAuthStateChanged(function(user) {
    console.log("function called");
    if (user == null) {
      window.location = 'login.html';
    }
  });

};