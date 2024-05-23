<template>
<!--  <div v-if="isUnderConstruction" class="isUnder">-->
<!--    <h2>Website is under construction</h2>-->
<!--https://c3expo-europe.b-cdn.net/c3expo-200px.mp4  </div>-->
  <head>
    <meta name="viewport">
  </head>
  <div>
    <Modal :isVisible="modalVisible" :index="selectedIndex" @update:isVisible="closeModal" />
  </div>
  <div v-if="!showIntro" class="logo-container">
    <img src="/assets/logo.png" alt="Logo" class="logo"/>
  </div>
  <select v-if="!showIntro" class="lang_switcher" v-model="locale">
    <option value="en">EN <img src="assets/united-kingdom.png" alt="United kingdom"/></option>
    <option value="de">DE <img src="assets/germany.png" alt="Germany"/></option>
  </select>
  <div class="container" @wheel="handleScroll">
    <div v-if="showIntro" class="intro-container" :key="componentKey">
      <transition name="intro-fade">
        <Intro v-if="showIntro" @actionPerformed="handleActionPerformed"/>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="!showIntro" class="page-wrapper" ref="pageWrapper">
        <div class="content-container" id="contentBlock">

          <div class="video-container">
          <video class="rounded-video" ref="videoRef" :muted="isMuted" autoplay loop playsinline>
            <source src="https://c3expo-europe.b-cdn.net/c3expo-200px.mp4" type="video/mp4">
            Your browser does not support the video.
          </video>
              <img class="mute_button" @click="toggleMute"v-if="isMuted" src="/assets/mute.svg" alt="">
              <img class="mute_button" @click="toggleMute" v-else src="/assets/volume.svg" alt="">
          </div>
        </div>

        <div ref="threeContainer" class="three-container" id="threeJsBlock">

        </div>
<!--        <ul v-else class="mobile-menu">-->
<!--          <li v-for="item in menuItems" :key="item.id" @click="onCylinderClick(item.id)">-->
<!--            {{ item.title }}-->
<!--          </li>-->
<!--        </ul>-->
        <Footer v-if="!showIntro" id="footerBlock"/>
      </div>
    </transition>
  </div>

</template>

<script setup>
import {onMounted, onUnmounted, watch, nextTick} from 'vue';
import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {BokehPass} from 'three/examples/jsm/postprocessing/BokehPass.js';
import * as TWEEN from '@tweenjs/tween.js';
import Intro from "~/components/intro/Intro.vue";
import { useScroll, useSwipe } from '@vueuse/core';


const isModalOpen = ref(false);
const threeContainer = ref(null);
let camera, scene, renderer, controls, composer;
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const isUnderConstruction = ref(false)
let touchStart = ref(null);
const { t } = useI18n()
const selectedCylinderIndexes = [86, 190, 105, 180, 200, 156, 92, 132];
const texts = [t('references.title'), t('our_vision.title'), t('heritage.title'), t('ceo_statement.title'), t('our_mission.title'), t('our_expertise.title'), t('world_wide_network.title'), t('product.title')]; // Пример текстов
const showIntro = ref(true);
const initialCameraPosition = new THREE.Vector3(0, 0, 10); // Замените на ваше исходное положение камеры
const lines = [];
const textSprites = [];
let isAnimating = true;
let sphere;
let savedCameraPosition = new THREE.Vector3();
let savedCameraQuaternion = new THREE.Quaternion();
const modalVisible = ref(false);
const selectedIndex = ref(-1);
let glowSprites = [];
const isMobile = computed(() => window.innerWidth <= 768);

function initThreeJs() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enableRotate = true;
  controls.enablePan = false;
  if (window.innerWidth < 1366 ) {
    controls.minPolarAngle = Math.PI / 2; // Ограничение только на горизонтальное вращение
    controls.maxPolarAngle = Math.PI / 2;
  } else {
    controls.minPolarAngle = 0; // Полное вращение на десктопе
    controls.maxPolarAngle = Math.PI;
  }
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));


  // Добавление BokehPass для эффекта глубины поля
  const bokehPass = new BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.025,
    maxblur: 0.01,
    width: window.innerWidth,
    height: window.innerHeight
  });
  composer.addPass(bokehPass);

  camera.position.copy(initialCameraPosition);

  const sphereRadius = window.innerWidth < 768 ? 3 : 5;
  controls.minDistance = sphereRadius + 1; // Устанавливаем минимальное расстояние приближения

  addSmallCylinders(sphereRadius, 300);
  addInvisibleCubes(); // Создаем невидимые кубы вокруг цилиндров
  addCitiesToSphere(sphereRadius);

  const selectedCylinders = selectedCylinderIndexes.map(index => allCylinders[index]);
  addTextLabelsToCylinders(selectedCylinders, texts);
  addGlowToCylinders(selectedCylinders)
  animate();
}
function resizeVideo() {
  const video = document.querySelector('.rounded-video');
  if (!video) return;

  const windowHeight = window.innerHeight;
  const videoHeight = windowHeight * 0.9; // 90% от высоты окна
  video.style.height = `${videoHeight}px`;
  video.style.width = 'auto';
}



