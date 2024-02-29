<template>
  <div class="container">
    <Modal :isVisible="modalVisible" :index="selectedIndex" @update:isVisible="closeModal" />
    <div class="intro-container" :key="componentKey">
      <transition name="intro-fade">
        <Intro v-if="showIntro" @actionPerformed="handleActionPerformed"/>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="!showIntro">
        <div class="content-container">
          <div class="logo-container">
            Logo
            <img src="/assets/logo.png" alt="Logo" class="logo"/>
          </div>
          <video class="rounded-video" ref="videoRef" autoplay muted>
            <source src="https://kdbdg4gjgc2anfei.public.blob.vercel-storage.com/intro-CxILZcj46rQPKLXG4wqROC68wijrNF.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div  ref="threeContainer" class="three-container">
        </div>
<!--        <div class="menu-container">
          &lt;!&ndash; Остальной контент &ndash;&gt;
          <div class="interactive-menu">
            <div class="menu-item" :class="{active: activeItem === 0}" @click="activeItem = 0">
              <div class="circle"></div>
              <span>Видео</span>
            </div>
            <div class="menu-item" :class="{active: activeItem === 1}" @click="activeItem = 1">
              <div class="circle"></div>
              <span>Сфера</span>
            </div>
          </div>
        </div>-->
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


const threeContainer = ref(null);
let camera, scene, renderer, controls, composer;
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let isFocused = false; // Состояние фокуса на объекте
let currentFocus = null; // Текущий объект фокусировки
const activeItem = ref(0);

const selectedCylinderIndexes = [86, 190, 105, 180, 200, 156, 92, 132]; // Пример индексов
const texts = ['References', 'Unsere Vision', 'Heritage', 'CEO Statement', 'Unsere Mission', 'Unsere Expertiese', 'World wide Network', 'Produkt']; // Пример текстов


const showIntro = ref(true);
const initialCameraPosition = new THREE.Vector3(0, 0, 10); // Замените на ваше исходное положение камеры
const cityPositions = [];
const lines = []; // Для хранения линий
const textSprites = []; // Для хранения текстовых спрайтов
let isAnimating = true;
const showContent = ref(true);
function initThreeJs() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
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

  const sphereRadius = 5;
  controls.minDistance = sphereRadius + 3; // Устанавливаем минимальное расстояние приближения

  addSmallCylinders(sphereRadius, 300);
  addInvisibleCubes(); // Создаем невидимые кубы вокруг цилиндров
  addCitiesToSphere(sphereRadius);

  const selectedCylinders = selectedCylinderIndexes.map(index => allCylinders[index]);
  addTextLabelsToCylinders(selectedCylinders, texts);
  addGlowToCylinders(selectedCylinders)
  animate();
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', onWindowResize);
  //window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onMouseClick);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', onWindowResize);
  //window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('click', onMouseClick);
  if (controls) controls.dispose();
  if (renderer) renderer.dispose();
});

const componentKey = ref(0);
const isActiveSphereClick = ref(false)
const handleActionPerformed = () => {
  isActiveSphereClick.value = true
  setTimeout(() => {
    showIntro.value = false;
    componentKey.value++; // Изменение ключа приведет к ререндерингу и удалению Intro из DOM
  }, 4000); // Переключает на three-container через 5 секунд после события
};

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

let glowSprites = [];
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

const modalVisible = ref(false);
const selectedIndex = ref(-1);
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
function distanceCamera() {
  isFocused = false;
  isAnimating = true;

  const distance = 10;
  const direction = camera.position.clone().normalize();
  const newPos = direction.multiplyScalar(distance);

  new TWEEN.Tween(camera.position)
      .to({
        x: newPos.x,
        y: newPos.y,
        z: newPos.z
      }, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
}
let savedCameraPosition = new THREE.Vector3();
let savedCameraQuaternion = new THREE.Quaternion();
function focusOnObject(object) {
  if (isFocused) return;
  savedCameraPosition.copy(camera.position);
  savedCameraQuaternion.copy(camera.quaternion);
  isFocused = true;
  isAnimating = false;

  const newPos = object.position.clone().add(new THREE.Vector3(0, 0, 5));
  new TWEEN.Tween(camera.position)
      .to({x: newPos.x, y: newPos.y, z: newPos.z}, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        setTimeout(() => {
          distanceCamera();
        }, 3000);
      })
      .start();
}

function closeModal() {
  modalVisible.value = false; // Скрываем модальное окно
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
  canvas.width = 256; // Размер может быть адаптирован под ваши нужды
  canvas.height = 64; // Размер может быть адаптирован под ваши нужды

  context.fillStyle = '#5ed5eb'; // Цвет текста
  context.font = 'Bold 30px Arial'; // Стиль шрифта
  context.textAlign = 'center';
  context.fillText(text, 128, 40);


  return new THREE.CanvasTexture(canvas);
}
function updateCylinderMaterials(selectedCylinders) {
  const glowingMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff, // Голубой цвет
    emissive: 0x00ffff // Добавляем свечение того же цвета
  });

  selectedCylinders.forEach(cylinder => {
    cylinder.material = glowingMaterial;
  });
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
  if (!camera) return
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function isObjectInFrontOfCamera(object, camera) {
  const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
  const toObjectDirection = new THREE.Vector3().subVectors(object.position, camera.position).normalize();
  const angle = cameraDirection.angleTo(toObjectDirection);
  return angle < Math.PI / 2;
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
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableCubes, true); // Изменено на clickableCubes

    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.userData.isClickable) {
        onCylinderClick(intersects[i].object.userData.index);
        break;
      }
    }
  }
}

function onMouseMove(event) {

  const selectedCylinders = selectedCylinderIndexes.map(index => allCylinders[index]);
  if (!camera || isFocused) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(selectedCylinders, true);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    if (isObjectInFrontOfCamera(intersectedObject, camera)) {
      if (currentFocus !== intersectedObject) {
        currentFocus = intersectedObject;
        focusOnObject(intersectedObject);
      }
    }
  } else if (currentFocus) {
    distanceCamera();
    currentFocus = null;
  }
}


watch(showIntro, (newValue) => {
  if (!newValue) {
    nextTick(() => {
      initThreeJs()
    });
  }
});

function handleScroll() {
  const yOffset = window.pageYOffset;
  // Динамическое смещение добавляем к начальному смещению -500px
  const dynamicOffset = -800 + (yOffset * -0.1); // Уменьшаем динамическое смещение
  document.body.style.backgroundPosition = `center ${dynamicOffset}px`;
}


</script>

<style>



body {
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}

.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  /* Ваши стили для three-container */
  width: 100%; /* Пример */
  height: 100vh; /* Пример */
  /* Другие стили */
}
.logo {
  width: 200px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  margin-bottom: 20px; /* Регулируйте по необходимости */
  opacity: 0; /* Изначально скрыт */
  transform: translateY(-100%); /* Начать за пределами экрана */
  animation: slideDown 0.1s forwards; /* Анимация появления */
  animation-delay: 1.2s; /* Задержка появления логотипа после видео */
}

@keyframes slideDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rounded-video {
  width: 65%; /* Регулируйте размер видео */
  border-radius: 20px; /* Закругленные углы */
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
    background-size: 300%;
    background-position: center -800px;
    background-attachment: fixed;
    background-repeat: no-repeat;
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
</style>
