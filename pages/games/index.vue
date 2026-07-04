<template>
  <v-container class="pa-6 my-16 pt-5">
    <h1 class="text-h4 mb-6">🎮 My Unity Games</h1>

    <v-row>
      <!-- Star Blaster Navigation Card -->
      <v-col cols="12" md="4">
        <v-card class="glass-card pa-4">
          <v-card-title class="text-h5"> Star Blaster </v-card-title>

          <v-divider class="glass-divider"></v-divider>

          <v-card-text>
            <p>
              Star Blaster is a top-down 2D Space Shooter built with Unity.Fast
              arcade gameplay focused on dodging enemy fire and blasting through
              waves of ships
            </p>

            <div class="mt-4">
              <span class="glass-chip ml-2">Shooter</span>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="glass-btn" to="/games/StarBlaster"> Play Now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- The Valkyrie Navigation Card -->

      <v-col cols="12" md="4">
        <v-card class="glass-card pa-4">
          <v-card-title class="text-h5"> The Valkyrie </v-card-title>

          <v-divider class="glass-divider"></v-divider>

          <v-card-text>
            <p>
              The Valkyrie is a 2D action-adventure platformer created in my
              free time. Explore levels, defeat enemies, and overcome classic
              platforming challenges.
            </p>

            <div class="mt-4">
              <span class="glass-chip">Platformer</span>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="glass-btn" to="/games/TheValkyrie"> Play Now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="glass-card pa-4">
          <v-card-title class="text-h5"> Rocket Booster </v-card-title>

          <v-divider class="glass-divider"></v-divider>

          <v-card-text>
            <p>
              The Valkyrie is a 2D action-adventure platformer created in my
              free time. Explore levels, defeat enemies, and overcome classic
              platforming challenges.
            </p>

            <div class="mt-4">
              <span class="glass-chip">Platformer</span>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="glass-btn" to="/games/RockerBooster">
              Play Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>
