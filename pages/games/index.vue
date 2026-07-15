<script setup lang="ts">
const games = [
  {
    title: "Echoes of Eldoria",
    description:
      "Echoes of Eldoria is a 2D top-down action RPG built with Unity. Explore handcrafted environments, battle enemies in real-time combat, discover weapons and inventory upgrades, travel seamlessly between areas, and face challenging bullet-hell encounters. The project showcases scalable game architecture, combat systems, scene transitions, lighting, inventory management, and polished gameplay mechanics.",
    genre: "Action RPG",
    route: "/games/EchoesOfEldoria",
  },
  {
    title: "Rocket Booster",
    description:
      "Rocket Booster is a physics-based 3D space flight game built with Unity. Pilot your rocket through increasingly difficult levels, carefully controlling thrust and rotation while avoiding hazards and obstacles. The project showcases Unity physics, particle effects, audio, Cinemachine cameras, lighting, post-processing, and level design to create a polished gameplay experience.",
    genre: "Physics • Space • Arcade",
    route: "/games/RocketBooster",
  },
  {
    title: "The Valkyrie",
    description:
      "The Valkyrie is a 2D action-adventure platformer built in Unity. Explore handcrafted levels, overcome platforming challenges, and battle enemies while mastering movement mechanics.",
    genre: "Platformer",
    route: "/games/TheValkyrie",
  },
  {
    title: "Tilemania",
    description:
      "A 2D platformer with classic tile-based level design. Climb, avoid hazards, collect coins, and defeat enemies in this action-packed adventure.",
    genre: "Platformer • Action • Adventure",
    route: "/games/Tilemania",
  },
  {
    title: "Star Blaster",
    description:
      "Star Blaster is a fast-paced 2D space shooter built with Unity. Dodge enemy fire, destroy incoming waves of ships, and survive as long as possible in an arcade-style experience.",
    genre: "Shooter",
    route: "/games/StarBlaster",
  },
];
</script>

<template>
  <v-container class="pa-6 pt-5">
    <div class="d-flex align-center mb-6">
      <v-icon color="primary" size="40" class="mr-3"
        >mdi-gamepad-variant</v-icon
      >
      <h1 class="text-h5 font-weight-bold text-white">My Unity Games</h1>
    </div>

    <v-row>
      <v-col v-for="game in games" :key="game.title" cols="12" md="6" lg="4">
        <v-card
          color="#1a1a1a"
          class="pa-4 fill-height d-flex flex-column"
          elevation="2"
          rounded="lg"
          border
        >
          <v-card-title class="text-h5 font-weight-bold text-white pa-0 mb-2">
            {{ game.title }}
          </v-card-title>

          <v-divider color="#333" class="mb-3" />

          <v-card-text class="pa-0 flex-grow-1">
            <p class="text-grey">
              {{ game.description }}
            </p>
          </v-card-text>

          <v-divider color="#333" class="my-3" />

          <v-card-actions
            class="pa-0 d-flex align-center justify-space-between"
          >
            <v-chip
              color="primary"
              size="small"
              class="text-white"
              variant="tonal"
            >
              {{ game.genre }}
            </v-chip>

            <v-btn
              color="primary"
              variant="elevated"
              size="small"
              :to="game.route"
            >
              <v-icon start size="18">mdi-play</v-icon>
              Play Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-grey {
  color: #888888 !important;
}

:deep(.v-card) {
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

:deep(.v-card:hover) {
  transform: translateY(-4px);
  border-color: #7c3aed !important;
}

:deep(.v-chip--variant-tonal) {
  background: rgba(124, 58, 237, 0.12) !important;
}

:deep(.v-btn--variant-elevated) {
  text-transform: none !important;
  font-weight: 500 !important;
}

:deep(.v-btn--variant-elevated:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4) !important;
}
</style>
