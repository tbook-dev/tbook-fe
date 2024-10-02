import clsx from 'clsx';

import React, { memo } from 'react';
import { NavLink, useParams, useLoaderData } from 'react-router-dom';

import HomeIcon from './icons/HomeIcon';
import LeaderboardIcon from './icons/LeaderboardIcon';
import AboutIcon from './icons/AboutIcon';

const BottomNav = ({ tabs }) => {
  const { companyId, isLightTheme } = useLoaderData();
  const { companyId: paramsCompanyId } = useParams();
  const id = companyId || paramsCompanyId;

  const getGridColsClass = (tabsCount) => {
    const gridColsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4'
    };
    return gridColsMap[ tabsCount ] || 'grid-cols-4'; // Default to 4 columns if unexpected count
  };

  return (
    <nav
      className={ clsx(
        "fixed inset-x-0 px-4 pb-8 pt-3 rounded-t-3xl grid backdrop-blur-md z-20 bottom-0",
        getGridColsClass(tabs.length),
        isLightTheme
          ? "bg-white/90 border-[1px] border-[#E0CEEE] shadow-[0_0_14px_0_rgba(154,129,230,0.4)] text-black"
          : "bg-[#252525] shadow-[0_0_14px_0_rgba(0,0,0,0.4)] text-white"
      ) }
    >
      { tabs.map((tab, idx) => (
        <NavLink
          replace
          end
          key={ tab.text }
          to={ tab.link(id) }
          className="flex justify-center"
          onClick={ () => {
            window.sessionRoutesCount -= 1;
          } }
        >
          { ({ isActive }) => (
            <div className="flex flex-col items-center text-xs gap-y-2">
              { tab.icon({
                color: isActive ? '#9A81E6' : '#CEC4EB'
              }) }
              <span className={ isActive ? 'text-[#9A81E6]' : 'text-[#CEC4EB]' }>
                { tab.text }
              </span>
            </div>
          ) }
        </NavLink>
      )) }
    </nav>
  );
};

const defaultTabs = [
  {
    text: 'Home',
    link: (id) => `/company/${id}`,
    icon: ({ color }) => <HomeIcon color={ color } />,
  },
  {
    text: 'Leaderboard',
    link: (id) => `/company/${id}/leaderboard`,
    icon: ({ color }) => (
      <div className="relative">
        <LeaderboardIcon color={ color } />
      </div>
    ),
  },
  {
    text: 'About',
    link: (id) => `/company/${id}/about`,
    icon: ({ color }) => <AboutIcon color={ color } />,
  }
];

export default memo(({ tabs = defaultTabs }) => <BottomNav tabs={ tabs } />);