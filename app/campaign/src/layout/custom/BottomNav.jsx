import React from 'react';
import { memo } from 'react';

import { NavLink, useParams } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon'
import LeaderboardIcon from './icons/LeaderboardIcon'
import AboutIcon from './icons/AboutIcon'

import { clsx } from 'clsx';
import { useHasWiseCreditInviteCode } from '@/hooks/useWiseScore';

const BottomNav = () => {
  const { hasInviteCode } = useHasWiseCreditInviteCode();
  
  const { companyName } = useParams();
  const list = [
    {
      text: 'Home',
      link: `/company/${companyName}`,
      icon: ({ color }) => <HomeIcon color={ color } />,
    },
    {
      text: 'Leaderboard',
      link: `/company/${companyName}/leaderboard`,
      icon: ({ color }) => (
        <div className="relative">
          <LeaderboardIcon color={ color } />
        </div>
      ),
    },
    {
      text: 'About',
      link: `/company/${companyName}/about`,
      icon: ({ color }) => <AboutIcon color={ color } />,
    },
  ];

  return (
    <nav
      className={ clsx(
        'fixed bottom-0 inset-x-0 px-8 pb-8 pt-3 rounded-t-3xl grid grid-cols-3 z-10 backdrop-blur-md bg-white/90 border-[1px] border-[#E0CEEE] shadow-[0_0_14px_0_rgba(154,129,230,0.4)]'
      ) }
    >
      { list.map((v, idx) => {
        return (
          <NavLink
            replace
            end
            key={ v.text }
            to={ v.link }
            className={ clsx(
              idx === 0 && 'justify-self-start',
              idx === 1 && 'justify-self-center',
              idx === 2 && 'justify-self-end'
            ) }
            onClick={ () => {
              window.sessionRoutesCount -= 1;
            } }
          >
            { ({ isActive }) => {
              return (
                <div
                  className={ clsx(
                    'flex flex-col gap-y-2 text-xs items-center w-max '
                  ) }
                >
                  <v.icon
                    color={ isActive ? '#9A81E6' : '#CEC4EB' }
                  />
                  <span className={ isActive ? 'text-[#9A81E6]' : 'text-[#CEC4EB]' }>
                    { v.text }
                  </span>
                </div>
              );
            } }
          </NavLink>
        );
      }) }
    </nav>
  );
};

export default memo(BottomNav);
