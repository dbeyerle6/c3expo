<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import * as TWEEN from '@tweenjs/tween.js';

const threeContainer = ref(null);
let camera, scene, renderer, controls, composer;
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let isFocused = false; // Состояние фокуса на объекте
let currentFocus = null; // Текущий объект фокусировки

const initialCameraPosition = new THREE.Vector3(0, 0, 10); // Замените на ваше исходное положение камеры
const cityPositions = [];
const lines = []; // Для хранения линий
const textSprites = []; // Для хранения текстовых спрайтов
let isAnimating = true;


onMounted(() => {
  initThreeJs();
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
  if (controls) controls.dispose();
  if (renderer) renderer.dispose();
});

function initThreeJs() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
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
  addCitiesToSphere(sphereRadius);
  addStarField(); // Добавляем туманность под сферой

  animate();
}


function isVisibleAndAbove(object, camera) {
  const toObjectDirection = new THREE.Vector3().subVectors(object.position, camera.position).normalize();
  const cameraDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();

  // Проверяем, находится ли объект перед камерой
  const isAhead = toObjectDirection.dot(cameraDirection) > 0;

  // Дополнительно можно проверить, не находится ли объект за пределами сферы
  const toObjectDistance = camera.position.distanceTo(object.position);
  const toCenterDistance = camera.position.distanceTo(scene.position); // или другой центральной точке сферы
  const sphereRadius = 5; // Укажите реальный радиус сферы

  const isVisible = isAhead && toObjectDistance < toCenterDistance + sphereRadius;

  return isVisible;
}

function createCircleTexture() {
  const size = 128; // Размер текстуры
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  // Рисуем круг
  const center = size / 2;
  context.beginPath();
  context.arc(center, center, size / 2, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();

  // Создаем текстуру из канваса
  return new THREE.CanvasTexture(canvas);
}
function distanceCamera() {
  isFocused = false; // Сброс флага фокусировки
  isAnimating = true; // Возобновляем вращение сферы

  const distance = 10; // Замените это значение на желаемое расстояние отдаления
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

function focusOnObject(object) {
  if (!isFocused) {
    isFocused = true; // Устанавливаем флаг фокусировки
    isAnimating = false; // Останавливаем вращение

    const newPos = object.position.clone().add(new THREE.Vector3(0, 0, 5)); // Новая позиция для приближения

    new TWEEN.Tween(camera.position)
        .to({x: newPos.x, y: newPos.y, z: newPos.z}, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(() => {
          setTimeout(() => {
            distanceCamera(); // Функция для отдаления камеры
          }, 3000);
        })
        .start();
  }
}



// Функция для возвращения камеры к исходной позиции
function returnCameraToInitialPosition() {
  new TWEEN.Tween(camera.position)
      .to({
        x: initialCameraPosition.x,
        y: initialCameraPosition.y,
        z: initialCameraPosition.z
      }, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        isFocused = false; // Сброс флага фокусировки
        currentFocus = null; // Сбрасываем текущую цель фокусировки
        isAnimating = true; // Возобновляем вращение сферы
      })
      .start();
}




function addSmallCylinders(sphereRadius, count) {
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
    const cylinder = new THREE.Mesh(geometry, material);

    const position = new THREE.Vector3();
    position.setFromSphericalCoords(sphereRadius, phi, theta);
    cylinder.position.copy(position);

    const direction = position.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    cylinder.quaternion.setFromUnitVectors(up, direction.negate());

    scene.add(cylinder);
  }
}

function addCitiesToSphere(sphereRadius) {
  const cities = [
    {name: 'New York', lat: 25, lon: -74}, // Перемещено ближе к экватору
    {name: 'Los Angeles', lat: 0, lon: -118}, // Перемещено ближе к экватору
    {name: 'London', lat: 15, lon: 0}, // Перемещено на экватор и нулевой меридиан для централизации
    {name: 'Tokyo', lat: 19, lon: 140}, // Перемещено ближе к экватору, коррекция долготы для распределения
    {name: 'Moscow', lat: -9, lon: 37}, // Перемещено ближе к экватору
    {name: 'Sydney', lat: -20, lon: 151}, // Перемещено ближе к экватору
  ];

  cities.forEach(city => {
    const phi = THREE.MathUtils.degToRad(90 - city.lat);
    const theta = THREE.MathUtils.degToRad(city.lon + 180);

    const pointGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const pointMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    point.position.setFromSphericalCoords(sphereRadius, phi, theta);
    scene.add(point);

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(generateTextCanvas(city.name)),
      transparent: true,
    }));
    sprite.position.copy(point.position).multiplyScalar(1.1);
    sprite.scale.set(1.2, 0.6, 1); // Изменено для лучшей видимости
    scene.add(sprite);
    textSprites.push(sprite);

    cityPositions.push(point.position.clone());
  });

  createCityLines();
}
function addTubeBetweenPoints(point1, point2, thickness) {
  const path = new THREE.LineCurve3(point1, point2);
  const tubeGeometry = new THREE.TubeGeometry(path, 20, thickness, 8, false);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  const tube = new THREE.Mesh(tubeGeometry, material);
  scene.add(tube);
  lines.push(tube); // Сохраняем для анимации
}

function createCityLines() {
  lines.forEach(line => {
    scene.remove(line);
  });
  lines.length = 0; // Очищаем массив линий

  // Двойной цикл для создания труб между всеми парами точек
  for (let i = 0; i < cityPositions.length; i++) {
    for (let j = i + 1; j < cityPositions.length; j++) {
      addTubeBetweenPoints(cityPositions[i], cityPositions[j], 0.01); // 0.1 - это толщина трубы
    }
  }
}


function generateTextCanvas(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  context.font = '24px Arial';
  context.fillStyle = 'rgba(255, 255, 255, 0.8)';
  context.textAlign = 'center';
  context.fillText(text, 128, 64);

  return canvas;
}

function addStarField() {
  const starsGeometry = new THREE.BufferGeometry();
  const starField = [];
  const radius = 100; // Радиус области, где будут расположены звезды
  const starsAmount = 5000; // Количество звезд

  for (let i = 0; i < starsAmount; i++) {
    const x = THREE.MathUtils.randFloatSpread(radius) * (Math.random() > 0.5 ? 1 : -1);
    const y = THREE.MathUtils.randFloatSpread(radius / 4); // Ограничиваем высоту, чтобы создать эффект "под сферой"
    const z = THREE.MathUtils.randFloatSpread(radius) * (Math.random() > 0.5 ? 1 : -1);
    starField.push(x, y, z);
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starField, 3));
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    map: createCircleTexture(), // Применяем текстуру кружочка
    transparent: true,
    blending: THREE.AdditiveBlending, // Опционально: добавляем смешивание для более яркого эффекта
  });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
}


function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();
  if (isAnimating) {
    scene.rotation.y -= 0.001;
  }

  const time = Date.now() * 0.001;
  lines.forEach((line, i) => {
    const newOpacity = 0.6 + Math.sin(time * 2 + i) * 0.4;
    line.material.opacity = newOpacity;
  });

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function onMouseMove(event) {
  if (isFocused) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(textSprites, true);

  for (let i = 0; i < intersects.length; i++) {
    const intersectedObject = intersects[i].object;
    if (isVisibleAndAbove(intersectedObject, camera)) {
      if (currentFocus !== intersectedObject) {
        currentFocus = intersectedObject;
        focusOnObject(intersectedObject);
        break; // Прерываем цикл после первого же подходящего объекта
      }
    }
  }
}




</script>

<style>
body {
  margin: 0 !important;
  padding: 0;
}
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
