<template>
  <div id="loginpage">
    <center><router-link to="/" style="color: white;">Go Back</router-link></center>


    <form class="auth-form" v-on:submit.prevent="wantsToSignUp ? signUpWithPassword() : signInWithPassword()">
      <h1>{{wantsToSignUp ? 'Sign up' : 'Login'}}</h1>
      <div>
        <input type="email" name="email" id="email" placeholder="Email" required v-model="email">
      </div>
      <div>
        <input type="password" name="password" id="password" placeholder="Password" required v-model="password">
      </div>
      <div v-show="wantsToSignUp">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword">
      </div>

      <div>
        <p>{{errormsg}}</p>
      </div>

      <div v-show="!wantsToSignUp" class="clearfix btn-group">
        <button type="submit" class="signup-submit">Sign in</button><br>
        <button type="button" class="signup-button" v-on:click="wantsToSignUp = true">Don't have an account? <b> Sign up </b></button>
      </div>
      <div v-show="wantsToSignUp">
        <button type="submit" class="signup-submit">Sign up</button><br>
        <button type="button" class="signin-button" v-on:click="wantsToSignUp = false">Already have account</button>

      </div>
    </form>

  </div>
</template>
<script>
  import firebase from 'firebase';

  export default {
    name: 'auth',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        wantsToSignUp: false,
        errormsg: '',
      };
    },
    methods: {
      signUpWithPassword() {
        const email = this.email;
        const password = this.password;
        if (this.password === this.confirmPassword) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => this.signInWithPassword())
            .catch((error) => {
              // const errorCode = error.code;
              const errorMessage = error.message;
              // console.log(errorCode + errorMessage);
              this.errormsg = errorMessage;
            });
        } else {
          this.errormsg = 'Please make sure that your passwords are matching';
        }
      },
      signInWithPassword() {
        const email = this.email;
        const password = this.password;
        // console.log('trying to sign in with password');
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userData) => {
            this.onSignedIn();
            return userData;
          })
          .catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode + errorMessage);
            this.errormsg = errorMessage;
          });
      },
      onSignedIn() {
        this.$router.push({ name: 'Playlist' });
      },
    },
  };
</script>
<style scoped>
  h1{

    margin-bottom: 5vh;
    font-weight: lighter;

  }

  #loginpage{
    background: #092756;
    background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top, rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg, #670d10 0%, #092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top, rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg, #670d10 0%,#092756 100%);
    background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top, rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg, #670d10 0%,#092756 100%);
    background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top, rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg, #670d10 0%,#092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom, rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg, #670d10 0%,#092756 100%);
    height: 100vh;
    padding-top: 25px;
    /*margin-bottom: 50px;*/

  }

  #login-form-container{
    position: fixed;
    width: 420px;
    max-width: 100%;
    top: 20vh;
    /*left: 50vw;*/
    /*margin: 25vh auto 15px;*/
    background-color: #fff;
    height: 50px;
  }

  label{

  }

  input{
    /*border:1px solid rgba(94,126,184,0.50);*/
    border: none;
    /* Rectangle 2: */
    /*margin-top: px;*/
    margin-bottom: 10px;
    background: #FFFFFF;
    box-shadow: 0 2px 0 0 #339DFF;
    height: 35px;
    width: 290px;
    font-size: 1.55em;
    padding-left: 10px;
  }


  .auth-form{

    width: 300px;
    top: 25vh;
    /*left: 50vw;*/
    margin: 0 auto;
    background-color: #F5F5F5;
    padding: 15px;
    margin-top: 50px;

  }

  button{
    margin-top: 0px;
    height: 35px;
    font-size: 1.15em;
    /*width: 120px;*/

    /*background: #DF1F17;*/
    border: none;
    margin-bottom: 25px;
    /*color: white;*/
    /*box-shadow: 0 1px 0 0 rgba(94,126,184,0.50);*/

  }
  .signup-submit{
    color: #336EFF;
    margin-top: 25px;
    /*color: white;*/
    background: none;

  }
  .signin-submit{
    /* Rectangle 5: */
    color: #336EFF;
    margin-top: 25px;
    /*color: white;*/
    background: none;

  }

  .signup-button{
    color: #37BBA2;
    /*color: white;*/
    font-size: .8em;
    background: none;


  }
  .signin-button{
    /* Rectangle 5: */
    color: #37BBA2;
    font-size: .8em;
    /*color: white;*/
    background: none;

  }

</style>
