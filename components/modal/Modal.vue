<template>
  <transition name="modal">
  <div class="modal-container" v-if="isVisible">
    <div class="modal-content" ref="modalContentRef">
      <div class="modal_info" v-if="props.index === 180">
        <h2>CEO Statement</h2>
        <div class="ceo_info_images">
        <img class="modal_image" src="/static/images/daniel2.jpg" alt="">
        </div>
        <div class="modal_text_container">
          <p class="modal_text" v-html="$t('ceo_statement.text1')"></p>
        </div>
        <div class="modal_text_container">
          <p class="modal_text" v-html="$t('ceo_statement.text2')"></p>
        </div>
        <div class="modal_text_container">
          <p class="modal_text" v-html="$t('ceo_statement.text3')"></p>
        </div>
        <div class="modal_text_container">
          <p class="modal_text">
            CEO
            Daniel Beyerle
          </p>
        </div>
      </div>

      <div class="modal_info" v-if="props.index === 86">
        <h2>References</h2>
        <div class="modal_text_container">
        <p>
          {{$t('references.text1')}}
        </p>
        </div>
        <div class="images_container">
          <img class="reference_image" src="/static/images/references1.jpg" alt="">
          <img class="reference_image" src="/static/images/references2.jpg" alt="">
        </div>
        <div class="modal_text_container">
          <p class="modal_text">
            {{$t('references.text2')}}   </p>
        </div>
        <div class="images_container">
          <img class="reference_image" src="/static/images/references3.jpg" alt="">
          <img class="reference_image" src="/static/images/references4.jpg" alt="">
        </div>
      </div>
      <div class="modal_info" v-if="props.index === 190">
        <h2>Unsere Vision</h2>
        <div class="images_container">
          <img class="vision_image" src="/static/images/unsere_vision1.jpg" alt="">
        </div>
        <div class="modal_text_container">
          <p class="modal_text" v-html="$t('our_vision.text')"></p></div>
      </div>
      <div class="modal_info" v-if="props.index === 200">
        <h2>{{$t('our_mission.title')}}</h2>
        <div class="images_container">
          <img class="vision_image" src="/static/images/unsere_vision2.jpg" alt="">
        </div>
        <div class="modal_text_container">
          <p class="modal_text" v-html="$t('our_mission.text1')"></p>
        </div>
        <div class="modal_text_container">
          <p class="modal_text" v-html="$t('our_mission.text2')"></p>
        </div>
      </div>
      <div class="modal_info" v-if="props.index === 156">
        <h2>{{$t('our_expertise.title')}}</h2>

        <p class="expertise_title">{{$t('our_expertise.design')}}</p>
        <div class="expertise_container">
          <img class="expertise_image" src="/static/images/unsere_expertiese1.jpg" alt="">
          <p class="expertise_text_container">
            <p class="modal_text">{{$t('our_expertise.design_text1')}}</p>
            <p class="modal_text">
              {{$t('our_expertise.design_text2')}}</p>
          </p>
        </div>
        <p class="expertise_title">{{$t('our_expertise.ansprechpartner')}}</p>
        <div class="expertise_container">
          <img class="expertise_image" src="/static/images/unsere_expertiese2.jpg" alt="">
          <p class="expertise_text_container">
            <p class="modal_text">{{$t('our_expertise.ansprechpartner_text1')}}
            </p>
            <p class="modal_text">
              {{$t('our_expertise.ansprechpartner_text2')}}</p>
          </p>
        </div>
        <p class="expertise_title">{{$t('our_expertise.messebau')}}</p>
        <div class="expertise_container">
          <img class="expertise_image" src="/static/images/unsere_expertiese3.jpg" alt="">
          <p class="expertise_text_container">
            <p class="modal_text">{{$t('our_expertise.messebau_text')}}</p>
          </p>
        </div>
        <p class="expertise_title">{{$t('our_expertise.events')}}</p>
        <div class="expertise_container">
          <img class="expertise_image" src="/static/images/unsere_expertiese4.jpg" alt="">
          <p class="expertise_text_container">
            <p class="modal_text">{{$t('our_expertise.events_text')}}</p>
          </p>
        </div>
      </div>


      <div class="modal_info" v-if="props.index === 132">
        <h2>{{$t('product.title')}}</h2>
        <div class="images_container">
          <img style="width: 80%"  src="/static/images/produkt.jpg" alt="">
        </div>
        <div class="modal_text_container">
          <p class="modal_text">
            {{$t('product.text')}}
          </p>
        </div>

      </div>
      <div class="modal_info" v-if="props.index === 92">

        <h2>World wide network</h2>
        <div class="modal_text_container">
          <p class="modal_text">{{$t('world_wide_network.text')}}</p>
        </div>
        <div class="images_container">
          <img style="width: 90%"  src="/static/images/world.png" alt="">
        </div>


      </div>

      <div class="modal_info" v-if="props.index === 105">
        <h2>Heritage</h2>
        <div class="heritage_container">
          <img class="heritage_image" src="/static/images/heritage1.jpg" alt="">
          <div class="heritage_text_container">
            <p class="heritage_text">Alles begann als Thomas Dieter Beyerle <strong style="font-size: 30px">1995</strong> die Vision hatte, Räume zu gestalten und zu schaffen, in denen Begegnungen stattfinden können und bei denen Emotionen geweckt werden. Dies war der Startschuss für   </p>
            <p style="margin: 100px auto; font-size: 20px" >T.B. Bühnen + Messebau</p>
          </div>
        </div>
        <div class="arrow_right">
          <AnimatedArrow/>
        </div>
        <div class="heritage_info" style="margin-left: 500px">
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px">
            <p style="font-size: 30px" class="heritage_text">1997</p>
            <img class="heritage_image" style="width: 120px" src="/static/images/heritage2.png" alt="">
          </div>
          <p style="font-size: 24px" class="heritage_text">Aus T.B. Bühnen + Messebau wurde die 3B Kreative GbR</p>
        </div>
        <div class="arrow_left">
          <AnimatedArrow/>
        </div>
        <div class="heritage_info" style="margin-left: -500px">
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px">
            <p style="font-size: 30px" class="heritage_text">2003</p>
            <img class="heritage_image" style="width: 120px" src="/static/images/heritage3.jpg" alt="">
          </div>
          <p style="font-size: 24px" class="heritage_text">Danach ging die Reise alleine weiter, unter der Creative T.B. Systems Design</p>
        </div>
        <div class="arrow_right">
          <AnimatedArrow/>
        </div>
        <div class="heritage_info" style="margin-left: 500px">
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px">
            <p style="font-size: 30px" class="heritage_text">2011</p>
            <img class="heritage_image" style="width: 200px" src="/static/images/heritage4.png" alt="">
          </div>
          <p style="font-size: 24px" class="heritage_text">Es folgte die Umschreibung in eine Kapitalgesellschaft als Creative T.B. System Design GmbH als logischer Handlungsschritt, nachdem die Geschäfte weitergewachsen waren.</p>
        </div>

        <div class="arrow_left">
          <AnimatedArrow/>
        </div>
        <div class="heritage_info" style="margin-left: -500px">
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px">
            <p style="font-size: 30px; width: 100%" class="heritage_text">2024</p>
          </div>
          <p style="font-size: 24px" class="heritage_text">Es folgte die Umschreibung in eine Kapitalgesellschaft als Creative T.B. System Design GmbH als logischer Handlungsschritt, nachdem die Geschäfte weitergewachsen waren.</p>
          <img class="heritage_image" style="width: 350px" src="/static/images/heritage5.png" alt="">
        </div>

      </div>
      <button class="close_button" @click="closeModal"><img src="/static/close.svg" alt=""></button>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, defineEmits } from 'vue';

