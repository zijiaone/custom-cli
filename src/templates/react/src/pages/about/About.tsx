import React from 'react';
import { Link } from 'react-router-dom';

import './About.less';

const AboutView: React.FC = () => {
  return (
    <div className='about'>
      <div className='content'>
        <section className='section'>
          <h2>项目介绍</h2>
          <p>
            这是一个基于 React 19 + Vite
            的前端标准化模板项目，旨在为开发团队提供一个开箱即用的前端开发框架，统一技术栈和开发规范，提高开发效率。
          </p>
        </section>

        <section className='section'>
          <h2>快速开始</h2>
          <div className='code-block'>
            <pre>
              <code>
                # 安装依赖
                <br />
                npm install
                <br />
                <br />
                # 开发环境启动
                <br />
                npm run dev
                <br />
                <br />
                # 生产环境构建
                <br />
                npm run build
                <br />
              </code>
            </pre>
          </div>
        </section>

        <section className='section'>
          <h2>开发规范</h2>
          <p>
            项目集成了 ESLint、Prettier 和 Stylelint 进行代码规范和格式化，使用 Simple Git Hooks 和 Commitlint 规范化
            Git 提交信息，确保团队代码风格的一致性。
          </p>
        </section>

        <div className='back-link'>
          <Link to='/'>返回首页</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
