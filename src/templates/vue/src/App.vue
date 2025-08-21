<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      height="125"
      src="@/assets/vue.svg"
      width="125" />

    <div class="wrapper">
      <HelloWorld />
      <div class="actions">
        <RouterLink
          class="action-button"
          to="/">
          开始使用
        </RouterLink>
        <RouterLink
          class="action-button secondary"
          to="/about">
          了解更多
        </RouterLink>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import HelloWorld from '@/components/HelloWorld.vue';
</script>

<style lang="less" scoped>
header {
  max-height: 100vh;
  padding: 2rem 0;
  line-height: 1.5;

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      gap: 1rem;
    }

    .action-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      color: white;
      text-decoration: none;
      background-color: hsl(160deg 100% 37% / 100%);
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background-color: hsl(160deg 100% 30% / 100%);
        transform: translateY(-2px);
      }

      &.secondary {
        color: hsl(160deg 100% 37% / 100%);
        background-color: transparent;
        border: 1px solid hsl(160deg 100% 37% / 100%);

        &:hover {
          background-color: rgb(235 235 235 / 20%);
        }
      }
    }
  }
}
</style>
