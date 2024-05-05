<template>
  <div ref="containerRef" class="heritageContainer" id="heritage">
    <div class="heritage_image">
      <img :src="heritageImage1" alt="">
    </div>

    <div class="line_container">
      <svg width="100%" height="100%">
        <path id="line1" d="" stroke="#36e4da" stroke-dasharray="1000" stroke-dashoffset="1000" stroke-width="8" stroke-linecap="round"> </path>
<!--          <circle id="endCircle" cx="0" cy="0" r="0" fill="#36e4da" />-->
      </svg>
    </div>
    <div class="date_block" id="dateOne">
      <div class="heritage_info" style="opacity: 0">
      <div id="heritageText" class="heritage_text" style="opacity: 0">Some text about the heritage</div>
      <div id="heritageImage" style="visibility: hidden;">
        <img src="" alt="">
      </div>
      </div>
    </div>
    <div class="line_container" id="secondContainer">
      <svg width="100%" height="100%">
        <path id="line2"  stroke="#36e4da" stroke-width="8" stroke-dasharray="1200" stroke-dashoffset="1200"></path>
      </svg>
    </div>
    <div class="line_container" id="thirdContainer">
      <svg width="100%" height="100%">
        <path id="line3"  stroke="#36e4da" stroke-width="8" stroke-dasharray="1200" stroke-dashoffset="1200"></path>
      </svg>
    </div>
    <div class="line_container" id="fourthContainer">
      <svg width="100%" height="100%">
        <path id="line4"  stroke="#36e4da" stroke-width="8" stroke-dasharray="1200" stroke-dashoffset="1200"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import heritageImage1 from '/static/images/heritage1.jpg';
const containerRef = ref(null);



onMounted(async () => {
  const modalWidth = containerRef.value.clientWidth;
  const startX = modalWidth / 2;
  const startY = 0;
  const firstEndX = modalWidth * 0.1;
  const firstEndY = startY + 800;

  const secondStartX = firstEndX;
  const secondStartY = firstEndY;
  const secondEndX = modalWidth - modalWidth;
  const secondEndY = secondStartY + 800;


  const dashArrayValue = modalWidth * 0.9;
  const path1 = document.getElementById('line1');
  const path2 = document.getElementById('line2');
  const path3 = document.getElementById('line3');
  const path4 = document.getElementById('line4');
  path1.setAttribute('d', `M${startX} ${startY} L${firstEndX} ${firstEndY}`);
  path2.setAttribute('d', `M${modalWidth / 100 * 11} ${0} L${modalWidth * 1.2} ${800}`);
  path3.setAttribute('d', `M${modalWidth / 100 * 92} ${20} L${0} ${700}`);
  path4.setAttribute('d', `M${modalWidth / 100 * 11} ${0} L${modalWidth / 2} ${800}`);
  path2.setAttribute('stroke-dasharray', dashArrayValue);
  path2.setAttribute('stroke-dashoffset', dashArrayValue);
  path3.setAttribute('stroke-dasharray', dashArrayValue);
  path3.setAttribute('stroke-dashoffset', dashArrayValue);
  path4.setAttribute('stroke-dasharray', dashArrayValue);
  path4.setAttribute('stroke-dashoffset', dashArrayValue);




  await nextTick();
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('#endCircle', {
    duration: 1,
    attr: { r: 30 },
    opacity: 1,
    zIndex: 10,
    scrollTrigger: {
      scroller: '.modal-content',
      trigger: "#endCircle",
      start: "top 80%",
      end: "bottom 20%",
      immediateRender: false,
      scrub: 2,
    }
  })

  gsap.to("#line1", {
    duration: 1,
    strokeDashoffset: 0,
    scrollTrigger: {
      scroller: '.modal-content',
      trigger: ".line_container",
      start: "top 80%",
      end: "bottom 20%",
      immediateRender: false,
      scrub: 2,
    },
  });
  gsap.to("#line2", {
    duration: 1,
    strokeDashoffset: 1,
    scrollTrigger: {
      scroller: '.modal-content',
      trigger: "#line2",
      start: "top 40%",
      end: "bottom 50%",
      markers: true,
      immediateRender: false,
      scrub: 2,
    }
  });
  gsap.to("#line3", {
    duration: 1,
    strokeDashoffset: 0,
    scrollTrigger: {
      scroller: '.modal-content',
      trigger: "#thirdContainer",
      start: "top 60%",
      end: "bottom 50%",
      markers: true,
      immediateRender: false,
      scrub: 2,
    }
  });
  gsap.to("#line4", {
    duration: 1,
    strokeDashoffset: 0,
    scrollTrigger: {
      scroller: '.modal-content',
      trigger: "#fourthContainer",
      start: "top 60%",
      end: "bottom 50%",
      markers: true,
      immediateRender: false,
      scrub: 2,
    }
  });
  // gsap.to(".heritage_info", {
  //   duration: 1,
  //   scrollTrigger: {
  //     scroller: '.modal-content',
  //     trigger: ".date_block",
  //     start: "top 50%",
  //     end: "bottom 20%",
  //     immediateRender: true,
  //     scrub: true,
  //     onEnter: () => {
  //       gsap.fromTo(".heritage_info",
  //           {opacity: 0, scale: 0.95},
  //           {opacity: 1, scale: 1, duration: 0.4, ease: "power2.out"}
  //       );
  //     },
  //     onLeaveBack: () => {
  //       gsap.to(".heritage_info", {opacity: 0, scale: 0.95, duration: 1.5, ease: "power2.out"});
  //     }
  //   }
  // });
  gsap.to(".heritage_info", {
    duration: 1,
    scrollTrigger: {
      scroller: '.modal-content',
      trigger: ".date_block",
      start: "top 50%",
      end: "bottom 20%",
      scrub: 0.5,
      onEnter: () => {
        gsap.fromTo(".heritage_info",
            {opacity: 0, scale: 0.95},
            {opacity: 1, scale: 1, duration: 0.4, ease: "power2.out"}
        );
      },
      onLeaveBack: () => {
        gsap.to(".heritage_info", {opacity: 0, scale: 0.95, duration: 1.5, ease: "power2.out"});
      }
    }
  });


});
</script>

<style scoped>

svg {
  z-index: 10; /* Устанавливаем достаточно высокий z-index */
  position: relative; /* z-index работает только с positioned элементами */
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

}

.date_block {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 15%;
  align-items: center;

}


.heritage_image {
  margin: 100px 0;
  min-height: 500px;
}

.heritage_info {
  height: 200px;
  width: 30%;
  position: absolute;
  z-index: 15;
  background-color: #fff;
}

.line_container {
  width: 100%;
  height: 800px;
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
</style>
