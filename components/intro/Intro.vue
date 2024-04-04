<template>

  <video class="intro-video" ref="videoRef" autoplay muted>
<!--   <source src="https://c3expo.b-cdn.net/intro.mp4" type="video/mp4">-->
  <source src="/static/videos/intro.mp4" type="video/mp4">
  </video>
  <transition name="fade">
    <div v-if="showClickableText" class="clickable-text" @click="continuePlaying">


      {{ $t('ready_for_exp')}}
    </div>
  </transition>
</template>
<script setup>

import { ref, watch, onMounted, defineEmits } from 'vue';
const emit = defineEmits(['actionPerformed']);
const videoRef = ref(null);
const showClickableText = ref(false);
const clickableTextOpacity = ref(0);
const clickableTextVisibility = ref('hidden');

let clickAllowed = false;

const actionPerformed = async () => {
  await emit('actionPerformed');
}
onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play()
        .then(() => {
          setTimeout(() => {
            videoRef.value.pause();
            setTimeout(() => {
              clickAllowed = true;
            }, 2000); // Разрешить клик через 2 секунды после паузы
          }, 5000); // Пауза через 1 секунду после начала воспроизведения

          setTimeout(() => {
            videoRef.value.pause();
            showClickableText.value = true; // Показываем текст после задержки
          }, 5500);
        })
        .catch(error => console.error('Ошибка воспроизведения видео:', error));
  }
});
const continuePlaying = () => {
  if (videoRef.value) {
    videoRef.value.muted = false;
    videoRef.value.volume = 0.6;
    videoRef.value.play();
    showClickableText.value = false; // Скрываем текст после клика
  }
};
watch(showClickableText, (newValue) => {
  if (!newValue) {
    clickableTextOpacity.value = 0;
    setTimeout(() => {
      actionPerformed()
      clickableTextVisibility.value = 'hidden';
    }, 500);
  }
});
</script>

<style>

@font-face {
  font-family: 'Century Gothic';
  src: url('/assets/fonts/centurygothic.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.intro-video {
  width: 100%;
  height: 99vh;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.clickable-text {
  font-family: 'Century Gothic', sans-serif; /* Используйте шрифт Century Gothic */
  font-size: 24px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 120px;
  left: 50%;
  width: 600px;
  transform: translateX(-50%);
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background: linear-gradient(45deg, #929292, #e6e6e6, #929292); /* Градиент для металлического блеска */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; /* Делаем текстовый цвет прозрачным, чтобы показать градиент */
  text-shadow:
      0 0 2px #929292, /* Блеск */
      0 0 10px #cccccc, /* Дополнительный блеск */
      0 0 20px #999999; /* Распространение света */
}


.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}


</style>