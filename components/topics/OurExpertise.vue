<template>
  <div class="expertise_container" @click="nextImageAndText">
    <div class="expertise_column_one">
      <div class="expertise_title_block">
        <h1 class="expertise_title" v-html="$t('our_expertise.subtitle')"></h1>
      </div>
      <div class="expertise_image">
        <transition name="fade" mode="out-in">
          <img :key="currentImageIndex" v-if="currentImage" :src="currentImage" alt="">
        </transition>
      </div>
    </div>
    <div class="expertise_column_two">
      <div v-for="(text, index) in texts" :key="index" class="expertise_text_block" :class="text.class" :style="textStyle(index)">
        <img class="expertise_icon" :src="text.icon" alt="">
        <div>
          <h4 class="expertise_category" v-html="text.title"></h4>
          <p class="expertise_text" v-html="text.text"></p>
        </div>
      </div>
    </div>
    <div class="click-circle">Click!</div>
  </div>
</template>

<style scoped>
/* Your existing styles */

.click-circle {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background-color: #888888;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  color: #36e4da;
  font-family: "Century Gothic", sans-serif;
}

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
  height: 25%;
  overflow: hidden;
  transition: opacity 1s ease-in-out;
  display: flex;
  gap: 20px;
  width: 71%;
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
  text-align: justify;
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
.fade-enter, .fade-leave-to {
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

  .expertise_text_block {
    display: none;
  }

  .visible-text {
    display: flex !important;
  }
}

@media (max-width: 1366px) {
  .expertise_title {
    font-size: 50px;
  }
  .expertise_container {
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
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
</style>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import gsap from "gsap";
import { useWindowSize } from '@vueuse/core';

import image1 from '@/static/images/our_expertise/1.jpg';
import image2 from '@/static/images/our_expertise/2.jpg';
import image3 from '@/static/images/our_expertise/3.jpg';
import image4 from '@/static/images/our_expertise/4.jpg';
import image5 from '@/static/images/our_expertise/5.jpg';
import creativity_icon from "@/static/images/creativity_icon.png";
import contact_person_icon from "@/static/images/contact_person_icon.svg";
import production_icon from "@/static/images/production_icon.svg";
import installation_icon from "@/static/images/installation_icon.svg";
const { t } = useI18n()
const images = [image1, image2, image3, image4, image5];

const currentImageIndex = ref(0);
const currentTextIndex = ref(-1);

const texts = [
  {
    title: t('our_expertise.text1_title'),
    text: t('our_expertise.text1'),
    icon: creativity_icon,
    class: 'creativity',
  },
  {
    title: t('our_expertise.text2_title'),
    text: t('our_expertise.text2'),
    icon: contact_person_icon,
    class: 'person',
  },
  {
    title: t('our_expertise.text3_title'),
    text: t('our_expertise.text3'),
    icon: production_icon,
    class: 'production',
  },
  {
    title: t('our_expertise.text4_title'),
    text: t('our_expertise.text4'),
    icon: installation_icon,
    class: 'installation',
  }
];

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const currentImage = computed(() => (currentImageIndex.value >= 0 ? images[currentImageIndex.value] : null));
const currentText = computed(() => (currentTextIndex.value >= 0 ? texts[currentTextIndex.value] : null));

onMounted(() => {
  gsap.to('.click-circle', {
    y: '-20%',
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    duration: 1,
  });

  watch(isMobile, (newValue) => {
    if (newValue && currentImageIndex.value === -1) {
      currentTextIndex.value = -1;
    }
  });
});

const textStyle = (index: number) => {
  if (isMobile.value) {
    return { display: currentTextIndex.value === index ? 'flex' : 'none' };
  } else {
    return { visibility: currentTextIndex.value >= index ? 'visible' : 'hidden', opacity: currentTextIndex.value >= index ? 1 : 0 };
  }
};

const nextImageAndText = () => {
  if (currentImageIndex.value < images.length - 1) {
    currentImageIndex.value++;
  } else {
    return; // Останавливаем, если достигли последнего изображения
  }

  if (isMobile.value) {
    currentTextIndex.value = currentImageIndex.value;
  } else {
    if (currentTextIndex.value < texts.length - 1) {
      currentTextIndex.value++;
    }
  }
};
</script>
