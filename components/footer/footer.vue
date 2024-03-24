<template>
  <footer class="footer-container">
    <div class="footer-container-wrapper">
<!--      <div class="column">-->
<!--        <div class="column-content">-->

<!--        </div>-->
<!--      </div>-->
      <div class="column">
        <div class="column-content">
          <h2 class="title">{{ $t('links.grc_name') }}</h2>
          <div class="text_gap">
          <div class="doc_button" @click="openModal('links.gtc.client')">{{ $t('links.client_name') }}</div>
          <div class="doc_button" @click="openModal('links.gtc.supplier')">{{ $t('links.supplier_name') }}</div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-content">
          <div>
            <h2 class="title">{{ $t('links.imprint_name') }}</h2>
            <div class="doc_button" @click="openModal('links.imprint')">{{ $t('links.imprint_name') }}</div>
          </div>
          <div>
            <h2 class="title">{{ $t('links.privacy_name') }}</h2>
            <div class="doc_button" @click="openModal('links.privacy')">{{ $t('links.privacy_name') }}</div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-content">
          <h2 class="title">{{ $t('links.contact_us') }}</h2>
          <div class="contact_us">
            <img class="contact_us_logo" src="/assets/phone-call-svgrepo-com.svg" alt=""/>
            <a class="contact_us_text" href="tel:+490621554280">+49(0)621-554-280</a>
          </div>
          <div class="contact_us">
            <img class="contact_us_logo" src="/assets/mail-open-check-svgrepo-com.svg" alt=""/>
            <a class="contact_us_text" href="malito:info@c3expo.de">info@c3expo.de</a>
          </div>
          <div class="contact_us">
            <img class="contact_us_logo" src="/assets/earth-svgrepo-com.svg" alt=""/>
            <a class="contact_us_text" href="https://c3-expo.de">c3-expo.de</a>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="column-content jobs">
          <div class="footer-logo"><img src="/assets/logo.png" alt=""></div>
          <h2 class="doc_button" @click="openModal('links.gtc.client')">Jobs</h2>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <p class="footer-copyright-text">C3 EXPO. All rights reserved.</p>
    </div>
    <DocModal :isVisible="isModalVisible" :docUrl="currentDocUrl" @update:isVisible="isModalVisible = $event"/>
  </footer>
</template>


<script setup lang="ts">
import {ref} from 'vue';
import DocModal from "~/components/docmodal/DocModal.vue";

const {t, locale} = useI18n();
const isModalVisible = ref(false);
const currentDocUrl = ref('');

// Функция для обновления URL документа
function updateDocUrl() {
  currentDocUrl.value = t('links.gtc.client');
}

// Отслеживаем изменение языка и обновляем URL документа
watch(locale, () => {
  updateDocUrl();
});

// Инициализация с текущим языком
updateDocUrl();

function openModal(translationKey: any) {
  currentDocUrl.value = t(translationKey);
  isModalVisible.value = true;
}
</script>

<style scoped>
.contact_us {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
}

.contact_us_logo {
  width: 24px;
  height: 24px;
}

.contact_us_text {
  color: #C0BEBE;
  text-underline: none;
  text-decoration: none;
  font-family: "Century Gothic", sans-serif;
}

.footer-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 230px;
  background-color: #303030; /* или любой другой цвет фона */
  box-shadow: 0 -5px 15px -5px rgba(0, 0, 0, 0.3);


}

.footer-container-wrapper {
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
}

.footer-copyright-text {
  color: #C0BEBE;
  font-size: 16px;
  font-family: "Century Gothic", sans-serif;
}


.footer-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.jobs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

}

.footer-logo > img {
  width: 180px;
  margin-top: 30px;
}

.footer-copyright {
  width: 30%;
  display: flex;
  border-top: 1px solid #555555;
  background-color: #303030;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
  min-height: 150px;
  gap: 10px;
  max-height: 150px;

}

.doc_button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #C0BEBE;
  font-family: "Century Gothic", sans-serif;
}

.title {
  color: #C0BEBE;
  font-size: 20px;
  font-family: "Century Gothic", sans-serif;
  line-height: 1;
}


</style>