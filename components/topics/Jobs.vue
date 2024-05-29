<template>
  <div class="jobs_container">
    <div class="jobs_header">
      <div class="jobs_title">
        <h1>You want to join the Team?
        </h1>
      </div>
      <div class="jobs_image"><img src="/static/images/jobs.jpg" alt=""></div>
    </div>
    <div class="jobs_content">
      <div class="jobs_info">
        <div class="jobs_subtitle">
          <h2>Welcome to C³ Expo
          </h2>
        </div>
        <div class="jobs_text"><p>{{ $t('jobs.text1') }}</p></div>
        <div class="jobs_text"><p>{{ $t('jobs.text2') }}</p></div>
        <div class="jobs_email"><a href="mailto:someone@yoursite.com">jobs@c3expo.de
        </a> </div>
      </div>
      <div class="jobs_vacancies">
        <div class="jobs_subtitle"><h2>{{ $t('jobs.subtitle') }}</h2></div>
        <div class="jobs_wrapper">
          <div class="jobs_job" @click="openPDF('vacancies.project_manager')"><p>(Senior) – Project Manager (m/f/d)
          </p></div>
          <div class="jobs_job" @click="openPDF('vacancies.spatial_designer')"><p>Spatial Designer (m/f/d)
          </p></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
p, h1, h2, a {
  font-family: "Century Gothic", sans-serif;
  color: #fff;
}

h2 {
  font-size: 30px;
}

.jobs_email > a {
  color: #36e4da;
  font-weight: bold;
}

.jobs_text {
  text-align: justify;
  width: 95%;
}

.jobs_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 140px;
}

.jobs_header {
  flex: 40%;
  display: flex;
  border-bottom: 1px solid #36e4da;
}

.jobs_title {
  width: 50%;
}

.jobs_title > h1 {
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 80px;
  width: 60%;

}

.jobs_image {
  width: 50%;
}

.jobs_image > img {
  width: 100%;
}

.jobs_wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.jobs_content {
  flex: 60%;
  display: flex;
  padding: 0 5% 50px 5%;
  justify-content: space-between;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(107, 105, 105, 1) 100%);
}

.jobs_info {
  flex: 50%;
}

.jobs_vacancies {
  flex: 50%;
}

.jobs_content {
  display: flex;
  gap: 20px;
}

.jobs_job {
  height: 40px;
  width: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(59, 58, 58, 1) 100%);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.jobs_job > p {
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
  color: #36e4da;
}

@media (max-width: 768px) {
  .jobs_container {
    margin-top: 100px;
  }

  .jobs_title > h1 {
    font-size: 40px;
    margin-left: 20px;
    width: 80%;
  }

  .jobs_title {
    width: 100%;
  }

  .jobs_header {
    flex-direction: column;
  }

  .jobs_image {
    width: 100%;
  }

  .jobs_content {
    flex-direction: column;
    padding: 0 5% 50px 5%;
  }

  .jobs_info {
    flex: 100%;
  }

  .jobs_vacancies {
    flex: 100%;
  }

  .jobs_text {
    width: 100%;
  }

  .jobs_job {
    height: 60px;
  }

  .jobs_job > p {
    font-size: 20px;
  }

}
@media screen and (min-device-width: 768px) and (max-device-width: 1366px) {

  .jobs_header {
    flex-direction: column;
  }
  .jobs_content {
    flex-direction: column;
  }
  .jobs_image {
    width: 100%;
  }
  .jobs_title {
    width: 100%;
  }
}
</style>
<script setup lang="ts">

const { t, locale } = useI18n();
function openPDF(translationKey: string) {
  const pdfUrl = t(translationKey);
  window.open(pdfUrl, '_blank');
}
</script>