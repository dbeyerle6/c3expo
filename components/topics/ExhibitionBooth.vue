<template>
  <div class="eb_container">
    <div>
    <div class="eb_image">
      <img src="/static/images/unsere_expertiese3.jpg" alt="">
    </div>
    <div class="eb_info_column">
      <h1 class="eb_title" v-html="$t('product.title2')"></h1>
      <h2 class="eb_subtitle" v-html="$t('product.subtitle')"></h2>
      <p class="eb_text" v-html="$t('product.text1')"></p>
    </div>
    </div>
    <div  class="eb_second_row">
      <p class="eb_text" v-html="$t('product.text2')"></p>
    </div>
    <span class="gradient_background"></span>
  </div>

</template>
<style scoped>

.gradient_background {
  position: absolute;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(93,90,90,1) 24%, rgba(59,58,58,1) 100%);
  width: 73%;
  z-index: 1;
  height: 100%;
  right: 0;
  margin-top: 100px;
}

.eb_container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-image: url("/assets/c3expoback.png");
  background-size: 20%;
  background-position: bottom -30% left 5% ;
  background-repeat: no-repeat;

}
.eb_container > div {
  display: flex;
  flex-direction: row;
}

.eb_info_column, .eb_second_row, .eb_image {
  z-index: 5;
}

.eb_image {
  width: 65%;
  margin: 100px 40px 20px 0;
}

.eb_image img {
  width: 100%;
  padding-bottom: 2px;
  border-bottom: 1px solid #36e4da;
}


.eb_text {
  text-align: justify;
}

.eb_second_row {
  margin-right: 5%;
  display: flex;
  justify-content: flex-end;
}

.eb_second_row > p {
  width: 70%;
}



.eb_first_column {
  flex: 38%;
}
.eb_second_column {
  flex: 62%;
  display: flex;
  flex-direction: column;
  z-index: 300;
  width: 100%;
}

.eb_first_row {
  display: flex;
}

.eb_null_column {
  width: 50%;
  height: 500px;
}
.eb_info_column {
  flex: 40%;
  display: flex;
  flex-direction: column;
  margin-right: 5%;
  gap: 20px;
  margin-top: 200px;
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

.eb_title {
  margin: 0;
}

.eb_text {
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  font-size: 20px;
  margin: 0;
  line-height: 1.5;
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

@media (max-width: 768px) {
  .eb_container {
    flex-direction: column;
    align-items: center;
    background-image: url("/assets/c3expoback.png");
    background-size: 58%;
    background-position: top -20% left 70%;
    background-repeat: no-repeat;
  }
  .eb_image {
    width: 100%;
  }

  .eb_image > img {
    width: 100%;
  }

  .eb_container > div {
    display: flex;
    flex-direction: column;
  }
  .gradient_background {
    width: 100%;
    min-height: 1300px;
    height: 100%;
  }

  .eb_info_column {
    flex: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    align-items: flex-start;
    gap: 50px;
  }

  .eb_title, .eb_subtitle {
    padding: 0 30px;
    margin: 0;
  }

  .eb_second_row > p {
    width: 90%;
  }

}
</style>
<script setup lang="ts">
</script>