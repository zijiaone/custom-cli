<template>
  <main>
    <div class="container">
      <section class="section">
        <p>模板提供了一套完整的开发环境和工具链，帮助您快速开始新项目开发。</p>
        <div class="cards">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="card">
            <div class="card-icon">{{ card.icon }}</div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
const cards = [
  {
    icon: '📁',
    title: '项目结构',
    description: '清晰的目录结构，遵循Vue最佳实践，便于团队协作和代码维护。',
  },
  {
    icon: '🚀',
    title: '快速开发',
    description: '内置Vue Router、Pinia、国际化和HTTP请求等功能，加速开发流程。',
  },
  {
    icon: '🔧',
    title: '工具配置',
    description: '集成了TypeScript、代码检查、格式化、Git提交规范等工具，确保代码质量和类型安全。',
  },
];
</script>

<style lang="less" scoped>
main {
  padding: 2rem 0;

  .container {
    max-width: 1000px;
    padding: 0 1rem;
    margin: 0 auto;

    .section {
      margin-bottom: 3rem;

      h2 {
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
        color: #333;
        text-align: center;
      }

      > p {
        max-width: 700px;
        margin: 0 auto 2rem;
        line-height: 1.6;
        color: #555;
        text-align: center;
      }
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .card {
      padding: 1.5rem;
      background-color: rgb(235 235 235 / 20%);
      border-radius: 8px;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgb(0 0 0 / 10%);
      }

      .card-icon {
        margin-bottom: 1rem;
        font-size: 2.5rem;
      }

      h3 {
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
        color: hsl(160deg 100% 37% / 100%);
      }

      p {
        line-height: 1.5;
        color: #555;
      }
    }
  }
}
</style>
