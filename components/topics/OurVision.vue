<template>
  <div class="vision_container">
    <div class="box title">
      <h1 class="vision_text" v-html="$t('our_vision.subtitle')"></h1>
    </div>
    <div class="box image">
      <img src="/static/images/unsere_vision1.jpg" alt="Our vision">
    </div>
    <div class="box empty">
    </div>
    <div class="box description">
      <p class="vision_text small" v-html="$t('our_vision.text')"></p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.vision_container {
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  height: inherit;
  width: 100%;
  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top -20% left -1%;
  background-repeat: no-repeat;
}

.box {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.title {
  font-family: "Century Gothic", sans-serif;
  font-size: 60px;
}

.image {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
}

.small {
  font-size: 17px;
  line-height: 1.5;
}

.vision_text {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  height: 100%;
}

.image img {
  max-width: 200%;
  max-height: 200%;
  width: 85%;
  height: 50%;
  display: block;
}

.empty {
}

.description {
  text-align: justify;
  padding: 100px;
  height: 100%;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(123,123,123,1) 54%, rgba(111,111,111,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%);
}

@media (max-width: 768px) {
  .vision_container {
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: flex-end;
    background-size: 120%;

    background-position: bottom left ;
    padding-bottom: 100px;
  }

  .vision_container .box.title {
    order: 2; /* Изначально первый, но меняем на второе место */
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .vision_container .box.image {
    order: 1; /* Изначально второй, но меняем на первое место */
  }

  .vision_container .box.empty {
    order: 3; /* Позиция может оставаться без изменений, если это третий блок */
  }

  .vision_container .box.description {
    order: 4; /* Позиция может оставаться без изменений, если это четвертый блок */
  }
  .image {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    top: -25%;
    left: -30%;
  }

  .image img {
    width: 80%;
    height: 30%;
    display: block;
    border-right: 1px solid #36e4da;
  }

  .description {
    width: 70%;

    padding: 30px;
    margin-top: 100px;
  }
  .title {
    margin-top: 120px;
    font-size: 16px;
    padding: 40px 20px 0 0;
  }
}
</style>
