<template>
  <div>
    <NuxtPage />
  </div>
</template>
<style>
body {
  margin: 0 !important;
  background-color: #000;
}


body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px; /* Увеличенный радиус для более круглых углов */
}

body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>