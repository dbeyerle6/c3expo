<template>
  <div style="max-height: 1200px; ;overflow-y: auto" @click="toggleContent">
    <div v-show="showDiv1" class="references_container">
      <div class="box title">
        <h1 class="references_title">{{$t('references.title')}}</h1>
      </div>
      <div class="box image">
        <img src="/static/images/references1.jpg" alt="Our references">
      </div>
      <div class="box empty">
        <p class="references_text small" v-html="$t('references.text1')"></p>
        <div class="small_image">
          <img src="/static/images/references2.jpg" alt="Our references">
        </div>
      </div>
      <div class="box description">
      </div>
    </div>
    <div v-show="showDiv2" class="slideTwo">
      <div class="column_one">
        <div class="slideTwo_title"></div>
        <div class="slideTwo_image">
          <img src="/static/images/references4.jpg" alt="Our references">
        </div>
      </div>
      <div class="column_two">
        <div class="slideTwo_image">
          <img src="/static/images/references3.jpg" alt="Our references">
        </div>
        <div class="slideTwo_text">
          <p class="references_text big" v-html="$t('references.text2')"></p>
        </div>
      </div>
    </div>
    <div class="click-circle">Click!</div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import gsap from "gsap";
const showDiv1 = ref(true);
const showDiv2 = ref(false);
const props = defineProps({
  showDiv1: Boolean,
  showDiv2: Boolean
});

onMounted(() => {
  // Анимация круга "Click!"
  gsap.to('.click-circle', {
    y: '-20%', // Двигать вверх на 20% от текущей позиции
    repeat: -1, // Бесконечное повторение
    yoyo: true, // Возврат в исходное положение
    ease: 'elastic', // Плавность движения
    duration: 1 // Длительность одного цикла вверх-вниз
  });
});
const toggleContent = () => {
  if (showDiv1.value) {
    // Анимация исчезновения влево для первого контейнера
    gsap.to('.references_container', { x: -100, opacity: 0, onComplete: () => {
        showDiv1.value = false;
        showDiv2.value = true;
        // Анимация появления справа для второго контейнера
        gsap.fromTo('.slideTwo', { x: 100, opacity: 0 }, { x: 0, opacity: 1 });
      }});
  } else {
    // Анимация исчезновения влево для второго контейнера
    gsap.to('.slideTwo', { x: -100, opacity: 0, onComplete: () => {
        showDiv2.value = false;
        showDiv1.value = true;
        // Анимация появления справа для первого контейнера
        gsap.fromTo('.references_container', { x: 100, opacity: 0 }, { x: 0, opacity: 1 });
      }});
  }
};
</script>

<style scoped>

p {
  text-align: justify;
}

.click-circle {
  position: fixed;
  bottom: 10%; /* Начальная позиция в нижней части */
  left: 50%; /* Центрирование по горизонтали */
  transform: translateX(-50%); /* Точное центрирование текста */
  width: 40px;
  height: 40px;
  background-color: #888888; /* Цвет фона */
  color: white; /* Цвет текста */
  border-radius: 50%; /* Сделать элемент круглым */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-family: "Century Gothic", sans-serif;
}

.slideTwo {
  display: flex; /* Используем flexbox для размещения колонок */
  width: 100%; /* Полная ширина контейнера */
  margin-top: 100px;
  overflow-y: hidden;
  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top right;
  background-repeat: no-repeat;
}

.column_one, .column_two {
  display: flex; /* Flexbox для внутренних элементов */
  flex-direction: column; /* Элементы в колонке располагаются вертикально */
}

.slideTwo_text {
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(123, 123, 123, 1) 54%, rgba(111, 111, 111, 1) 100%, rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%);
  padding: 10px 30px;
}

.column_one {
  width: 55%; /* Ширина первой колонки */
  border-right: 1px solid #36e4da;
}

.column_two {
  width: 45%; /* Ширина второй колонки */
}

.slideTwo_image {
  height: 70%; /* Высота блока с изображением */
}

.slideTwo_image > img {
  margin-bottom: 120px;
}

.slideTwo_title {
  height: 30%; /* Высота блока с текстом/заголовком */
  display: flex; /* Flexbox для корректного выравнивания текста */
  align-items: center; /* Центрирование текста по вертикали */
  justify-content: center; /* Центрирование текста по горизонтали */
}


.slideTwo_text {
  height: 70%;
  margin-top: -120px;
}

.column_two .slideTwo_image img {
  width: 70%; /* Задаем ширину изображения равной ширине блока */
  height: 120%; /* Задаем высоту изображения равной высоте блока */
  object-fit: cover; /* Изображение заполняет блок, сохраняя свои пропорции */
  z-index: 20;

}

.slideTwo_image img {
  width: 100%; /* Задаем ширину изображения равной ширине блока */
  height: 120%; /* Задаем высоту изображения равной высоте блока */
  object-fit: cover; /* Изображение заполняет блок, сохраняя свои пропорции */
}



.references_container {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  height: inherit;
  width: 100%;
  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top -20% left -1%;
  background-repeat: no-repeat;
}

.references_container_reverse {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  height: inherit;
  width: 100%;
  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top -20% left -1%;
  background-repeat: no-repeat;
  justify-content: space-between;
}

.small_image {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-top: -40px;
}

.small_image img {
  height: 100%;
  width: 70%;
  margin-right: -50px;
}

