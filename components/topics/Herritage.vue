<template>
  <div ref="containerRef" class="heritageContainer" id="heritage">
    <div class="infoBlock" id="info5">
      <img class="fifthBackground" src="/static/images/heritage_header.png" alt="">
      <div class="fifth_box">
        <div class="heritage_headline">
        <p v-html="$t('heritage.text1')">
        </p>
          <img class="heritage_image":src="heritageImage1" alt="">
        </div>
        <h3 class="fifth_title"> {{ $t('heritage.subtitle1') }}
        </h3>

        <h2 class="fifth_date">{{ $t('heritage.date1') }}
        </h2>
      </div>
    </div>

    <div class="line_container">
      <svg width="100%" height="100%">
        <polyline id="animatedLine" fill="none" stroke="#36e4da" stroke-width="8" stroke-linecap="square"
                  stroke-dasharray="5200" stroke-dashoffset="5200"></polyline>
        <rect id="square1" x="calc(50% - 10px)" y="0" width="20" height="20" fill="#36e4da" opacity="0"></rect>
        <rect id="square2" x="calc(5% - 10px)" y="800" width="20" height="20" fill="#36e4da" opacity="0"></rect>
        <rect id="square3" x="calc(90% - 10px)" y="1600" width="20" height="20" fill="#36e4da" opacity="0"></rect>
        <rect id="square4" x="calc(10% - 10px)" y="2400" width="20" height="20" fill="#36e4da" opacity="0"></rect>
        <rect id="square5" x="calc(50% - 10px)" y="3200" width="20" height="20" fill="#36e4da" opacity="0"></rect>

      </svg>
    </div>
    <div class="infoBlock" id="info1" style="position: absolute; top: 1200px; left: 20%;">
      <div class="first_date">
        <h3>{{ $t('heritage.date2') }}</h3>
      </div>
      <div class="first_image">
        <img src="/static/images/1997.png" alt="">
      </div>
      <div class="first_text">
        <p v-html="$t('heritage.text2')">
        </p>
      </div>
    </div>
    <div class="infoBlock" id="info2" style="position: absolute; top: 2340px; right: 8%;">
      <div class="second_date">
        <h3>{{ $t('heritage.date3') }}</h3>
        <p class="second_text">{{ $t('heritage.text3') }}
        </p>
      </div>
      <div class="second_image">
        <img src="/static/images/2003.png" alt="">
      </div>
    </div>
    <div class="infoBlock" id="info3" style="position: absolute; top: 3140px; left: 20%;">
      <div class="third_date">
        <h3>{{ $t('heritage.date4') }}</h3>
        <div class="third_container">
          <img src="/static/images/2011.png" alt="">
          <p class="third_text">
            {{ $t('heritage.text4') }}
          </p>
        </div>
      </div>
    </div>
    <div class="infoBlock" id="info4" style="position: absolute; top: 3900px; right: 10%;">
      <div class="fourth_image">
        <img src="/static/images/2024.png" alt="">
      </div>
      <div class="fourth_text">
        <h3>{{ $t('heritage.date5') }}</h3>
        <p v-html="$t('heritage.text5')">
        </p>
      </div>
    </div>
  </div>
  <div class="scroll-circle">Scroll!</div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import heritageImage1 from '/static/images/heritage1.jpg';

