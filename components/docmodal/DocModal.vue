<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <div class="modal_header">
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <a class="download-button" :href="docUrl" download @click.stop>
        <img src="/static/images/download.svg" alt="">
      </a>
      <div class="document-content" v-html="docContent" style="padding: 20px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import mammoth from 'mammoth';


const props = defineProps({
  isVisible: Boolean,
  docUrl: String
});

const emit = defineEmits(['close']);
const docContent = ref('');

// Функция для загрузки и обработки документа
async function loadDocument(url) {
  if (url) {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      docContent.value = result.value;
    } catch (error) {
      console.error(error);
      docContent.value = '';  // Обработка ошибок и очистка содержимого
    }
  } else {
    docContent.value = '';
  }
}

// Инициализация загрузки при монтировании
onMounted(() => {
  loadDocument(props.docUrl);
});

// Слежение за изменениями docUrl
watch(() => props.docUrl, (newUrl) => {
  loadDocument(newUrl);
});

function closeModal() {
  emit('close');
}
</script>


<style scoped>
.modal {
  position: fixed; /* Фиксированное позиционирование относительно окна браузера */
  left: 0;
  top: 0;
  width: 100%; /* Ширина на весь экран */
  height: 100%; /* Высота на весь экран */
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный черный фон */
  display: flex;
  justify-content: center;
  align-items: center; /* Центрирование содержимого модального окна */
  z-index: 1000; /* Убедитесь, что модальное окно находится поверх других элементов */
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
  overflow-y: auto; /* Добавляет вертикальную прокрутку, если содержимое выходит за пределы высоты */
  margin: 20px; /* Дополнительные отступы от краев экрана */
}

.close {
  float: left; /* Позиционирование крестика справа */
  font-size: 28px; /* Размер шрифта крестика */
  font-weight: bold; /* Жирность шрифта */
  cursor: pointer; /* Курсор в виде указателя */
  transition: 0.3s ease-in-out;
  position: fixed;
}

.close:hover {
  color: #36e4da; /* Цвет при наведении */
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

.download-button {
  position: absolute; /* Позиционирование относительно модального окна */
  top: 10px;
  right: 10px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 1s;
}
.download-button > img {

  width: 30px;
  height: 30px;
}

.download-button:hover {
  transition: 1s;
}

.document-content {
  font-size: 16px;
  font-family: "Century Gothic", sans-serif;
}
</style>
