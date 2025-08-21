<template>
  <div class="about">
    <div class="content">
      <section class="section">
        <h2>项目介绍</h2>
        <p>
          这是一个基于 Vue 3 + Vite
          的前端标准化模板项目，旨在为开发团队提供一个开箱即用的前端开发框架，统一技术栈和开发规范，提高开发效率。
        </p>
      </section>

      <section class="section">
        <h2>快速开始</h2>
        <div class="code-block">
          <pre>
            <code>
# 安装依赖
npm install

# 开发环境启动
npm run dev

# 生产环境构建
npm run build
            </code>
          </pre>
        </div>
      </section>

      <section class="section">
        <h2>开发规范</h2>
        <p>
          项目集成了 ESLint、Prettier 和 Stylelint 进行代码规范和格式化，使用 Simple Git Hooks 和 Commitlint 规范化 Git
          提交信息，确保团队代码风格的一致性。
        </p>
      </section>

      <div class="back-link">
        <RouterLink to="/">返回首页</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="less" scoped>
.about {
  max-width: 800px;
  padding: 2rem 1rem;
  margin: 0 auto;

  .content {
    padding: 2rem;
    background-color: rgb(235 235 235 / 20%);
    border-radius: 8px;

    .section {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }

      h2 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: #333;
      }

      p {
        line-height: 1.6;
        color: #555;
      }

      .code-block {
        padding: 1rem;
        overflow-x: auto;
        background-color: #f5f5f5;
        border-radius: 4px;

        pre {
          margin: 0;

          code {
            font-family: monospace;
            color: #333;
          }
        }
      }
    }
  }

  .back-link {
    margin-top: 2rem;
    text-align: center;

    a {
      font-weight: 500;
      color: hsl(160deg 100% 37% / 100%);
      text-decoration: none;

      &over {
        text-decoration: underline;
      }
    }
  }
}
</style>
