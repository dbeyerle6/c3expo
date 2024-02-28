<template>
  <transition name="modal">
  <div class="modal-container" v-if="isVisible">
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      {{ props.index === 190 ? '190' : 'not 190' }}
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  index: Number,
  isVisible: Boolean
});

const emit = defineEmits(['update:isVisible']);

const title = ref('');
const description = ref('');

watchEffect(() => {
  if (props.index !== undefined) {
    // Здесь можно определить логику выбора заголовка и описания на основе индекса
    title.value = `Заголовок для индекса ${props.index}`;
    description.value = `Описание для индекса ${props.index}. Здесь может быть ваш текст.`;
  }
});

function closeModal() {
  emit('update:isVisible', false);
}
</script>

<style scoped>
p {
  color: #fff;
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
</style>