const props = defineProps({
  index: Number,
  isVisible: Boolean
});
const emit = defineEmits(['update:isVisible']);
const modalContentRef = ref(null);
let observer;

function closeModal() {
  emit('update:isVisible', false);
}

watch(() => props.isVisible, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : '';
  nextTick(() => {
    if (newValue && modalContentRef.value) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-enter-to');
          }
        });
      }, {
        root: modalContentRef.value,
        threshold: 0.35,
        rootMargin: "0px"
      });

      const elements = modalContentRef.value.querySelectorAll('.heritage_arrow, .modal_info, .modal_text, .modal_text, .modal_image, .images_container, .expertise_image, .expertise_container, .expertise_title, .expertise_text_container, .vision_image, .heritage_container, .heritage_text_container, .heritage_text, .heritage_arrow, .heritage_image, .ceo_info_images, .reference_image, .arrow_left, .arrow_right' );
      elements.forEach(el => observer.observe(el));
    }
  });
});

onMounted(() => {
  document.body.style.overflow = props.isVisible ? 'hidden' : '';
});

onUnmounted(() => {
  document.body.style.overflow = '';
  if (observer) observer.disconnect();
});
</script>

<style scoped>
p, h2 {
  color: #fff;
  font-family: Century Gothic, sans-serif;
  margin: 0;
}
.heritage_text {
  font-size: 20px;
  width: 75%;
  text-align: center;
  max-width: 40%;
}