const containerRef = ref(null);
const svgRef = ref(null);
onMounted(() => {
  // Анимация круга "Click!"
  gsap.to('.scroll-circle', {
    y: '-20%', // Двигать вверх на 20% от текущей позиции
    repeat: -1, // Бесконечное повторение
    yoyo: true, // Возврат в исходное положение
    ease: 'power1.inOut', // Плавность движения
    duration: 1 // Длительность одного цикла вверх-вниз
  });
});
onMounted(async () => {
  await nextTick();
  gsap.registerPlugin(ScrollTrigger);
  const container = containerRef.value;
  const svg = svgRef.value;
  const width = container.clientWidth;
  const height = container.clientHeight;

  const points = width > 768 ? [
    `${width / 2 + 130}, -100`,                                // Первая точка
    `${width * 0.05},${800}`,                         // Вторая точка
    `${width * 0.9},${1760}`,                        // Третья точка
    `${width * 0.1},${2600}`,                        // Третья точка
    `${width / 3 * 2 },${3300}`
  ] : [
    `${width / 2 + 50}, 100`,                                // Первая точка
    `${width * 0.05},${800}`,                         // Вторая точка
    `${width * 0.9},${1760}`,                        // Третья точка
    `${width * 0.1},${2600}`,                        // Третья точка
    `${width / 2},${3340}`
  ];

  const polyline = document.getElementById('animatedLine');
  polyline.setAttribute('points', points.join(' '));

  const length = 6200;
  polyline.setAttribute('stroke-dasharray', length);
  polyline.setAttribute('stroke-dashoffset', length);


  gsap.to(polyline, {
    strokeDashoffset: 0,
    duration: 3,
    ease: "none",
    scrollTrigger: {
      scroller: '.modal-content',
      trigger: '#animatedLine',
      start: "top center",
      end: "bottom 5%",
      scrub: 1,
    }
  });

  const infoBlocks = document.querySelectorAll('.infoBlock');
  infoBlocks.forEach(block => {
    gsap.fromTo(block,
        {opacity: 0, y: 50},
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            scroller: '.modal-content',
            trigger: block,
            start: "top 50%", // Начните анимацию, когда блок появится в 85% окна просмотра сверху
            end: "bottom 50%",
            toggleActions: "play none none reverse",
          }
        }
    );
  });
});
</script>

<style scoped>

.scroll-circle {

  position: fixed;
  bottom: 10%; /* Начальная позиция в нижней части */
  left: 50%; /* Центрирование по горизонтали */
  transform: translateX(-50%); /* Точное центрирование текста */
  width: 50px;
  height: 50px;
  background-color: #888888; /* Цвет фона */
  color: white; /* Цвет текста */
  border-radius: 50%; /* Сделать элемент круглым */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  color: #36e4da;
  font-family: "Century Gothic", sans-serif;
}

.heritage_headline {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.heritage_headline > p {
  text-align: justify;
  width: 45%;
  font-size: 20px;
}

.heritage_headline > img {
  margin: 20px 0;
}

svg {
  z-index: 10;
  position: relative;
}


p {
  text-align: justify;
  word-break: normal;
}

.fifth_box > p {
  text-align: justify;
}
.third_container > img {
  width: 60%;
}

.heritageContainer {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 3000px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 120px;
  overflow: hidden;
  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top -20% right 30%;
  background-repeat: space;
  background-origin: content-box;

}

.infoBlock {
  width: 200px;
  padding: 10px;
  background: white;
  color: black;
  transform: translateX(-50%); /* Центрировать блок по горизонтали */
  opacity: 0; /* Начните с невидимости */
}

.date_block {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 15%;
  align-items: center;

}


.heritage_image {
  width: 50%;
  top: 50px;
  height: 95%;
}


.line_container {
  width: 100%;
  height: 3900px;
  margin-top: -60px;
}


.heritage_text {
  color: #000;
}

#secondContainer, #thirdContainer {
  margin-top: -30px;
  height: 600px;
}

#fourthContainer {
  height: 1100px;
}

#info1 {
  width: 40%;
  left: 0;
  height: 600px;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.00043767507002800965) 0%, rgba(145, 145, 145, 0.7931547619047619) 40%, rgba(82, 82, 82, 1) 100%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5%;
  padding-left: 25%;
  border-right: 1px solid #36e4da;
}

.first_date {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 120px;
}

.first_date h3 {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  font-family: "Century Gothic", sans-serif;
}

.first_image > img {
  height: 120px;
}

.first_text {
  height: 120px;
  width: 35%;
  display: flex;
  align-items: flex-end;

  color: #fff;
  margin: 0;
  font-family: "Century Gothic", sans-serif;
  padding-bottom: 20px;;
}

.first_text > p {
  font-size: 18px;
}

