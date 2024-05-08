<template>
  <div class="eb_container">
    <div class="eb_image">
      <img src="/static/images/unsere_expertiese3.jpg" alt="">
    </div>

    <div class="eb_first_column">

    </div>
    <div class="eb_second_column">
      <div class="eb_first_row">
        <div class="eb_null_column"></div>
        <div class="eb_info_column">
          <h1 class="eb_text" v-html="$t('product.title')"></h1>
          <h2 class="eb_text" v-html="$t('product.subtitle')"></h2>
          <p class="eb_text" v-html="$t('product.text1')"></p>
        </div>
      </div>
      <div  class="eb_second_row">
        <p class="eb_text" v-html="$t('product.text2')"></p>
      </div>
    </div>
  </div>

</template>
<style scoped>
.eb_container {
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;

  background-image: url("/assets/c3expoback.png");
  background-size: 58%;
  background-position: top -20% left 70%;
  background-repeat: no-repeat;

}

.eb_image {
  position: absolute;
}

.eb_image img {
  width: 65%;
  padding-bottom: 2px;
  border-bottom: 1px solid #36e4da;
}

.eb_first_column {
  flex: 35%;
}
.eb_second_column {
  flex: 65%;
  display: flex;
  flex-direction: column;
  z-index: 300;
  width: 100%;
}

.eb_first_row {
  display: flex;
}

.eb_null_column {
  flex: 60%;
}
.eb_info_column {
  flex: 40%;
  display: flex;
  flex-direction: column;
  margin-right: 5%;
  gap: 50px;
  margin-top: 7%;
}


.eb_info_column h1 {
  font-size: 73px;
  font-family: "Century Gothic", sans-serif;
  color: #fff;
}

.eb_info_column h2 {
  font-size: 26px;
  font-family: "Century Gothic", sans-serif;
  color: #fff;
}

.eb_text {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  font-size: 20px;
  margin: 0;
  line-height: 1.5;
}
@media (max-width: 768px) {
  .eb_container {
    flex-direction: column;
    align-items: center;
  }

  .eb_image {
    position: relative;
    width: 100%;
    margin-top: 20%;
  }

  .eb_image img {
    position: relative;
    width: 100%;

  }

  .eb_first_column {
    display: none;
    margin: 0 20px;
  }

  .eb_second_column {
    margin: 0 20px;
    padding-top: 50px;
    width: 90%;
  }

  .eb_first_row {
    flex-direction: column;
  }

  .eb_null_column {
    display: none;
  }

  .eb_info_column {
    flex: 100%;
    margin-right: 0;
  }

  .eb_info_column h1 {
    font-size: 48px;
  }

  .eb_info_column h2 {
    font-size: 22px;
  }

  .eb_text {
    font-size: 18px;
  }
}

@media (max-width: 1366px) {
  .eb_info_column h1 {
    font-size: 60px;
  }

  .eb_info_column h2 {
    font-size: 24px;
  }

  .eb_text {
    font-size: 18px;
  }

  .eb_null_column {
    display: none;
  }

  .eb_info_column {
    flex: 40%;
    display: flex;
    flex-direction: column;
    margin-right: 5%;
    align-items: flex-end;
    gap: 50px;
    margin-top: 18%;
  }

  .eb_container {
    display: flex;
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    flex-direction: column;
  }
  .eb_text {
    padding: 0 30px;
  }
}
</style>
<script setup lang="ts">
</script>