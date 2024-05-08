<template>
  <div class="ceo_container">
    <div class="ceo_profile">
      <div class="ceo_profile_image_placeholder">
        <span class="ceo_gradient"></span>
        <img src="/static/images/daniel2.jpg" alt="">
      </div>
      <div class="ceo_profile_content">
        <h1>Daniel Beyerle</h1>
        <div class="ceo_profile_title">
          <span class="ceo_square"></span>
          <h2> Owner & CEO</h2>
        </div>


        <p class="ceo_text" v-html="$t('ceo_statement.text1')"></p>
        <p class="ceo_text" v-html="$t('ceo_statement.text2')"></p>
        <p class="ceo_text" v-html="$t('ceo_statement.text3')"></p>
        <p class="ceo_text" v-html="$t('ceo_statement.text3')"></p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ceo_container {
  margin: 0 auto;
  padding: 40px;
  width: 90%;

  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top -20% left 80%;
  background-repeat: space;
}

.ceo_profile {
  display: flex;
  align-items: center;
  padding-top: 50px;
}

.ceo_profile_image_placeholder {
  flex: 1;
  height: auto;
  width: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 2;
}

.ceo_profile_image_placeholder img {
  height: 500px;
  object-fit: none;
  width: 400px;
  object-position: 0 5%;
  margin-top: 15%;
  border-right: 1px solid #36e4da;

}

.ceo_profile_content {
  flex: 2;
  margin-left: 40px;
  color: #fff;
  margin-top: 50px
}

.ceo_profile_title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.ceo_text {
  font-family: "Century Gothic", sans-serif;
  font-size: 20px;
}

.ceo_profile_content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  font-family: "Century Gothic", sans-serif;
}

.ceo_profile_content h2 {
  font-size: 24px;
  font-family: "Century Gothic", sans-serif;
  font-weight: 300;
  margin-bottom: 20px;
}

.ceo_gradient {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 25%;
  height: 80%;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(111, 111, 111, 1) 50%, rgba(154, 151, 151, 1) 100%, rgba(217, 249, 255, 1) 100%);
  z-index: -1;
}

.ceo_square {
  display: block;
  width: 12px;
  height: 12px;
  background-color: #36e4da;
}


.logo {
  height: 50px;
  margin-bottom: 40px;
}


@media (max-width: 768px) {
  .ceo_container {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0;
    width: 100%;
  }

  .ceo_profile_image_placeholder {

    height: 500px;
    -o-object-fit: none;
    object-fit: none;
    width: 350px;
    -o-object-position: 0 5%;
    object-position: 0 5%;
    margin: 80px auto 0 auto;

  }

  .ceo_gradient {
    position: absolute;
    top: 12%;
    bottom: 0;
    width: 50%;
    height: 70%;
    background: rgb(0, 0, 0);
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(111, 111, 111, 1) 50%, rgba(154, 151, 151, 1) 100%, rgba(217, 249, 255, 1) 100%);
    z-index: -1;
  }


  .ceo_profile {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    z-index: 55;
    width: 100%;
  }

  .ceo_profile_content {
    z-index: 5;

    margin: 5%;
  }
}
</style>
<script setup lang="ts">
</script>