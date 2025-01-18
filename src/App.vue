<template>
  <div class="absolute left-1 top-1 p-2 bg-slate-300 bg-opacity-80">
    <p>Debug</p>
    <p>
      <span><strong>Current Route:</strong> {{ $route.fullPath }}</span>
    </p>
    <div class="grid grid-cols-3 gap-2 w-48">
      <RouterLink to="/">ENT</RouterLink>
      <RouterLink to="/home">HME</RouterLink>
      <RouterLink to="/about">ABT</RouterLink>
    </div>
  </div>
  <div class="content lg:content-desktop">
    <RouterView />
  </div>
</template>

<style>
@font-face {
  font-family: PixelComicSans;
  src: url("/assets/fonts/PixelComicSans.ttf");
}
</style>