.box {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.title {
  font-family: "Century Gothic", sans-serif;
  font-size: 60px;
}

.image {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-bottom: -140px;
  border-left: 1px solid #36e4da;
}

.reverse_image {
  height: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  box-sizing: border-box;
  margin-top: -450px;
  border-right: 1px solid #36e4da;
}

.small {
  font-size: 17px;
  line-height: 1.5;
}

.references_text {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  height: 100%;
  font-size: 18px;
  line-height: 1.8;
}

.references_title {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  height: 100%;
  font-size: 80px;
}

.image img {
  max-width: 200%;
  max-height: 200%;
  width: 100%;
  height: 40% !important;
  display: block;
}

.empty {
  border-right: 1px solid #36e4da;
  display: flex;
  flex-direction: column;
  text-align: justify;
  padding: 0px 50px 0 50px;
  height: 100%;
  margin-top: -150px;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(123, 123, 123, 1) 54%, rgba(111, 111, 111, 1) 100%, rgba(255, 255, 255, 1) 100%, rgba(0, 0, 0, 1) 100%);
}




.big {
  line-height: 2 !important;
}


.description {
}

@media screen and (min-device-width: 768px) and (max-device-width: 1366px) {
  .title > h1 {
    font-size: 60px;
  }
  .empty {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .references_container {
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: flex-start;
    background-size: 120%;
    margin-top: 140px;

    background-position: bottom left;
    padding-bottom: 100px;
  }

  .references_container .box.title {
    order: 2; /* Изначально первый, но меняем на второе место */
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 50px;
  }

  .references_container .box.image {
    order: 1; /* Изначально второй, но меняем на первое место */
  }

  .references_container .box.empty {
    order: 3; /* Позиция может оставаться без изменений, если это третий блок */

    padding: 30px 30px 0 60px;
  }

  .references_container .box.description {
    order: 4; /* Позиция может оставаться без изменений, если это четвертый блок */
  }

  .image {
    width: 100%;
    box-sizing: border-box;
    top: -25%;
    left: -30%;
    z-index: 20;
    border-left: none;
    border-bottom: 2px solid #36e4da;
  }

  .image img {
    width: 100%;
  }

  .empty {
    width: 90%;

    padding: 30px;
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  .title {
    margin-top: 100px;
    font-size: 16px;
    padding: 40px 20px 0 0;
  }

  .references_container_reverse {
    margin-top: 80px;
    display: flex;
    flex-wrap: wrap;
    height: inherit;
    width: 100%;
    background-image: url("/assets/c3expoback.png");
    background-size: 58%;
    background-position: top -20% left -1%;
    background-repeat: no-repeat;
    justify-content: space-between;
  }


  .reverse_empty {
    order: 2;
    width: 100%;
    border-left: 1px solid #36e4da;
    display: flex;
    flex-direction: column;
    text-align: justify;
    padding: 35px 100px;

    height: 100%;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(123,123,123,1) 100%, rgba(111,111,111,1) 100%, rgba(255,255,255,1) 100%, rgba(198,198,198,1) 100%);}


  .reverse_image {
    height: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    box-sizing: border-box;
    margin-top: -110px;
    border-right: 1px solid #36e4da;
  }


  .reverse_small_image img {
    height: 100%;
    width: 80%;
    margin-right: -100px;
  }

  .small_image img {
    width: 100%;
  }





  .slideTwo {
    display: flex; /* Используем flexbox для размещения колонок */
    width: 100%; /* Полная ширина контейнера */
    flex-direction: column;
    margin-top: 140px;
    overflow-y: hidden;
    background-image: url("/assets/c3expoback.png");
    background-size: 58%;
    background-position: top right;
    background-repeat: no-repeat;
  }

  .column_one, .column_two {
    display: flex; /* Flexbox для внутренних элементов */
    flex-direction: column; /* Элементы в колонке располагаются вертикально */
  }

  .slideTwo_text {
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(123,123,123,1) 100%, rgba(111,111,111,1) 100%, rgba(255,255,255,1) 100%, rgba(198,198,198,1) 100%);padding: 10px 30px;
  }

  .column_one {
    width: 100%; /* Ширина первой колонки */
    border-right: 1px solid #36e4da;
  }

  .column_two {
    width: 100%; /* Ширина второй колонки */
    display: flex;
  }

  .slideTwo_image {
    height: 100%; /* Высота блока с изображением */
    order: 2;

  }

  .slideTwo_title {
    height: 30%; /* Высота блока с текстом/заголовком */
    display: flex; /* Flexbox для корректного выравнивания текста */
    align-items: center; /* Центрирование текста по вертикали */
    justify-content: center; /* Центрирование текста по горизонтали */
  }


  .slideTwo_text {
    order: 1;
    height: 70%;
    margin-top: -120px;
  }

  .column_two .slideTwo_image img {
    width: 100%; /* Задаем ширину изображения равной ширине блока */
    height: 100%; /* Задаем высоту изображения равной высоте блока */
    object-fit: cover; /* Изображение заполняет блок, сохраняя свои пропорции */
    z-index: 20;
    order: 2;

  }

  .slideTwo_image img {
    width: 100%; /* Задаем ширину изображения равной ширине блока */
    height: 120%; /* Задаем высоту изображения равной высоте блока */
    object-fit: cover; /* Изображение заполняет блок, сохраняя свои пропорции */
  }

  .references_title {
    font-size: 60px;
  }




}

@media screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .references_title {
    font-size: 60px !important;
  }

  .references_container {
    display: flex;
    flex-direction: column;
  }

  .box {
    width: 100%;
  }

  .image > img {
    border-right: none;
  }
}
</style>
