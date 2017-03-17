<template>
  <div class="faq">
		<section id="faq">
			<h2>FAQ</h2>
      <div class="question">
        <h3>How do I add a playlist?</h3>
        <p>You can add a playlist on the Home page by clicking the “+” button that’s located near the header. Each playlist requires an image, a title, and a description.</p>
      </div><!-- .question -->
      <div class="question">
        <h3>How do I edit a playlist?</h3>
        <p>You can edit a playlist by hovering over the playlist in the Home page and clicking the pencil icon. On mobile, the edit button is available by default.
        </p>
      </div><!-- .question -->
      <div class="question">
        <h3>How do I delete a playlist?</h3>
        <p>You can edit a playlist by hovering over the playlist in the Home page and clicking the trash bin icon. On mobile, the delete button is available by default. </p>
      </div><!-- .question -->
      <div class="question">
        <h3>How do I add a song to a playlist?</h3>
        <p>You can add songs to a specific song to a playlist by clicking on one of your previously created playlists, and selected “ADD SONG” which is located on the upper right-hand side of the song table.</p>
      </div><!-- .question -->
      <div class="question">
        <h3>How do I edit/delete a song on a playlist?</h3>
        <p>You can edit/delete songs on a playlist by clicking on the icons on the right hand side of each song.</p>
      </div><!-- .question -->
		</section><!-- #faq -->
	</div><!--.faq-->
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
@mixin font-general {
  font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
@mixin font-question {
  font-family: 'Montserrat', "Helvetica Neue", Helvetica, Arial, sans-serif;
}
$navbar-height: 70px;
#faq {
  margin: 1em auto;
  margin-top: $navbar-height + 20px;
  width: 80%;
  @include font-general;
  h2 {
    border-bottom: 1px solid rgb(156, 156, 156);
    padding: 0.5em 0;
    font-size: 2.5em;
  }
  .question {
    border-bottom: 1px solid rgb(230, 230, 230);
    padding: 1.5em 2em;
    &:nth-last-child(-n+1) {
      border: none;
    }
    h3 {
      margin: 0;
      margin-bottom: 2em;
      color: rgb(135, 192, 245);
    }
    p {
      margin: 0;
      color: rgb(156, 156, 156);
    }
  }
}
</style>
