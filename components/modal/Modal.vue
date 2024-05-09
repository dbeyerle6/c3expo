<template>
  <transition name="modal">
    <div class="modal-overlay" v-if="isVisible" @click="handleOverlay">
      <div class="modal-content" ref="modalContentRef">

        <div class="logo">
          <img src="/static/images/topic_logo.png" alt="EXPO">
        </div>
        <button class="close_button" @click="closeModal">&times;</button>
          <CeoStatement v-if="props.index === 180"/>
        <div class="modal_info" v-if="props.index === 86">
          <References :showDiv1="showDiv1" :showDiv2="showDiv2"/>
        </div>
        <div class="modal_info" v-if="props.index === 190">
          <OurVision/>
        </div>
        <div class="modal_info" v-if="props.index === 200">
          <OurMission/>
        </div>
        <div class="modal_info" v-if="props.index === 156">
          <OurExpertise/>
        </div>
        <div class="modal_info" v-if="props.index === 132">
          <ExhibitionBooth/>
        </div>
        <div class="modal_info" v-if="props.index === 92">
          <WorldWideNetwork/>
        </div>
        <div class="modal_info" v-if="props.index === 105">
          <Herritage/>
        </div>
        <div class="modal_info" v-if="props.index === 777">
          <Jobs/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch, nextTick, defineEmits, provide} from 'vue';
import Ceo_statement from "~/components/topics/CeoStatement.vue";
import CeoStatement from "~/components/topics/CeoStatement.vue";
import ExhibitionBooth from "~/components/topics/ExhibitionBooth.vue";
import OurVision from "~/components/topics/OurVision.vue";
import OurMission from "~/components/topics/OurMission.vue";
import References from "~/components/topics/References.vue";
import Herritage from "~/components/topics/Herritage.vue";
import OurExpertise from "~/components/topics/OurExpertise.vue";
import WorldWideNetwork from "~/components/topics/WorldWideNetwork.vue";
import Jobs from "~/components/topics/Jobs.vue";


const props = defineProps({
  index: Number,
  isVisible: Boolean
});
const emit = defineEmits(['update:isVisible']);
const modalContentRef = ref(null);
let observer;

const showDiv1 = ref(true);
const showDiv2 = ref(false);
let lastScrollTop = 0;


const handleOverlay = () => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function closeModal() {
  emit('update:isVisible', false);
}

watch(() => props.isVisible, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : '';
  nextTick(() => {
    if (newValue && modalContentRef.value) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-enter-to');
          }
        });
      }, {
        root: modalContentRef.value,
        threshold: 0.35,
        rootMargin: "0px"
      });

      const elements = modalContentRef.value.querySelectorAll('.heritage_arrow, .modal_info, .modal_text, .modal_text, .modal_image, .images_container, .expertise_image, .expertise_container, .expertise_title, .expertise_text_container, .vision_image, .heritage_container, .heritage_text_container, .heritage_text, .heritage_arrow, .heritage_image, .ceo_info_images, .reference_image, .arrow_left, .arrow_right');
      elements.forEach(el => observer.observe(el));
    }
  });
});

onMounted(() => {
  document.body.style.overflow = props.isVisible ? 'hidden' : '';

});

onUnmounted(() => {
  document.body.style.overflow = '';
  if (observer) observer.disconnect();
});
</script>

<style scoped>
p, h2 {
  color: #fff;
  font-family: Century Gothic, sans-serif;
  margin: 0;
}

.heritage_text {
  font-size: 20px;
  width: 75%;
  text-align: center;
  max-width: 40%;
}

.heritage_info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.heritage_text_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 30%;
}

.heritage_arrow > img {
  height: 80px;
}



.modal_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; /* Центрирование по вертикали */
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

.modal-content {
  position: relative;
  background-color: #000;
  min-height: 60%;
  height: auto;
  width: 80%; /* Занимает 50% ширины экрана */
  max-height: 90%; /* Максимальная высота - 80% экрана */
  overflow-y: auto; /* Включаем прокрутку при необходимости */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  position: absolute;
  top: 3%;
  left: 4%;
  z-index: 100;
}

.logo img {
  width: 120px;
}

.modal-enter-active, .modal-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.modal-enter-from, .modal-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.modal-enter-to, .modal-leave-from {
  transform: translateX(0%);
  opacity: 1;
}


.close_button {
  font-size: 32px;
  width: 40px;
  height: 40px;
  color: #fff;
  font-weight: normal;
  position: absolute;
  top: 5%;
  right: 2%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 1000;
  transition: 0.3s ease-in-out;
}

.close_button:hover {
  color: #36e4da;
  transition: 0.3s ease-in-out;
}

.modal-content::-webkit-scrollbar {
  width: 10px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.fade-enter-to, .fade-enter-active {
  opacity: 1;
  transition: opacity 2s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transition: opacity 2s ease-out;
}

.modal_text, .modal_image, .images_container, .arrow_right, .arrow_left .expertise_container, .expertise_title, .expertise_text_container, .expertise_image, .vision_image, .heritage_container, .heritage_text_container, .heritage_text, .heritage_arrow, .heritage_image, .ceo_info_images, .reference_image {
  opacity: 0;
  transition: opacity 2s ease-out;
}

.fade-enter-to {
  opacity: 1 !important; /* Используйте !important для переопределения предыдущих стилей, если это необходимо */
  transition: opacity 2s ease-out;
}

.colored_text {
  font-weight: bold;
  color: #00ffff;
}

@media (max-width: 768px) {
  .modal-overlay {
    width: 100%;
    height: 100%;
  }

  .modal-content {
    width: 100%;
    height: 100%;
    padding: 0;
    max-height: 100%;
    overflow-x: hidden;
  }

  .logo {
    top: 10px;
    left: 10%;
  }

  .close_button {
    top: 40px;
    right: 20px;
  }
}
</style>
