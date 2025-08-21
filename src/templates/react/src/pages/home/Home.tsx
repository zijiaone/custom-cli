import React from 'react';

import './Home.less';

const HomeView: React.FC = () => {
  const cards = [
    {
      icon: '📁',
      title: '项目结构',
      description: '清晰的目录结构，遵循React最佳实践，便于团队协作和代码维护。',
    },
    {
      icon: '🚀',
      title: '快速开发',
      description: '内置React Router、Redux、国际化和HTTP请求等功能，加速开发流程。',
    },
    {
      icon: '🔧',
      title: '工具配置',
      description: '集成了TypeScript、代码检查、格式化、Git提交规范等工具，确保代码质量和类型安全。',
    },
  ];

  return (
    <main>
      <div className='container'>
        <section className='section'>
          <p>模板提供了一套完整的开发环境和工具链，帮助您快速开始新项目开发。</p>
          <div className='cards'>
            {cards.map((card, index) => (
              <div
                className='card'
                key={index}>
                <div className='card-icon'>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeView;
