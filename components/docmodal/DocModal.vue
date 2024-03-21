<template>
  <div v-if="isVisible" class="modal" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal">&times;</span>
      <iframe v-if="docUrl" :src="docPreviewUrl" width="100%" height="600" style="border: none;"></iframe>
    </div>
  </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue';

// Определяем props
const props = defineProps({
  isVisible: Boolean,
  docUrl: String
});

// Определяем emit
const emit = defineEmits(['update:isVisible']);

const docPreviewUrl = ref('');

watchEffect(() => {
  if (props.docUrl) {
    docPreviewUrl.value = `https://docs.google.com/gview?url=${encodeURIComponent(props.docUrl)}&embedded=true`;
  }
});

const closeModal = () => {
  emit('update:isVisible', false);
};
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 1200px;
  border-radius: 5px;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
