<template>
    <div class="www">
      <div class="title_box">
        <h1>Weltweites Messeprogramm? Kein Problem! <br> Hier waren wir bereits tätig!
        </h1>

      </div>
      <div class="world_box">
        <div class="cities_list">
          <div v-for="country in countries" :key="country" class="country-item">
            <img :src="mapMarker" :alt="country" class="map_marker">
            <p>{{ country }}</p>
          </div>
        </div>
        <div class="world_map">
          <WorldMap />
        </div>
      </div>
    </div>
</template>
<style scoped>
.www {
  width: 100%;
  min-height: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("/static/images/www_background.png");
  background-size: cover;
  margin-top: 120px;
}

.world_box {
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
}

.cities_list {
  height: 400px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 30%;
  gap: 11px;
  margin-left: 2%;
  justify-content: center;
}

.world_map {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.title_box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  height: 300px;
}




.title_box h1 {
  font-size: 40px;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  margin: 0;
  padding: 20px 40px;
  line-height: 2;
  background: rgb(87,87,87);
  background: linear-gradient(90deg, rgba(87,87,87,1) 0%, rgba(0,0,0,1) 100%);
}

.map_marker {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.country-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.country-item > p {
  color: #fff;
  font-size: 20px;
  font-family: "Century Gothic", sans-serif;
  margin: 0;
}

@media (max-width: 768px) {
  .world_box {
    flex-direction: column-reverse;
    padding: 0 20px 100px 20px;
  }

  .cities_list {
    width: 100%;
    height: auto;
    margin-left: 0;
  }

  .world_map {
    width: 100%;
    height: 400px;
  }

  .title_box {
    height: auto;
  }

  .title_box h1 {
    font-size: 30px;
    padding: 20px;
  }

  .country-item > p {
    font-size: 16px;
  }
}

</style>
<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import mapMarker from '../../static/images/map-marker.svg'
const { tm } = useI18n()
const countries = tm('cities')
import gsap from 'gsap';


onMounted(() => {
  gsap.from('.cities_list', {
    opacity: 0, // Начальная прозрачность
    duration: 1.5, // Длительность анимации
    ease: 'power1.out' // Плавная функция перехода
  });
});
</script>