const componentKey = ref(0);
const isActiveSphereClick = ref(false)
const handleActionPerformed = () => {
  isActiveSphereClick.value = true
  setTimeout(() => {
    showIntro.value = false;
    componentKey.value++; // Изменение ключа приведет к ререндерингу и удалению Intro из DOM
  }, 4000); // Переключает на three-container через 5 секунд после события
};

const videoRef = ref(null);
const isMuted = ref(false);
function toggleMute() {
  if (videoRef.value) {
    isMuted.value = !isMuted.value;
  }
}

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  // Создаем радиальный градиент (x, y, внутренний радиус, x, y, внешний радиус)
  const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
  );

  gradient.addColorStop(0, 'rgba(0, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(0, 255, 255, 0.2)');
  gradient.addColorStop(0.4, 'rgba(0, 255, 255, 0.05)');
  gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return new THREE.CanvasTexture(canvas);
}

function addGlowToCylinders(selectedCylinders) {
  const glowTexture = createGlowTexture();
  selectedCylinders.forEach(cylinder => {
    const material = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      color: 0x00ffff, // Голубой цвет
      blending: THREE.AdditiveBlending
    });

    const sprite = new THREE.Sprite(material);
    sprite.scale.set(2, 2, 2); // Начальный размер спрайта
    sprite.position.copy(cylinder.position);

    scene.add(sprite);
    glowSprites.push(sprite); // Добавляем спрайт в массив для последующей анимации
  });

  animateGlow();
}


function onCylinderClick(index) {
  savedCameraPosition.copy(camera.position);
  savedCameraQuaternion.copy(camera.quaternion);

  isAnimating = false; // Останавливаем вращение сферы

  // Вычисляем новую позицию для "отдаления" камеры
  const distance = 5; // Насколько далеко отодвигаемся
  const direction = camera.position.clone().sub(scene.position).normalize();
  const targetPosition = camera.position.clone().add(direction.multiplyScalar(distance));

  // Создаём и запускаем анимацию
  new TWEEN.Tween(camera.position)
      .to({x: targetPosition.x, y: targetPosition.y, z: targetPosition.z}, 1000) // 1000 мс или 1 секунда для анимации
      .easing(TWEEN.Easing.Quadratic.Out) // Функция сглаживания для плавного движения
      .start();

  selectedIndex.value = index;
  modalVisible.value = true;
}

function resetCameraAndResumeAnimation() {
  new TWEEN.Tween(camera.position)
      .to({x: savedCameraPosition.x, y: savedCameraPosition.y, z: savedCameraPosition.z}, 1000) // Плавное возвращение к сохранённой позиции
      .easing(TWEEN.Easing.Quadratic.Out) // Функция сглаживания
      .onComplete(() => {
        camera.quaternion.copy(savedCameraQuaternion); // Восстанавливаем ориентацию камеры после завершения анимации
        isAnimating = true; // Возобновляем вращение
      })
      .start();
}


function animateGlow() {
  requestAnimationFrame(animateGlow);

  const time = Date.now() * 0.005;

  glowSprites.forEach(sprite => {
    const scale = 1.5 + Math.sin(time) * 0.3;
    sprite.scale.set(scale, scale, scale);
  });
}
function closeModal() {
  modalVisible.value = false; // Скрываем модальное окно
  isModalOpen.value = false
  resetCameraAndResumeAnimation(); // Возвращаем камеру к исходному положению
}


let allCylinders = [];

