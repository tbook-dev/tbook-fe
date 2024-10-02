import React from 'react';
import { memo } from 'react';

import { NavLink, useParams, useLoaderData, Link } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon'
import LeaderboardIcon from './icons/LeaderboardIcon'
import AboutIcon from './icons/AboutIcon'

import { clsx } from 'clsx';

const BottomNav = () => {
  const { companyId, isLightTheme } = useLoaderData();

  const { companyId: paramsCompanyId } = useParams();
  const id = companyId || paramsCompanyId;

  const list = [
    {
      text: 'Home',
      link: `/company/${id}`,
      icon: ({ color }) => <HomeIcon color={ color } />,
    },
    {
      text: 'Leaderboard',
      link: `/company/${id}/leaderboard`,
      icon: ({ color }) => (
        <div className="relative">
          <LeaderboardIcon color={ color } />
        </div>
      ),
    },
    {
      text: 'About',
      link: `/company/${id}/about`,
      icon: ({ color }) => <AboutIcon color={ color } />,
    },
  ];

  return (
    <nav
      className={ clsx("fixed inset-x-0 px-8 pb-8 pt-3 rounded-t-3xl grid grid-cols-3 backdrop-blur-md z-20 bottom-0", 
        isLightTheme 
        ? "bg-white/90 border-[1px] border-[#E0CEEE] shadow-[0_0_14px_0_rgba(154,129,230,0.4)] text-black" 
        : "bg-[#252525] shadow-[0_0_14px_0_rgba(0,0,0,0.4)] text-white")}
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