.heritage_info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.heritage_text_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 30%;
}

.heritage_arrow > img {
  height: 80px;
}

.arrow_right {
  margin-left: -220px
}
.arrow_left {
  margin-left: 200px;
  transform: rotateY(180deg);
}

.heritage_container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.expertise_title {
  margin-bottom: -30px;
  font-size: 18px;
  transition: opacity 1s ease-out;
}

.expertise_container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 80%;
}

.expertise_text_container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.expertise_image {
  width: 50%;
  border-radius: 5%;
  object-fit: cover;
}

.vision_image {
  width: 85%;
  border-radius: 5%;
  object-fit: cover;
}

.images_container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.reference_image {
  width: 40%;
  border-radius: 5%;
  object-fit: cover;
}

.modal_text_container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  gap: 20px;
}

.modal_text {
  font-size: 18px;
  line-height: 1.5;
}

.modal_image {
  width: 300px;
  height: 500px;
  border-radius: 5%;
  object-fit: cover;
}

.ceo_info_images {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}


.modal_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.modal-container {
  position: fixed;
  bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  z-index: 1000000 !important;
}

.modal-content {
  background-color: #303030;
  padding: 50px;
  border-radius: 10px;
  height: 68vh;
  width: 80%;
  overflow-y: auto;
}


.modal-enter-active, .modal-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.modal-enter-from, .modal-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.modal-enter-to, .modal-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.close_button > img {
  width: 20px;
  height: 20px;
  color: #fff;
}

.close_button {
  position: absolute;
  top: 10px;
  right: 10%;

  background-color: #303030;
  color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

img {
  border-radius: 5px;
}


.modal-content::-webkit-scrollbar {
  width: 10px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px; /* Увеличенный радиус для более круглых углов */
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px; /* Увеличенный радиус для более круглых углов */
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.fade-enter-to, .fade-enter-active {
  opacity: 1;
  transition: opacity 2s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transition: opacity 2s ease-out;
}

.modal_info, .modal_text, .modal_image, .images_container, .arrow_right, .arrow_left .expertise_container, .expertise_title, .expertise_text_container, .expertise_image, .vision_image, .heritage_container, .heritage_text_container, .heritage_text, .heritage_arrow, .heritage_image, .ceo_info_images, .reference_image{
  opacity: 0;
  transition: opacity 2s ease-out;
}

.fade-enter-to {
  opacity: 1 !important; /* Используйте !important для переопределения предыдущих стилей, если это необходимо */
  transition: opacity 2s ease-out;
}

.colored_text {
  font-weight: bold;
  color: #00ffff;
}
</style>
