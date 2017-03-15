<template>
  <div class="faq">
		<section id="faq">
			<h2>FAQ</h2>
			<div class="question">
				<h3>This is a sample question</h3>
				<p>Lorem Khaled Ipsum is a major key to success. We don’t see them, we will never see them. Give thanks to the most high. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. The key to more success is to have a lot of pillows. In life there will be road blocks but we will over come it. They don’t want us to eat. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! Life is what you make it, so let’s make it.</p>
			</div><!-- .question -->
			<div class="question">
				<h3>This is a sample question</h3>
				<p>Lorem Khaled Ipsum is a major key to success. We don’t see them, we will never see them. Give thanks to the most high. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. The key to more success is to have a lot of pillows. In life there will be road blocks but we will over come it. They don’t want us to eat. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! Life is what you make it, so let’s make it.</p>
			</div><!-- .question -->
				<div class="question">
				<h3>This is a sample question</h3>
				<p>Lorem Khaled Ipsum is a major key to success. We don’t see them, we will never see them. Give thanks to the most high. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. The key to more success is to have a lot of pillows. In life there will be road blocks but we will over come it. They don’t want us to eat. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! Life is what you make it, so let’s make it.</p>
			</div><!-- .question -->
				<div class="question">
				<h3>This is a sample question</h3>
				<p>Lorem Khaled Ipsum is a major key to success. We don’t see them, we will never see them. Give thanks to the most high. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. The key to more success is to have a lot of pillows. In life there will be road blocks but we will over come it. They don’t want us to eat. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! Life is what you make it, so let’s make it.</p>
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