#info2 {
  height: 400px;
  width: 40%;
  transform: translateX(0%);
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.00043767507002800965) 0%, rgba(145, 145, 145, 0.7931547619047619) 40%, rgba(82, 82, 82, 1) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  right: 20%;
  padding-right: 10%;
  padding-top: 50px;
  border-right: 1px solid #36e4da;
}

.second_date {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.second_date h3 {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  font-family: "Century Gothic", sans-serif;
}

.second_date > p {
  font-size: 18px;
  line-height: 1.5;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  width: 50%;
}

.second_image {
  margin-right: 35%;
}

.second_image > img {
  height: 120px;
}

#info3 {
  width: 50%;
  height: 300px;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.00043767507002800965) 0%, rgba(145, 145, 145, 0.7931547619047619) 40%, rgba(82, 82, 82, 1) 100%);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  transform: translateX(-25%);
  padding-right: 5%;
  border-right: 1px solid #36e4da;
  padding-left: 25%;
  padding-top: 100px;
}

.third_text {
  width: 100%;
  font-size: 18px;
  line-height: 1.5;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
}

.third_date {
  display: flex;
  margin-left: 5%;
}

.third_date > h3 {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  font-family: "Century Gothic", sans-serif;
}

#info4 {
  width: 60%;
  height: 300px;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.00043767507002800965) 0%, rgba(145, 145, 145, 0.7931547619047619) 40%, rgba(82, 82, 82, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(0%);
  padding-right: 5%;
  border-right: 1px solid #36e4da;
  padding-left: 10%;
}

.fourth_image {
  flex: 50%;

}
.fourth_image > img {
  width: 350px;
}

.fourth_text {
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 10%;
}

.fourth_text > p {
  width: 350px;
  font-size: 18px;
  line-height: 1.5;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
}

.fourth_text > h3 {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  font-family: "Century Gothic", sans-serif;
}

#info5 {
  position: relative;
  width: 100%;
  height: 700px;
  transform: translateX(0%);
  background: none;
}

.fifthBackground {
  position: absolute;
  width: 60%;
}

.fifth_image_block {
  display: flex;
}

.fifth_box {
  width: 40%;
  position: absolute;
  height: auto;
  right: 0;
  top: 100px;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(145,145,145,1) 100%, rgba(0,0,0,1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 30px 60px;
}

.fifth_box > * {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
}

.fifth_box > p {
  width: 50%;
  line-height: 1.6;
  font-size: 18px;
  text-justify: inter-character;
}

.fifth_title {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
}
.fifth_date {
  font-size: 36px;
  font-weight: bold;
  margin: 0;
}

.fifth_box > h3 {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}


@media (max-width: 768px) {

  .fifth_box {
    padding: 0;
    width: 100%;
  }

  .heritage_headline {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .heritage_headline > p {
    width: 100%;
  }

  .third_date {
    display: flex;
    margin-left: 0;
  }
  #info1 {
    width: 80%;
    left: 0;
    height: 500px;
    position: absolute;
    top: 1300px;
    translate: none;
    rotate: none;
    scale: none;
    transform: translateX(0%) !important;
    opacity: 1;
    flex-direction: column;
    justify-content: center;
  }

  #info2 {
    width: 70%;
    position: absolute;
    top: 2300px;
    height: 300px;
    right: 0;
    translate: none;
    rotate: none;
    scale: none;
    transform: translateX(10%) !important;
    opacity: 1;
    margin: 0;
    padding-top: 20px;

  }

  .second_image > img {
    width: 250px;
  }

  #info3 {
    width: 70%;
    position: absolute;
    left: 0;
    translate: none;
    rotate: none;
    scale: none;
    transform: translateX(-10%) !important;
    opacity: 1;
    margin: 0;
    padding-top: 20px;

  }

  .third_date {
    flex-direction: column;
  }

  .third_container {
    width: 50%;
  }

  .third_container > img {
    width: 300px;
  }

  .third_container > p {
    width: 300px;
  }

  .fifthBackground {
    width: 100%;
  }

  .fifth_box {
    width: 80%;
    height: 600px;
  }

  .fifth_box > p {
    width: 100%;
    padding-top: 100px;
  }

  .heritage_image {
    height: 50%;
    right: 10%;
  }

  #info4 {
    flex-direction: column;
    height: 400px;
    padding: 50px;
    margin-top: 100px;
    top: 3700px;
    z-index: 100;
  }

  #info5 {
    z-index: 100;
  }

}

