<template>
  <div class="team-body">
    <!--<div class="quickbar">
      <a href="#lauren">Lauren</a>
      <a href="#alvin">Alvin</a>
      <a href="david">David</a>
    </div>-->

    <div class="team-members">

      <div class="team-member" id="lauren">

        <img src="../assets/ohno.png"></img>
        <h2>Lauren Liu</h2>
        <div class="team-description">
          <p>Goals: I want to become a doctor</p>
          <p>Contact information:
          lliuu@neopets.com</p>
        </div>
      </div>

    </div>

    <div class="team-members">

      <div class="team-member" id="alvin">
        <img src="../assets/gnome.png"></img>
        <h2>Alvin Ho</h2>
        <div class="team-description">

          <p>Goals: To own a Tesla... one day</p>
          <p>Contact information:
          google@gmail.com</p>
        </div>
      </div>

    </div>


    <div class="team-members">

      <div class="team-member" id="david">

        <img src="../assets/obama.png"></img>
        <h2>David Luu</h2>
        <div class="team-description">

        <p>Goals: I want to be done with these goons</p>
        <p>Contact information: davidluu@neopets.com </p>
        </div>
      </div>

    </div>



  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#team-margin{
  margin: 20px;
}

.quickbar{
  position: fixed;
  bottom: 70px;
  left: 0px;
  width: 100px;
  /*height: 300px;*/
  background-color: black;

  a{
    display: block;
    color: white;
    margin: 5px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 200;
  }

}


.team-members{
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 50%;
  height: auto;
  background-color: #EDEDED;

  margin-top: 180px;
  margin-bottom: 100px;
  border: 1px solid #F5F5F5;

  border-radius: 10px;


}

.team-member{
  h2 {
    padding-top:5px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 200;
    text-align: center;

  }
}

.team-member img{
  display: block;
  margin: 0 auto;

  margin-top: -50px;
}

.team-description{
  padding-top: 15px;

  p {
    font-size: 1em;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 100;
    padding: 5px;
  }
}


</style>
