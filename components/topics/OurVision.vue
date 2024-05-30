<template>
  <div class="vision_container">
    <div class="row">
      <div class="title">
        <h1 class="vision_title" v-html="$t('our_vision.subtitle')"></h1>
      </div>
        <img class="image" src="/static/images/unsere_vision1.jpg" alt="Our vision">

    </div>
    <div class="row_second">
    <div class="description">
      <p class="vision_text small" v-html="$t('our_vision.text')"></p>
    </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

.row {
  display: flex;
  width: 100%;
}

.row_second {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  border-top: 1px solid #36e4da;
}

.vision_container {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  height: inherit;
  width: 100%;
  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top -20% left -1%;
  background-repeat: no-repeat;
}

.empty {
  width: 50%;
  min-width: 50%;
}

.title {
  display: flex;
  font-family: "Century Gothic", sans-serif;
  font-size: 60px;
  width: 50%;
  justify-content: center;
  align-items: flex-start;
}

.title > h1 {
  width: 300px;
}

.image {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.small {
  font-size: 17px;
  line-height: 1.5;
}

.vision_text {
  color: #fff;
  font-size: 20px;
  font-family: "Century Gothic", sans-serif;
  height: 100%;
  line-height: 2;
}

.image img {
  max-width: 200%;
  max-height: 200%;
  width: 100%;
  display: block;
}

.vision_title {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  margin: 0;
  padding: 20px 40px;
  line-height: 2;
}

.empty {
}


.empty, .description {
}

.vision_container .box.image2 {
  display: none;
}

.description {
  width: 46%;
  text-align: justify;
  padding: 50px 50px;
  height: 100%;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(123,123,123,1) 54%, rgba(111,111,111,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%);
}


@media screen and (min-device-width: 768px) and (max-device-width: 1366px) {
  .row {
    flex-direction: column;
  }

  .title {
    width: 100%;
  }
  .image {
    width: 100%;
  }

  .description {
    width: 100%;
    padding: 30px 50px;
  }
}

@media  screen and (max-width: 768px) {
  .row {
    flex-direction: column;
  }
  .title {
    width: 100%;
  }
  .image {
    width: 100%;
  }
  .description {
    width: 100%;
    padding: 30px 50px;
  }
}

@media screen and (max-device-width: 512px) {
  .title {
    font-size: 40px;
  }
}

</style>
