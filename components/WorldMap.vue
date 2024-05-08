<template>
  <div class="map_container">
    <img src="/static/images/map.png" alt="">
    <img width="20" height="20" class="point1" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point2" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point3" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point4" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point5" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point6" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point7" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point8" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point9" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point10" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point11" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point12" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point13" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point14" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point15" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point17" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point18" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point19" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point20" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point21" src="/static/images/map-marker.svg" alt="">
    <img width="20" height="20" class="point22" src="/static/images/map-marker.svg" alt="">
  </div>
  
</template>
<style scoped>


  .map_container {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .map_container img {
    width: 100%;
    height: 100%;
  }


  .point1 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -28.5%;
    left: 50%;
  }
  .point2 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -25.5%;
    left: 45.5%;
  }
  .point3 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -19.5%;
    left: 46.5%;
  }

  .point4 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -19.0%;
    left: 46%;
  }
  .point4 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -19.0%;
    left: 46%;
  }
  .point5 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -19.0%;
    left: 47%;
  }
.point6 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -18.5%;
    left: 48%;
  }
  .point7 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -17%;
    left: 49%;
  }
  .point8 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -15.0%;
    left: 50.5%;
  }
  .point9 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -8%;
    left: 47%;
  }
  .point10 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: 33%;
    left: 52%;
  }
  .point11 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: 31%;
    left: 54%;
  }
  .point12 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -13.0%;
    left: 23%;
  }
  .point13 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -8%;
    left: 16%;
  }
  .point14 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: 25%;
    left: 59.5%;
  }
  .point15 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -2.0%;
    left: 62%;
  }
  .point16 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -19.0%;
    left: 58%;
  }
  .point17 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: 3%;
    left: 74.5%;
  }
  .point18 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -10%;
    left: 76%;
  }
  .point19 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: 33%;
    left: 85.5%;
  }
  .point20 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -12.5%;
    left: 44.5%;
  }
  .point21 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -14%;
    left: 45.5%;
  }
  .point22 {
    position: absolute;
    width: 1.2rem !important;
    height: 5px;
    top: -19%;
    left: 49.3%;
  }


</style>
<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  const points = document.querySelectorAll('.map_container [class^="point"]');

  // Анимация появления
  points.forEach(point => {
    gsap.fromTo(point, {
      opacity: 0,
      scale: 0,
    }, {
      opacity: 1,
      scale: 1.75, // Вначале увеличение до 175%
      delay: Math.random(), // случайная задержка для хаотичного эффекта
      duration: 1.5, // продолжительность анимации увеличения
      ease: 'power1.inOut', // Плавное изменение
      onComplete: () => {
        // После окончания первой анимации начинаем анимацию уменьшения
        gsap.to(point, {
          scale: 1, // Уменьшение до 100%
          duration: 1.5, // Продолжительность анимации уменьшения
          ease: 'power1.out' // Плавное уменьшение
        });
      }
    });
  });
});

</script>