function addSmallCylinders(sphereRadius, count) {
  allCylinders = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;

    const material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
    const cylinder = new THREE.Mesh(geometry, material);

    const position = new THREE.Vector3();
    position.setFromSphericalCoords(sphereRadius, phi, theta);
    cylinder.position.copy(position);

    const direction = position.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    cylinder.quaternion.setFromUnitVectors(up, direction.negate());

    cylinder.userData = { isCylinder: true, index: i };
    cylinder.addEventListener('click', (event) => {
      onCylinderClick(event.target.userData.index);
    });

    scene.add(cylinder);
    allCylinders.push(cylinder); // Добавляем цилиндр в массив
  }
}

function addCitiesToSphere() {
  // Выбираем 5 случайных цилиндров из allCylinders
  const selectedCylinders = selectedCylinderIndexes.map(index => allCylinders[index]);

  // Теперь соединяем выбранные цилиндры линиями
  createCityLines(selectedCylinders);
}

function addTubeBetweenPoints(point1, point2, thickness) {
  const path = new THREE.LineCurve3(point1, point2);
  const tubeGeometry = new THREE.TubeGeometry(path, 20, thickness, 8, false);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
  const tube = new THREE.Mesh(tubeGeometry, material);
  scene.add(tube);
  lines.push(tube); // Сохраняем для анимации
}

function createCityLines(selectedCylinders) {
  lines.forEach(line => {
    scene.remove(line); // Удаляем предыдущие линии
  });
  lines.length = 0; // Очищаем массив линий

  for (let i = 0; i < selectedCylinders.length; i++) {
    for (let j = i + 1; j < selectedCylinders.length; j++) {
      addTubeBetweenPoints(selectedCylinders[i].position, selectedCylinders[j].position, 0.01);
    }
  }
}

function addTextLabelsToCylinders(selectedCylinders, texts) {

  for (let i = 0; i < selectedCylinders.length; i++) {
    const cylinder = selectedCylinders[i];
    const text = texts[i]; // Текст для текущего цилиндра

    const texture = generateTextTexture(text);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);

    // Размер спрайта, можно адаптировать под ваши нужды
    sprite.scale.set(2, 0.5, 1);
    // Позиционируем спрайт над цилиндром
    const yOffset = 0.2; // Высота над цилиндром, адаптируйте под ваши нужды
    sprite.position.set(cylinder.position.x, cylinder.position.y + yOffset, cylinder.position.z);
    textSprites.push(sprite); // Сохраняем ссылку на спрайт
    scene.add(sprite);
  }
}

function generateTextTexture(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 312; // Размер может быть адаптирован под ваши нужды
  canvas.height = 64; // Размер может быть адаптирован под ваши нужды

  context.fillStyle = '#5ed5eb'; // Цвет текста
  context.font = 'Bold 30px "Century Gothic"'; // Стиль шрифта
  context.textAlign = 'center';
  context.fillText(text, 168, 40);


  return new THREE.CanvasTexture(canvas);
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();
  if (isAnimating) {
    scene.rotation.y -= 0.0005;
  }

  const time = Date.now() * 0.001;
  lines.forEach((line, i) => {
    const newOpacity = 0.6 + Math.sin(time * 2 + i) * 0.4;
    line.material.opacity = newOpacity;
  });

  renderer.render(scene, camera);
}

function onWindowResize() {
  if (!camera || !renderer || !sphere) return;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const newSphereRadius = isMobile ? 3 : 5; // Новый радиус в зависимости от устройства

  renderer.setSize(window.innerWidth, isMobile() ? window.innerHeight * 0.2 : window.innerHeight);


  // Обновляем геометрию сферы
  sphere.geometry.dispose(); // Удаление старой геометрии
  sphere.geometry = new THREE.SphereGeometry(newSphereRadius, sphere.geometry.parameters.widthSegments, sphere.geometry.parameters.heightSegments);

  renderer.render(scene, camera);
}


let clickableCubes = [];

function addInvisibleCubes() {
  const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // Размеры куба, адаптируйте под свои нужды
  const cubeMaterial = new THREE.MeshBasicMaterial({ visible: false }); // Невидимый материал

  selectedCylinderIndexes.forEach(index => {
    const cylinder = allCylinders[index];
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.copy(cylinder.position);
    cube.userData = { isClickable: true, index }; // Пользовательские данные для идентификации при клике
    scene.add(cube);
    clickableCubes.push(cube); // Добавляем в список кликабельных объектов
  });
}



