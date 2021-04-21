"use strict";


var firebaseConfig = {   //Firebase configuration
  apiKey: "AIzaSyDkgXHCyPAKvQcfJaPE2voE7RumKmZbTI8",
  authDomain: "db-1-b8cf9.firebaseapp.com",
  projectId: "db-1-b8cf9",
  storageBucket: "db-1-b8cf9.appspot.com",
  messagingSenderId: "304110156660",
  appId: "1:304110156660:web:94baa08a59714a1ecfca21",
  measurementId: "G-SZG52JPESN"
};

firebase.initializeApp(firebaseConfig); // Initialize Firebase
firebase.analytics();

function toggleSignOut() {  // Sign out handler
      firebase.auth().signOut();  
    }

  function toggleSignIn() {  // Sign In Handler when clicked will check if user is signed in or not, then reverse the sign in status ( will see if it will have to be changed to sign in only)
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {      // Sign in with email and pass.
        // Handle Errors
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('sign-in').disabled = false;
      });
    }
  }


  function handleSignUp() {  // Sign Up Handler
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {    // Create user with email and pass.
      // Handle Errors
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    setTimeout(sendEmailVerification, 1000);
   
  }


  function sendPasswordReset() { //Reset password
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      alert('Password Reset Email Sent!');
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

    function sendEmailVerification() {    //Email Verification
    firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    alert('Email Verification Sent!')
    document.getElementById("backgroundFilter").style.display = "none";
    }) };

  function initApp() {
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        document.getElementById('sign-in-status').textContent = 'Signed in as '+email;
        document.getElementById('sign-in').textContent = 'Sign out';
        document.getElementById("signUpOrIn").style.display = "none";
        document.getElementById("user-details-container").style.display = "block";
      } 
      else {
        document.getElementById("backgroundFilter").style.display = "block";
      }
    });




    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('sign-out').addEventListener('click', toggleSignIn, false);
    document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
    document.getElementById("sign-up").addEventListener("click", ()=> {
      handleSignUp();
    })
    document.getElementById("sign-out").addEventListener("click", () => {toggleSignOut(), reloadPage()}); //signs user out and reloads the page
  }
  window.onload = function() {
    initApp();
  };
  function reloadPage (){
    window.location.reload(); 
  }

  function changeSignUpToIn(){ // Changes sign up to Sign In
    document.getElementById("sign-in").style.display = "block";    // IF YOU KNOW HOW TO MAKE FUNCTION UNDERSTAND BY WHICH BUTTON IT IS CALLED PLEASE LET ME KNOW AT asaturovartiom@gmail.com
    document.getElementById("password-reset").style.display = "block";
    document.getElementById("needReg").style.display = "block";
    document.getElementById("signInDiv").style.display = "block";
    document.getElementById("alreadyUser").style.display = "none";
    document.getElementById("signUpDiv").style.display = "none";
    document.getElementById("sign-up").style.display = "none"
}

    function changeSignInToUp(){ // Changes sign up to Sign In
    document.getElementById("sign-in").style.display = "none";    // IF YOU KNOW HOW TO MAKE FUNCTION UNDERSTAND BY WHICH BUTTON IT IS CALLED PLEASE LET ME KNOW AT asaturovartiom@gmail.com
    document.getElementById("password-reset").style.display = "none";
    document.getElementById("needReg").style.display = "none";
    document.getElementById("signInDiv").style.display = "none";
    document.getElementById("alreadyUser").style.display = "block";
    document.getElementById("signUpDiv").style.display = "block";
    document.getElementById("sign-up").style.display = "block"
}

  
