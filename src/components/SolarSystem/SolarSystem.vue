<template>
  <div class="dashboard">
    <h2>Solar System with Distances</h2>

    <!-- Solar System -->
    <div class="solar-system">
      <div class="sun"></div>
      <div v-for="planet in planets"
           :key="planet.name"
           class="orbit"
           :style="{ animationDuration: `${planet.period}s` }">
        <div class="planet"
             :style="{
               backgroundColor: planet.color,
               width: `${planet.size}px`,
               height: `${planet.size}px`
             }">
        </div>
      </div>
    </div>

    <!-- Distance Chart -->
    <div class="chart">
      <VisXYContainer
          :data="distanceData"
          :yDomain="[0, 370]"
          :margin="{ top: 20, bottom: 50, left: 40, right: 50 }"
      >
        <VisLine
            v-for="planet in planetsExceptEarth"
            :key="planet.name"
            :x="d => d.time"
            :y="d => d[planet.name]"
            :color="planet.color"
        />
        <VisAxis type="x" :gridLine="false" :tickFormat="formatToMonth" label="Time"/>
        <VisAxis type="y" :gridLine="false" label="Distance (million km)"/>
      </VisXYContainer>
    </div>
  </div>
</template>

<script lang="ts" src="./SolarSystem.ts"></script>
<style scoped src="./SolarSystem.css"></style>