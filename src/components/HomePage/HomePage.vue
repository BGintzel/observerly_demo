<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <div class="hero-image">
          <img src="/src/assets/logo.png" alt="Solar System Icon" width="200"/>
        </div>

        <h1>Solar System</h1>
        <p class="hero-description">
          Journey through our cosmic neighborhood with a visualizations
          of planetary orbits and distances
        </p>
        <button @click="showVisualization = true" class="cta-button">
          Launch Observatory
        </button>
        <p class="small-text">created in vue and unovis</p>
      </div>
      <div class="hero-background"></div>
    </div>

    <Transition name="modal">
      <div v-if="showVisualization" class="modal-overlay">
        <div class="modal-content">
          <button @click="showVisualization = false" class="close-button">
            ×
          </button>
          <TechTrendsVisualization />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>
<style scoped src="./home.css"></style>