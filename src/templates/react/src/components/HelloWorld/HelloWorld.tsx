import React from 'react';

import './HelloWorld.less';

const HelloWorld: React.FC = () => {
  return (
    <div className='hello-world'>
      <h2>
        前端标准化开发模板，基于
        <a
          href='https://vitejs.dev/'
          rel='noopener'
          target='_blank'>
          Vite
        </a>
        {' + '}
        <a
          href='https://react.dev/'
          rel='noopener'
          target='_blank'>
          React
        </a>
        {' + '}
        <a
          href='https://www.typescriptlang.org/'
          rel='noopener'
          target='_blank'>
          TypeScript
        </a>
        {' 构建，开箱即用。'}
      </h2>
    </div>
  );
};

export default HelloWorld;
