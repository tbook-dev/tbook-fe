import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

function SettingsSidebar() {
  const location = useLocation();
  const { grantId, tipId } = useParams();
  const { pathname } = location;

  const submenu = [
    {
      pathname: `/incentive/grant/${tipId}/${grantId}/detail`,
      reg: /^\/incentive\/grant\/[0-9]+\/[0-9]+\/detail$/,
      title: "Details",
    },
    {
      reg: /^\/incentive\/grant\/[0-9]+\/[0-9]+\/schedule$/,
      title: "Vesting Schedule",
      pathname: `/incentive/grant/${tipId}/${grantId}/schedule`,
    },
  ];

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3">
      <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
        {submenu.map((menu) => {
          const isCurrent = menu.reg.test(pathname);
          return (
            <li className="mr-0.5 md:mr-0 md:mb-0.5" key={menu.title}>
              <NavLink
                end
                to={menu.pathname}
                className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                  isCurrent && "bg-indigo-50"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isCurrent ? "text-indigo-500" : "hover:text-slate-700"
                  }`}
                >
                  {menu.title}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SettingsSidebar;
