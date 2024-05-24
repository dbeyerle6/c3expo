<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <div class="modal_header">
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <a class="download-button" :href="docUrl" download @click.stop>
        <img src="/static/images/download.svg" alt="">
      </a>
      <button class="open-pdf-button" @click="openPdf">Open PDF in New Tab</button>
      <div class="document-content" ref="pdfViewer" style="padding: 20px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  docUrl: String
});

const emit = defineEmits(['close']);
const pdfViewer = ref(null);

function openPdf() {
  if (props.docUrl) {
    window.open(props.docUrl, '_blank');
  }
}

function closeModal() {
  emit('close');
}
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal_header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  height: 80vh;
  width: 80%;
  overflow-y: auto;
  margin: 20px;
}

.close {
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  position: fixed;
}

.close:hover {
  color: #36e4da;
}

.download-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.download-button > img {
  width: 30px;
  height: 30px;
}

.open-pdf-button {
  position: absolute;
  top: 50px;
  right: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.document-content {
  font-size: 16px;
  font-family: "Century Gothic", sans-serif;
}
</style>