function onMouseClick(event) {
  if (!showIntro.value) {
    event.preventDefault();
    // Коррекция координаты Y с учетом прокрутки страницы
    const rect = renderer.domElement.getBoundingClientRect();
    const correctedX = event.clientX - rect.left;
    const correctedY = event.clientY - rect.top;

    mouse.x = (correctedX / rect.width) * 2 - 1;
    mouse.y = -(correctedY / rect.height) * 2 + 1;


    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableCubes, true);

    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.userData.isClickable) {
        isModalOpen.value = true;
        onCylinderClick(intersects[i].object.userData.index);
        break;
      }
    }
  }
}

function onMouseMove(event) {
  if (!camera) return;

  const rect = renderer.domElement.getBoundingClientRect();
  const correctedX = event.clientX - rect.left;
  const correctedY = event.clientY - rect.top;

  mouse.x = (correctedX / rect.width) * 2 - 1;
  mouse.y = -(correctedY / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([...clickableCubes, ...textSprites], true);

  let foundIntersect = false;
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.userData.isClickable || intersects[i].object instanceof THREE.Sprite) {
      foundIntersect = true;
      break;
    }
  }

  if (foundIntersect) {
    if (isAnimating) {
      isAnimating = false;
    }
  } else {
    if (!isAnimating) {
      isAnimating = true;
    }
  }
}

watch(showIntro, (newValue) => {
  if (!newValue) {
    nextTick(() => {
      initThreeJs()
    });
  }
});
const { locale } = useI18n();

const menuItems = ref(texts.map((text, index) => ({ id: selectedCylinderIndexes[index], title: text })));
function updateTexts() {
  const newTexts = [
    t('references.title'),
    t('our_vision.title'),
    t('heritage.title'),
    t('ceo_statement.title'),
    t('our_mission.title'),
    t('our_expertise.title'),
    t('world_wide_network.title'),
    t('product.title')
  ]; // Получаем новые тексты

  textSprites.forEach((sprite, index) => {
    const texture = generateTextTexture(newTexts[index]); // Создаем новую текстуру
    sprite.material.map = texture;
    sprite.material.needsUpdate = true; // Говорим Three.js обновить материал спрайта
  });
}

watch(locale, (newValue) => {
  if (newValue) {
    updateTexts(); // Обновляем тексты при смене языка
  }
});

const pageWrapper = ref(null);
let currentOffset = ref(0); // Текущее смещение фона
let targetOffset = ref(0); // Целевое смещение фона

// Эта функция вызывается при каждом скролле
let isTouching = ref(false)


function onTouchStart(event) {
  if (event.touches.length === 1) {
    touchStart.value = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    isTouching.value = true; // Устанавливаем флаг при начале тача
    controls.enabled = false; // Отключаем управление контроллером при начале тача
    event.preventDefault(); // Предотвращаем конфликт с браузерными событиями
  }
}

function onTouchMove(event) {
  if (event.touches.length === 1 && touchStart.value) {
    const deltaX = touchStart.value.x - event.touches[0].clientX;
    const deltaY = touchStart.value.y - event.touches[0].clientY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) { // Горизонтальное движение
      event.preventDefault();
      controls.enabled = true; // Включаем управление контроллером для горизонтального движения
    } else { // Вертикальное движение
      window.scrollBy(0, deltaY);
      touchStart.value = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      controls.enabled = false; // Отключаем управление контроллером для вертикального движения
    }
  }
}

function onTouchEnd(event) {
  touchStart.value = null; // Сбросить начальную точку касания
  isTouching.value = false; // Сбрасываем флаг при завершении тача
  controls.enabled = true; // Включаем управление контроллером по завершении тача
}



function reinitializeThreeJs() {
  // Очищаем предыдущую сцену
  if (scene) {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
  }
  if (renderer) {
    renderer.dispose();
  }

  // Переинициализируем Three.js
  initThreeJs();
}
function handleScroll(newY) {
  const dynamicOffset = -800 + (newY * -0.1); // Уменьшаем динамическое смещение
  document.body.style.backgroundPosition = `center ${dynamicOffset}px`;
}


const { y } = useScroll(window);

const { isSwiping, direction, lengthY } = usePointerSwipe(threeContainer, {
  threshold: 30, // Минимальная длина для распознавания свайпа
});

watch(y, (newY) => {
  handleScroll(newY);
});

watch(y, (newY) => {
  handleScroll(newY);
});
onMounted(() => {
  window.addEventListener('resize', resizeVideo);
  window.addEventListener('load', resizeVideo);
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onMouseClick);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('orientationchange', reinitializeThreeJs);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('click', onMouseClick);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('orientationchange', reinitializeThreeJs);
  if (controls) controls.dispose();
  if (renderer) renderer.dispose();
});



