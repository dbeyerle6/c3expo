<template>
  <transition name="modal">
  <div class="modal-container" v-if="isVisible">
    <div class="modal-content">
      <div class="modal_info" v-if="props.index === 180">
        <h2>CEO Statement</h2>
        <div class="ceo_info_images">
        <img class="modal_image" src="/static/images/daniel1.jpg" alt="">
        <img class="modal_image" src="/static/images/daniel2.jpg" alt="">
        </div>
        <p class="modal_text">
          Die C³ Expo ist ein Familienunternehmen, das bereits seit mehr als 25 Jahren im Livemarketing mit Schwerpunkt Messebau tätig ist.
          <br>
          <br>
          Das Produkt unserer Arbeit wird begleitet durch ein konsistentes Qualitätsversprechen und schafft dadurch nachhaltige Emotionen im Raum.
          Da die menschliche Begegnung ersatzlos ist, kreieren und schaffen wir einen Ort dafür, der die Plattform für die Begegnung als solches bildet, aber auch die Inszenierung von Marken und deren Geschichte, Werte und Produkte bietet.
          <br>
          <br>
          Die C³ Expo steht für Familienwerte wie Vertrauen, Verlässlichkeit, Respekt und Ehrlichkeit, die stets von unseren Mitarbeitern, Dienstleistern und Partnern, sowie unseren Kunden sehr geschätzt sind.
          Die Erfolgsgeschichte der C³ Expo soll noch viele weitere Kapitel schreiben. Aus diesem Grund ist unser Wertegerüst durch den partnerschaftlichen Gedanken geprägt und bestimmt unser Handeln.
          <br>
          <br>
          CEO
          Daniel Beyerle

        </p>
      </div>

      <div class="modal_info" v-if="props.index === 86">
        <h2>References</h2>
        <p class="modal_text">Von den Anfängen der 90er Jahre!</p>
        <p class="modal_text">
          MVV Energie AG<br>
          Mannheimer Morgen<br>
          TWL Meine Energiequelle<br>
          Astra Zeneca<br>
        </p>
      </div>

      <button class="close_button" @click="closeModal">x</button>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  index: Number,
  isVisible: Boolean
});

const emit = defineEmits(['update:isVisible']);

const title = ref('');
const description = ref('');

function closeModal() {
  emit('update:isVisible', false);
  document.body.style.overflow = ''; // Восстанавливаем прокрутку
}


onMounted(() => {
  if (typeof window !== 'undefined' && props.isVisible) {
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = '';
  }
});
watch(() => props.isVisible, (newValue) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = newValue ? 'hidden' : '';
  }
});
</script>

<style scoped>
p, h2 {
  color: #fff;
  font-family: Century Gothic, sans-serif;
  margin: 0;
}

.modal_text {
  font-size: 18px;
  line-height: 1.5;
  width: 80%;
}

.modal_image {
  width: 300px;
  height: 500px;
  border-radius: 5%;
  object-fit: cover;
}

.ceo_info_images {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}


.modal_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.modal-container {
  position: fixed;
  bottom: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  z-index: 1000000 !important;
}

.modal-content {

  background-color: #303030;
  padding: 20px;
  border-radius: 10px;
  height: 60vh;
  width: 80%;
  overflow-y: auto;
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
  position: absolute;
  top: 10px;
  right: 10%;
  background-color: #303030;
  color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}


.modal-content::-webkit-scrollbar {
  width: 10px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px; /* Увеличенный радиус для более круглых углов */
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px; /* Увеличенный радиус для более круглых углов */
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
