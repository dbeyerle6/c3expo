<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js';

const threeContainer = ref(null);
let camera, scene, renderer, controls;
let INTERSECTED;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const initialCameraPosition = new THREE.Vector3(0, 0, 20);
const cityPositions = [];
const lines = []; // Для хранения линий
const textSprites = []; // Для хранения текстовых спрайтов

onMounted(() => {
  initThreeJs();
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove, false);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove, false);
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

  camera.position.copy(initialCameraPosition);

  const sphereRadius = 5;
  addSmallCylinders(sphereRadius, 300);
  addCitiesToSphere(sphereRadius);
  addStarField(); // Добавляем туманность под сферой

  animate();
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
    {name: 'New York', lat: 40.7128, lon: -74.0060},
    {name: 'Los Angeles', lat: 34.0522, lon: -118.2437},
    {name: 'London', lat: 51.5074, lon: -0.1278},
    {name: 'Tokyo', lat: 85.6895, lon: 39.6917},
    {name: 'Moscow', lat: 55.7558, lon: 37.6173},
    {name: 'Sydney', lat: -33.8688, lon: 151.2093},
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
  const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

  // Очищаем предыдущие линии, если они были
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
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, sizeAttenuation: true });
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
  const stars = new THREE.Points(starsGeometry, starsMaterial);

  scene.add(stars);
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();

  scene.rotation.y -= 0.001; // Пример вращения сцены вокруг оси Y

  // Анимация линий
  const time = Date.now() * 0.001;
  lines.forEach((line, i) => {
    const newOpacity = 0.6 + Math.sin(time * 2 + i) * 0.4; // Меняем амплитуду на 0.4 и добавляем 0.5, чтобы минимальная прозрачность была 0.1
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
  // Прежняя логика
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(textSprites); // Измените на проверку только текстовых спрайтов

  if (intersects.length > 0) {
    const targetPosition = intersects[0].object.position.clone();
    const newPosition = targetPosition.multiplyScalar(2); // Настройте множитель для определения расстояния приближения
    // Анимация камеры к новой позиции
    new TWEEN.Tween(camera.position)
        .to({x: newPosition.x, y: newPosition.y, z: newPosition.z}, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
  }
}
</script>

<style>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