@media (max-width: 1024px) {
  #info1 {
    width: 80%;
    left: 0;
    height: 500px;
    position: absolute;
    top: 1300px;
    translate: none;
    rotate: none;
    scale: none;
    transform: translateX(0%) !important;
    opacity: 1;
    flex-direction: column;
    justify-content: center;
  }

  #info2 {
    width: 70%;
    position: absolute;
    top: 2300px;
    height: 300px;
    right: 0;
    translate: none;
    rotate: none;
    scale: none;
    transform: translateX(10%) !important;
    opacity: 1;
    margin: 0;
    padding-top: 20px;

  }

  .second_image > img {
    width: 250px;
  }

  #info3 {
    width: 70%;
    position: absolute;
    left: 0;
    translate: none;
    rotate: none;
    scale: none;
    transform: translateX(-10%) !important;
    opacity: 1;
    margin: 0;
    padding-top: 20px;

  }

  .third_date {
    flex-direction: column;
  }

  .third_container {
    width: 50%;
  }

  .third_container > img {
    width: 300px;
  }

  .third_container > p {
    width: 300px;
  }

  .fifthBackground {
    width: 100%;
  }

  .fifth_box {
    width: 80%;
    height: 600px;
    display: flex;
    flex-direction: column;
  }

  .fifth_box > p {
    width: 100%;
    padding-top: 100px;
  }

  .heritage_image {
    right: 10%;
    position: absolute;
    height: 300px;
  }

  #info4 {
    flex-direction: column;
    height: 400px;
    padding: 50px;
    margin-top: 100px;
    top: 3760px !important;
    z-index: 100;
  }

  #info5 {
    z-index: 100;
  }
}
@media (max-width: 1366px) {
  #info1 {
    left: 26% !important;
  }

  #info2 {
    border-right: 1px solid #36e4da;
  }

  #info3 {
    left: 22%!important;
  }

}

@media screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  #info1 {
    left: 5% !important;
  }
  #info2 {
    right: 28%;
  }
}


@media screen and (max-device-width: 512px){

  .fifth_box > h3 {
    font-size: 28px;
    width: 80% ;
    margin: 0 auto;
  }
  .fifth_box > h2 {
    font-size: 28px;
    width: 80% ;
    margin: 0 auto;
    padding-bottom: 20px;
  }


  .fifth_box {
    width: 100%;
    height: auto;
    padding-top: 50px;
  }

  .heritage_image {
    position: static;
  }

  .heritage_headline {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .heritage_headline > p {
    width: 80%;
    margin: 0 auto;
  }

  .heritage_headline > img {
    width: 50%;
    margin-bottom: 30px;
  }
  .third_date {
    width: 120%;
    margin-left: 12%;
  }

  .third_container > p {
    width: 100%;
    text-align: justify;
  }

  .second_image > img {
    width: 200px;
    height: auto;
  }

  #info1 {
    left: 5% !important;
    height: auto;
    width: 60%;
  }
  #info2 {
    width: 80%;
    right: 28%;
    height: auto;
  }

  #info3 {
    height: auto;
    left: 10% !important;
  }

  #info4 {
    padding: 30px;
    width: 70%;
  }

  .third_container > img {
    width: 130%;
  }

  .fourth_image > img {

    width: 100%;
  }

  .fourth_text > p {
    width: 100%;
  }

  .third_container {
    width: 80%;
  }
  .second_date {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }

  .second_date > p {
    margin-left: -80px;
  }

  .first_text {
    height: auto;
    width: 100%;
  }
}


</style>
