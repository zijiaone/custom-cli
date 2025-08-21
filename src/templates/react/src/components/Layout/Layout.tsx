import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './Layout.less';
import reactLogo from '@/assets/react.svg';
import HelloWorld from '@/components/HelloWorld/HelloWorld';

const Layout: React.FC = () => {
  return (
    <div className='app-container'>
      <header>
        <img
          alt='React logo'
          className='logo'
          height='125'
          src={reactLogo}
          width='125'
        />

        <div className='wrapper'>
          <HelloWorld />
          <div className='actions'>
            <Link
              className='action-button'
              to='/'>
              开始使用
            </Link>
            <Link
              className='action-button secondary'
              to='/about'>
              了解更多
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
