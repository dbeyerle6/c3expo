<template>
  <div class="mission_container">
    <div class="box title">
      <h1 class="mission_text" v-html="$t('our_mission.subtitle')"></h1>
    </div>
    <div class="box image">
      <img src="/static/images/our_mission.jpg" alt="Our mission">
    </div>
    <div class="box empty">
      <p class="mission_text small" v-html="$t('our_mission.text1')"></p>
      <p class="mission_text small" v-html="$t('our_mission.text2')"></p>
    </div>
    <div class="box description">
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.mission_container {
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
  align-items: flex-start;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-bottom: -140px;
}

.small {
  font-size: 17px;
  line-height: 1.5;
}

.mission_text {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  height: 100%;
}

.image img {
  max-width: 200%;
  max-height: 200%;
  width: 100%;
  height: 40% !important;
  display: block;
  border-bottom: 1px solid #36e4da
}

.empty {
  text-align: justify;
  padding: 35px 100px;
  height: 100%;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(123,123,123,1) 100%, rgba(111,111,111,1) 100%, rgba(255,255,255,1) 100%, rgba(198,198,198,1) 100%);
  flex-direction: column;
}

.description {
 }

@media (max-width: 768px) {
  .mission_container {
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: flex-start;
    background-size: 120%;

    background-position: bottom left ;
    padding-bottom: 100px;
  }

  .mission_container .box.title {
    order: 2; /* Изначально первый, но меняем на второе место */
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 50px;
  }

  .mission_container .box.image {
    order: 1; /* Изначально второй, но меняем на первое место */
  }

  .mission_container .box.empty {
    order: 3; /* Позиция может оставаться без изменений, если это третий блок */
  }

  .mission_container .box.description {
    order: 4; /* Позиция может оставаться без изменений, если это четвертый блок */
  }
  .image {
    width: 100%;
    box-sizing: border-box;
    top: -25%;
    left: -30%;
    z-index: 20;
  }

  .image img {
    width: 100%;
  }

  .empty {
    width: 90%;

    padding: 30px;
    display: flex;
    flex-direction: column;
  }
  .title {
    margin-top: 100px;
    font-size: 16px;
    padding: 40px 20px 0 0;
  }
}
</style>
