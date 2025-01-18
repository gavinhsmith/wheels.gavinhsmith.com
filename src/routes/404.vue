<script setup lang="ts">
function mouseOver() {
  const hidables = document.getElementsByClassName("hideOnHover");

  for (let i = 0; i < hidables.length; i++) {
    hidables[i].classList.add("opacity-0");
  }

  (<HTMLDivElement>(
    document.getElementsByClassName("main")[0]
  )).style.backgroundImage = 'url("/assets/images/eye.png")';
}

function mouseLeave() {
  const hidables = document.getElementsByClassName("hideOnHover");

  for (let i = 0; i < hidables.length; i++) {
    hidables[i].classList.remove("opacity-0");
  }

  (<HTMLDivElement>(
    document.getElementsByClassName("main")[0]
  )).style.backgroundImage = 'url("/assets/images/tv_static.gif")';
}
</script>

<template>
  <div
    ref="backgroundImage"
    class="main w-full h-full flex flex-col justify-center items-center text-white overflow-hidden"
  >
    <div class="max-h-96">
      <h1 class="hideOnHover text-4xl">404</h1>
      <p class="ml-52 mt-32">
        <span class="hideOnHover">The only way to find home is to </span>
        <RouterLink @mouseover="mouseOver" @mouseleave="mouseLeave" to="/home"
          >look</RouterLink
        >
        <span class="hideOnHover">. Some people never do.</span>
      </p>
      <div class="hideOnHover mt-24 ml-8 flex flex-col items-end">
        <p>THEY SURE WISH THEY DID NOW ! ! ! !</p>
        <p>THEY SURE WISH THEY DID NOW ! ! ! !</p>
        <p class="italic">THEY SURE WISH THEY DID NOW ! ! ! !</p>
        <p class="italic text-lg">THEY SURE WISH THEY DID NOW ! ! ! !</p>
        <p class="italic text-lg">THEY SURE WISH THEY DID NOW ! ! ! !</p>
        <p class="italic text-xl">THEY SURE WISH THEY DID NOW ! ! ! !</p>
        <p class="italic text-xl">THEY SURE WISH THEY DID NOW ! ! ! !</p>
        <p class="italic text-2xl text-red-500">
          THEY SURE WISH THEY DID NOW ! ! ! !
        </p>
        <p class="italic text-3xl text-red-500">
          THEY SURE WISH THEY DID NOW ! ! ! !
        </p>
        <p class="italic text-4xl text-red-700">
          THEY SURE WISH THEY DID NOW ! ! ! !
        </p>
        <p class="italic text-5xl text-red-800">
          THEY SURE WISH THEY DID NOW ! ! ! !
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: #000000;
  background-image: url("/assets/images/tv_static.gif");
  background-position: center;
}
</style>
