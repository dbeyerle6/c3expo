<template>
  <div class="expertise_container" @click="nextImageAndText">
    <div class="expertise_column_one">
      <div class="expertise_title_block">
        <h1 class="expertise_title" v-html="$t('our_expertise.subtitle')"></h1>
      </div>
      <div class="expertise_image">
        <transition name="fade" mode="out-in">
          <img :key="currentImageIndex" v-if="images" :src="images[currentImageIndex]" alt="">
        </transition>
      </div>
    </div>
    <div class="expertise_column_two">
      <div class="expertise_text_block creativity" :style="{visibility: currentTextIndex >= 0 ? 'visible' : 'hidden', opacity: currentTextIndex >= 0 ? 1 : 0}">
        <img class="expertise_icon" :src="creativity_icon" alt="">
        <div>
          <h4 class="expertise_category" v-html="$t('our_expertise.text1_title')"></h4>
        <p class="expertise_text" v-html="$t('our_expertise.text1')"></p>
        </div>
      </div>
      <div class="expertise_text_block person" :style="{visibility: currentTextIndex >= 1 ? 'visible' : 'hidden', opacity: currentTextIndex >= 1 ? 1 : 0}">
        <img class="expertise_icon" :src="contact_person_icon" alt="">
        <div>
          <h4 class="expertise_category" v-html="$t('our_expertise.text2_title')"></h4>
          <p class="expertise_text" v-html="$t('our_expertise.text2')"></p>
        </div>
      </div>
      <div class="expertise_text_block production" :style="{visibility: currentTextIndex >= 2 ? 'visible' : 'hidden', opacity: currentTextIndex >= 2 ? 1 : 0}">
        <img class="expertise_icon" :src="production_icon" alt="">
        <div>
          <h4 class="expertise_category" v-html="$t('our_expertise.text3_title')"></h4>
          <p class="expertise_text" v-html="$t('our_expertise.text3')"></p>
        </div>
      </div>
      <div class="expertise_text_block installation" :style="{visibility: currentTextIndex >= 3 ? 'visible' : 'hidden', opacity: currentTextIndex >= 3 ? 1 : 0}">
        <img class="expertise_icon" :src="installation_icon" alt="">
        <div>
          <h4 class="expertise_category" v-html="$t('our_expertise.text4_title')"></h4>
          <p class="expertise_text" v-html="$t('our_expertise.text4')"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expertise_container {
  display: flex;
  width: 100% !important;
  height: 100% !important;
  align-items: flex-start !important;
  margin-top: 120px;
  cursor: pointer;
}

.expertise_column_one, .expertise_column_two {
  height: auto;
}

.expertise_column_one {
  width: 45%;
  border-right: 1px solid #36e4da;
}

.expertise_column_two {
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(123, 123, 123, 1) 54%, rgba(111, 111, 111, 1) 100%, rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%);
  padding: 30px 30px;
}

.expertise_image {
  width: 100%;
}

.expertise_title_block {
  width: 100%;
  height: 25%;
  margin-left: 10%;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(123,123,123,1) 54%, rgba(111,111,111,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%);
  margin-right: -30px;
}

.expertise_title {
  font-size: 72px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  font-family: "Century Gothic", sans-serif;
  padding: 5px 0 20px;
}


.expertise_image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.expertise_text_block {
  height: 25%; /* Пример фиксированной высоты для каждого блока */
  overflow: hidden;
  transition: opacity 1s ease-in-out;
  display: flex;
  gap: 20px;
}


.expertise_text_block > div {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 90%;
}

.expertise_icon {
  width: 40px;
  height: 40px;
}

.expertise_text {
  font-size: 17px;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
}


.expertise_category {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  margin: 0;
}

.fade-in {
  animation: fadeIn 0.5s;
}

.creativity {
  margin-left: 15%;
}

.person {
  margin-left: 10%;
}

.production {
  margin-left: 5%;
}

.installation {
  margin-left: 10%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Fade transition for image switching */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* starting and ending state for entering/leaving */ {
  opacity: 0;
}

@media (max-width: 768px) {
  .expertise_container {
    flex-direction: column;
    align-items: center;
  }

  .expertise_column_one {
    width: 100%;
    border-right: none;
  }

  .expertise_column_two {
    width: 100%;
    padding: 30px 10px;
  }

  .expertise_title {
    font-size: 50px;
  }
  .expertise_text {
    width: 80%;
  }
}


@media (max-width: 1366px) {
  .expertise_title {
    font-size: 50px;
  }
}
</style>
<script setup lang="ts">
import { ref } from 'vue';

import image1 from '@/static/images/our_expertise/4.jpg'
import image2 from '@/static/images/our_expertise/4.jpg'
import image3 from '@/static/images/our_expertise/3.jpg'
import image4 from '@/static/images/our_expertise/2.jpg'
import image5 from '@/static/images/our_expertise/1.jpg'
import creativity_icon from "@/static/images/creativity_icon.png"
import contact_person_icon from "@/static/images/contact_person_icon.svg"
import production_icon from "@/static/images/production_icon.svg"
import installation_icon from "@/static/images/installation_icon.svg"

const images = [image2, image3, image4, image5];

const currentImageIndex = ref(0);
const currentTextIndex = ref(-1);

const isFirstClick = ref(true);  // Добавляем флаг для отслеживания первого клика
const clickCount = ref(0);

const nextImageAndText = () => {
  // Увеличиваем счетчик кликов при каждом вызове функции
  clickCount.value++;

  if (isFirstClick.value) {
    // Первый клик, только инкрементируем текст
    isFirstClick.value = false;
  } else {
    // После первого клика, изменяем изображение, если кликов было меньше четырех
    if (clickCount.value <= 4 && currentImageIndex.value < images.length - 1) {
      currentImageIndex.value++;
    } else if (clickCount.value <= 4) {
      currentImageIndex.value = 0;
    }
  }

  // Изменяем текст только если текущий индекс меньше 3
  if (currentTextIndex.value < 3) {
    currentTextIndex.value++;
  }
};


</script>