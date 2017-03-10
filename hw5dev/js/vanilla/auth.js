var dopelist = {};

// Initial application state
dopelist.state = {
  view: '', // signin, signup, signedin
  signinEmail: '',
  signinPassword: '',
  signupEmail: '',
  signupPassword: ''
};

// DOM elements
dopelist.noauth = document.getElementById('noauth')
dopelist.signInSelector = document.getElementById('signInSelector');
dopelist.signUpSelector = document.getElementById('signUpSelector');
dopelist.signin = document.getElementById('signin');
dopelist.signup = document.getElementById('signup');
dopelist.auth = document.getElementById('auth');
dopelist.signout = document.getElementById('signout');
dopelist.signinEmail = document.getElementById('signinEmail');
dopelist.signinPassword = document.getElementById('signinPassword');
dopelist.signinForm = document.getElementById('signinForm');
dopelist.signinGoogle = document.getElementById('signinGoogle');
dopelist.signupEmail = document.getElementById('signupEmail');
dopelist.signupPassword = document.getElementById('signupPassword');
dopelist.signupForm = document.getElementById('signupForm');

// Add event listeners
dopelist.signInSelector.onchange = function() {
  dopelist.state.view = 'signin';
  switchScreens();
};

dopelist.signUpSelector.onchange = function() {
  dopelist.state.view = 'signup';
  switchScreens();
};

dopelist.signinEmail.oninput = function() {
  dopelist.state.signinEmail = dopelist.signinEmail.value;
};

dopelist.signinPassword.oninput = function() {
  dopelist.state.signinPassword = dopelist.signinPassword.value;
};

dopelist.signinForm.onsubmit = function(e) {
  e.preventDefault();

  var onResolve = function(user) {
    console.log('Signing in with credentials successful, user:');
    console.log(user);

    dopelist.state.view = 'signedin';
    switchScreens();
  };

  var onReject = function(err) {
    console.error('Signing in with credentials error:');
    console.error(err);
  };

  console.log('Signing in with credentials');
  firebase.auth().signInWithEmailAndPassword(dopelist.state.signinEmail, dopelist.state.signinPassword).then(onResolve, onReject);
};

dopelist.signinGoogle.onclick = function() {
  var provider = new firebase.auth.GoogleAuthProvider();

  var onResolve = function(result) {
    console.log('Signing in with Google successful, result:');
    console.log(result);

    dopelist.state.view = 'signedin';
    switchScreens();
  };

  var onReject = function(err) {
    console.error('Signing in with Google error:');
    console.error(err);
  };

  console.log('Signing in with Google');
  firebase.auth().signInWithPopup(provider).then(onResolve, onReject);
};

dopelist.signupEmail.oninput = function() {
  dopelist.state.signupEmail = dopelist.signupEmail.value;
};

dopelist.signupPassword.oninput = function() {
  dopelist.state.signupPassword = dopelist.signupPassword.value;
};

dopelist.signupForm.onsubmit = function(e) {
  e.preventDefault();

  var onResolve = function(user) {
    console.log('Signing up with credentials successful, user:');
    console.log(user);

    dopelist.state.view = 'signedin';
    switchScreens();
  };

  var onReject = function(err) {
    console.error('Signing up with credentials error:');
    console.error(err);
  };

  console.log('Signing up with credentials');
  firebase.auth().createUserWithEmailAndPassword(dopelist.state.signupEmail, dopelist.state.signupPassword).then(onResolve, onReject);
};

dopelist.signout.onclick = function() {
  var onResolve = function() {
    console.log('Sign out successful');

    dopelist.state.view = 'signin';
    switchScreens();
  };

  var onReject = function(err) {
    console.log('Sign out error:');
    console.log(err);
  };

  console.log('Signing out');
  firebase.auth().signOut().then(onResolve, onReject);
};

function switchScreens() {
  switch (dopelist.state.view) {
    case 'signin':
      dopelist.signup.style.display = 'none';
      dopelist.auth.style.display = 'none';
      dopelist.noauth.style.display = '';
      dopelist.signin.style.display = '';
      break;
    case 'signup':
      dopelist.signin.style.display = 'none';
      dopelist.auth.style.display = 'none';
      dopelist.noauth.style.display = '';
      dopelist.signup.style.display = '';
      break;
    case 'signedin':
      dopelist.noauth.style.display = 'none';
      dopelist.signup.style.display = 'none';
      dopelist.signin.style.display = 'none';
      dopelist.auth.style.display = '';
      break;
    default:
      console.error('Invalid State');
  }
}

// Firebase Listeners
window.onload = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dopelist.state.view = 'signedin';
      switchScreens();
    }
    else {
      dopelist.state.view = 'signin';
      switchScreens();
    }
  });
};
