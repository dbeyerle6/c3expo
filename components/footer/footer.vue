<template>
  <footer class="footer-container">
    <div class="footer_logo"></div>
    <div class="footer_nav">
      <div class="footer_nav_gtc">
        <h1 class="nav_gtc_title">{{$t('links.grc_name')}}</h1>
        <div class="nav_gtc_links">
          <p @click="openModal('links.gtc.client')">{{$t('links.client_name')}}</p>
          <p @click="openModal('links.gtc.supplier')">{{$t('links.supplier_name')}}</p>
        </div>
      </div>
      <div class="footer_nav_imprint">
        <h1 @click="openModal('links.imprint')" class="nav_imprint_title">{{$t('links.imprint_name')}}</h1>
      </div>
      <div class="footer_nav_privacy">
        <h1 @click="openModal('links.privacy')" class="nav_privacy_title">{{$t('links.privacy_name')}}</h1>
      </div>
      <div class="footer_nav_contacts">
        <h1 class="nav_contacts_title">{{ $t('links.contact_us') }}</h1>
        <div class="contact_us">
          <img class="contact_us_logo" src="/static/images/footer_phone.png" alt=""/>
          <a class="contact_us_text" href="tel:+490621554280">+49(0)621-554-280</a>
        </div>
        <div class="contact_us">
          <img class="contact_us_logo" src="/static/images/footer_world.png" alt=""/>
          <a class="contact_us_text" href="https://c3-expo.de">c3-expo.de</a>
        </div>
        <div class="contact_us">
          <img class="contact_us_logo" src="/static/images/footer_mail.png" alt=""/>
          <a class="contact_us_text" href="malito:info@c3expo.de">info@c3expo.de</a>
        </div>
      </div>
      <div class="footer_nav_jobs">
        <h1>Jobs</h1>
      </div>
    </div>
    <div class="footer_copyright"></div>
    <DocModal :isVisible="isModalVisible" :docUrl="currentDocUrl" @close="handleModalClose" />
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

function handleModalClose() {
  isModalVisible.value = false;
}
</script>

<style scoped>

@media (max-width: 768px) {
  .footer_nav {
    flex-direction: column;
    gap: 20px;
  }
  
}

.footer_nav_imprint, .footer_nav_privacy, .footer_nav_jobs {
  cursor: pointer;
}

.footer-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 230px;
  background-color: #303030; /* или любой другой цвет фона */
  box-shadow: 0 -5px 15px -5px rgba(54, 228, 218, 0.3);
  border-top: 2px solid #36e4da;
  padding-bottom: 30px;
}

.footer_nav {
  display: flex;
  justify-content: space-between;
  width: 80%;
  gap: 10px;
  margin: 0 auto;

}

.footer_nav > div {
  flex: 10%;
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
}

.footer_nav > div > h1 {
  color: #36e4da;
  font-family: "Century Gothic", sans-serif;
  font-size: 26px;
  min-height: 40px;
  margin: 30px 0 0 0
}

.nav_gtc_links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
}

.nav_gtc_links > p {
  margin: 0;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  cursor: pointer;
  font-size: 18px;
}

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


.footer_nav_contacts > div > a {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
}

.footer-container-wrapper {
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
}

.text_gap {
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  text-underline: none;
  text-decoration: none;
}

.title {
  color: #36e4da;
  font-size: 20px;
  font-family: "Century Gothic", sans-serif;
  line-height: 1;
}


@media (max-width: 768px) {
  .footer-container-wrapper {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 auto;
  }
}

.contact_us_text {
  font-weight: bold;
}

</style>