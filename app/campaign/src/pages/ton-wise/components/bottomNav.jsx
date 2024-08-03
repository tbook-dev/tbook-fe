import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@/images/icon/svgr/home.svg?react';
import CreditIcon from '@/images/icon/svgr/credit.svg?react';
import FriendIcon from '@/images/icon/svgr/friend.svg?react';
import { clsx } from 'clsx';

const BottomNav = () => {
  const list = [
    {
      text: 'Home',
      link: '/wise-score',
      icon: HomeIcon,
    },
    {
      text: 'Friends',
      link: '/wise-score/invite',
      icon: FriendIcon,
    },
    {
      text: 'Improve Credit',
      link: '/wise-score/detail',
      icon: CreditIcon,
    },
  ];
  return (
    <nav
      className={clsx(
        'fixed bottom-0 inset-x-0 px-8 pb-10 pt-3 rounded-t-2xl grid grid-cols-3 z-10 backdrop-blur-md bg-white/10'
      )}
    >
      {list.map((v, idx) => {
        return (
          <NavLink
            replace
            end
            key={v.text}
            to={v.link}
            className={clsx(
              idx === 0 && 'justify-self-start',
              idx === 1 && 'justify-self-center',
              idx === 2 && 'justify-self-end'
            )}
            onClick={() => {
              window.sessionRoutesCount -= 1;
            }}
          >
            {({ isActive }) => {
              return (
                <div
                  className={clsx(
                    'flex flex-col gap-y-2 text-xs items-center w-max'
                  )}
                >
                  <v.icon
                    className={clsx(isActive ? '' : 'opacity-40', 'size-6')}
                  />
                  <span className={isActive ? '' : 'text-white/40'}>
                    {v.text}
                  </span>
                </div>
              );
            }}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