defineExpose({
  handleScroll
});
</script>

<style>

canvas {
  touch-action: pan-y;
}

body, html {
  touch-action: none; /* Отключает дефолтное поведение тач-скролла */
  overscroll-behavior: contain; /* Предотвращает "bounce" эффект на iOS */
}

body {
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.intro-fade-enter-active, .intro-fade-leave-active {
  transition: opacity 0.5s;
}
.intro-fade-enter, .intro-fade-leave-to /* .intro-fade-leave-active в версиях <2.1.8 */ {
  opacity: 0;
}


.logo-container, .rounded-video, .three-container {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.logo {
  width: 200px;
  margin-top: 20px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh; /* Минимальная высота для обеспечения скролла */
  overflow-x: hidden; /* Добавьте это, чтобы обеспечить прокрутку в контейнере */
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100vw;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* Регулируйте по необходимости */
  opacity: 0; /* Изначально скрыт */
  transform: translateY(-100%); /* Начать за пределами экрана */
  animation: slideDown 0.1s forwards; /* Анимация появления */
  animation-delay: 1.2s; /* Задержка появления логотипа после видео */
}

@media (max-width: 768px) {
  body {
    background-size: 800% !important;
  }

  .logo-container > img {
    width: 150px;
  }
  .lang_switcher {
    position: absolute;
    top: 35px;
    right: 20px;
    z-index: 100;
  }

  .container {
    overflow-x: hidden;
  }
}

@keyframes slideDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.video-container {
  width: 100%; /* Контейнер занимает всю ширину */
  height: 90vh; /* Высота контейнера - 90% от высоты экрана */
  overflow: hidden; /* Скрыть части видео, выходящие за границы контейнера */
  position: relative; /* Для позиционирования видео внутри */
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container button {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 10;
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 16px;
}

#toggleMute {
  left: auto;
  right: 10px;
}

.rounded-video {
  width: auto; /* Автоматическая ширина для сохранения пропорций */
  height: 100%; /* Высота видео равна высоте контейнера */
  opacity: 0; /* Изначально скрыт */
  transform: scale(0); /* Начать уменьшенным */
  animation: zoomIn 0.5s forwards; /* Анимация увеличения */
}

@keyframes zoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

body, html {
  height: 100%;
  margin: 0;
}

body {
  background-image: url('/assets/2.jpeg');
  background-size: 200%;
  background-position: center -800px;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

@media  (min-width: 1024px) and (max-width: 1366px) {
  body {
    background-size: 500%;
    background-position: center -800px;
    background-attachment: fixed;
    background-repeat: no-repeat;
  }
}

@media  (max-width: 768px) {
  body {
    background-size: 500%;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    overflow-x: hidden;
  }
  .container {
    width: 100vw !important;
    height: auto;
  }
  .rounded-video {
    width: 100%;
  }
}

@media  (min-width: 1367px) and (max-width: 1919px) {
  body {
    background-size: 275%;
    background-position: center -800px;
    background-attachment: fixed;
    background-repeat: no-repeat;
  }
}


.container {
  min-height: 50vh; /* Минимальная высота, чтобы обеспечить прокрутку */
  /* Другие стили */
}

.interactive-menu {
  position: fixed;
  right: 20px; /* Расположение справа */
  bottom: 50%; /* Стартует от центра экрана */
  transform: translateY(50%); /* Смещаем контейнер, чтобы центр был по центру экрана */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item {
  margin: 10px 0; /* Расстояние между кружочками */
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: grey; /* Цвет по умолчанию */
  transition: background-color 0.3s, transform 0.3s; /* Плавный переход для цвета и трансформации */
}

.menu-item.active .circle {
  background-color: #fff; /* Цвет для активного состояния */
  transform: scale(1.2); /* Увеличиваем активный кружочек */
}

/* Убедитесь, что span скрыт, чтобы текст не смещал кружочки */
.menu-item span {
  display: none;
}
.intro-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #000;
}


.isUnder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Century Gothic', sans-serif;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  animation: fadeIn 1s forwards;
}
.isUnder > h2 {
  font-size: 30px;
}

.mute_button {
  position: absolute;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  z-index: 10;
  width: 30px;
}

.mobile-menu {
  text-decoration: none;
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  margin: 100px 0;
  padding: 0;
}

.mobile-menu > li  {
  color: #36e4da;
  font-size: 24px;
  font-family: "Century Gothic", sans-serif;
  cursor: pointer;
}

</style>
