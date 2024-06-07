<template>
  <div class="intro_container">
    <video class="intro-video" ref="videoRef" autoplay muted playsinline webkit-playsinline preload="auto">
      <source src="/static/videos/intro.mp4" type="video/mp4">
      Ваш браузер не поддерживает видео.
    </video>
    <transition name="fade">
      <div v-if="showClickableText" class="clickable-text" @click="continuePlaying">
        {{ $t('ready_for_exp') }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from 'vue';
const emit = defineEmits(['actionPerformed']);
const videoRef = ref(null);
const showClickableText = ref(false);

const actionPerformed = async () => {
  await emit('actionPerformed');
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener('loadedmetadata', () => {
      videoRef.value.play()
          .then(() => {
            setTimeout(() => {
              videoRef.value.pause();
              setTimeout(() => {
                clickAllowed = true;
              }, 2000); // Разрешить клик через 2 секунды после паузы
            }, 5000); // Пауза через 5 секунд после начала воспроизведения

            setTimeout(() => {
              videoRef.value.pause();
              showClickableText.value = true; // Показываем текст после задержки
            }, 5500);
          })
          .catch(error => console.error('Ошибка воспроизведения видео:', error));
    });

    videoRef.value.load(); // Загружаем видео
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
    setTimeout(() => {
      actionPerformed();
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
  transform: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.clickable-text {
  font-family: 'Century Gothic', sans-serif;
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
  background: linear-gradient(45deg, #929292, #e6e6e6, #929292);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 2px #929292, 0 0 10px #cccccc, 0 0 20px #999999;
}

@media (max-width: 768px) {
  .clickable-text {
    font-size: 22px;
    width: 60%;
    text-align: center;
    margin-bottom: 60px;
  }

  .intro-video {
    transform: scale(1.80);
  }

  .intro_container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    overflow: hidden;
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
