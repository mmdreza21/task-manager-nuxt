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
    title: "Star Blaster",
    description:
      "Fast-paced space shooter in a 3D environment with 2D movement. Dodge enemy fire, destroy waves of ships, and survive in an arcade-style experience.",
    genre: "Shooter • Arcade",
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
  <v-container class="pa-6 my-16 pt-5">
    <h1 class="text-h4 mb-6">🎮 My Unity Games</h1>

    <v-row>
      <v-col v-for="game in games" :key="game.title" cols="12" md="4">
        <v-card
          class="glass-card pa-4 fill-height d-flex flex-column justify-space-between"
        >
          <v-card-title class="text-h5">
            {{ game.title }}
          </v-card-title>

          <v-divider class="glass-divider" />

          <v-card-text class="d-flex flex-column">
            <p>
              {{ game.description }}
            </p>
          </v-card-text>

          <v-spacer />

          <v-card-actions
            class="d-flex flex-column align-start justify-space-between"
          >
            <div>
              <div class="my-4">
                <span class="glass-chip">
                  {{ game.genre }}
                </span>
              </div>
            </div>
            <v-btn class="glass-btn" :to="game.route"> Play Now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
