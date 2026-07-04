<script setup lang="ts">
const games = [
  {
    title: "Star Blaster",
    description:
      "Star Blaster is a fast-paced 2D space shooter built with Unity. Dodge enemy fire, destroy incoming waves of ships, and survive as long as possible in an arcade-style experience.",
    genre: "Shooter",
    route: "/games/StarBlaster",
  },
  {
    title: "The Valkyrie",
    description:
      "The Valkyrie is a 2D action-adventure platformer built in Unity. Explore handcrafted levels, overcome platforming challenges, and battle enemies while mastering movement mechanics.",
    genre: "Platformer",
    route: "/games/TheValkyrie",
  },
  {
    title: "Rocket Booster",
    description:
      "Rocket Booster is a physics-based 3D space flight game built with Unity. Pilot your rocket through increasingly difficult levels, carefully controlling thrust and rotation while avoiding hazards and obstacles. The project showcases Unity physics, particle effects, audio, Cinemachine cameras, lighting, post-processing, and level design to create a polished gameplay experience.",
    genre: "Physics • Space • Arcade",
    route: "/games/RocketBooster",
  },
];
</script>

<template>
  <v-container class="pa-6 my-16 pt-5">
    <h1 class="text-h4 mb-6">🎮 My Unity Games</h1>

    <v-row>
      <v-col v-for="game in games" :key="game.title" cols="12" md="4">
        <v-card class="glass-card pa-4 fill-height">
          <v-card-title class="text-h5">
            {{ game.title }}
          </v-card-title>

          <v-divider class="glass-divider" />

          <v-card-text class="d-flex flex-column">
            <p>
              {{ game.description }}
            </p>

            <div class="mt-4">
              <span class="glass-chip">
                {{ game.genre }}
              </span>
            </div>
          </v-card-text>

          <v-spacer />

          <v-card-actions>
            <v-btn class="glass-btn" :to="game.route"> Play Now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
