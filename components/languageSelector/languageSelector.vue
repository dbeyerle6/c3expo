<template>
  <div class="language-selector" @click="toggleDropdown">
    <img :src="selectedFlag" :alt="selectedLocale" />
    <div v-if="isDropdownOpen" class="dropdown">
      <div class="dropdown-item" @click="changeLocale('en', '/assets/united-kingdom.png')">
        <img src="/assets/united-kingdom.png" alt="English" /> ENG
      </div>
      <div class="dropdown-item" @click="changeLocale('de', '/assets/germany.png')">
        <img src="assets/germany.png" alt="Deutsch" /> DE
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedLocale = ref('en');
const selectedFlag = ref('/assets/united-kingdom.png');
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const changeLocale = (locale, flag) => {
  selectedLocale.value = locale;
  selectedFlag.value = flag;
  isDropdownOpen.value = false;
  // Изменение локали в vue-i18n
  // Убедитесь, что в вашем setup или где-либо в приложении доступен i18n
  // Например, используя provide/inject или импортируя экземпляр i18n напрямую
  const i18n = useI18n(); // Если i18n доступен через useI18n()
  i18n.locale = locale;
};
</script>

<style scoped>
.language-selector {
  position: absolute;
  cursor: pointer;
  display: inline-block;
  z-index: 1;
  top: 20px;
  right: 20px;
}

.dropdown {
  position: absolute;
  top: 100%;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-item {
  padding: 12px 16px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

img {
  width: 20px;
  height: auto;
}
</style>
