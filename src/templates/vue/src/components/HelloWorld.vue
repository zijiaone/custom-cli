<template>
  <div class="greetings">
    <h3>
      前端标准化开发模板，基于
      <a
        href="https://vitejs.dev/"
        rel="noopener"
        target="_blank">
        Vite
      </a>
      +
      <a
        href="https://vuejs.org/"
        rel="noopener"
        target="_blank">
        Vue 3
      </a>
      +
      <a
        href="https://www.typescriptlang.org/"
        rel="noopener"
        target="_blank">
        TypeScript
      </a>
      构建，开箱即用。
    </h3>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.greetings {
  h3 {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    text-align: center;
  }

  a {
    padding: 3px;
    color: hsl(160deg 100% 37% / 100%);
    text-decoration: none;
    transition: 0.4s;
  }
}
</style>
