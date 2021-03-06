import React, { useEffect, useRef } from 'react';
import Parallax from 'parallax-js';
import { Menu, Avatar } from 'antd';
import { history, Link } from 'umi';
import { menus } from '@/utils/menu';
import _ from 'lodash';
import styles from './style.less';
const { SubMenu } = Menu;

interface IAppProps {}

export const Headers: React.FunctionComponent<IAppProps> = () => {
  const onRef: React.MutableRefObject<undefined> = useRef();

  const handleClick: (value: any) => void = (value) => {
    console.log(value, 'value header');
  };

  useEffect(() => {
    new Parallax(onRef.current, {
      relativeInput: true,
    });
  }, []);

  function getMenuItem(menuArr: any): any {
    // 获取菜单项
    return _.map(
      menuArr,
      (route: {
        children: any;
        key: React.Key | null | undefined;
        path: any;
        title: any;
      }) => {
        if (route.children) {
          // 有多级菜单时
          return (
            // 重复调用函数渲染出子级菜单
            <SubMenu key={route.key} title={route.title}>
              {getMenuItem(route.children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={route.key}>
            {' '}
            <Link to={route.path}>{route.title}</Link>{' '}
          </Menu.Item>
        );
      },
    );
  }

  function sideBarRender() {
    return (
      <Menu
        mode="horizontal"
        theme="light"
        style={{
          height: '100%',
          lineHeight: '64px',
          borderBottom: 'none',
          borderRight: 0,
        }}
      >
        {getMenuItem(menus)}
      </Menu>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.wrap_conatiner}>
        <span
          onClick={() => {
            history.push('/home');
          }}
        >
          <div ref={onRef} id="scene">
            <div data-depth="0.2">
              <Avatar size={46} src={require('@/images/logo.gif')} />
            </div>
          </div>
        </span>
        <div className={styles.width_block}>
          <Menu
            style={{
              height: '64px',
            }}
            onClick={handleClick}
            mode="horizontal"
          >
            {/* <Menu.Item key="todolist">TODOLIST</Menu.Item> */}
            {sideBarRender()}
          </Menu>
        </div>
      </div>
    </div>
  );
};
