import React from "react";

import AccountPanel from "../../partials/settings/ProjectPanel";

function Project() {
  return (
    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
      {/* Page header */}
      <div className="mb-8">
        {/* Title */}
        <h1 className="text-2xl font-bold md:text-3xl text-slate-800">
          Settings ✨
        </h1>
      </div>

      {/* Content */}
      <div className="mb-8 bg-white rounded-sm shadow-lg">
        {/* <div className="flex flex-col md:flex-row md:-mr-px"> */}
        {/* <SettingsSidebar /> */}
        <AccountPanel />
        {/* </div> */}
      </div>
    </div>
  );
}

export default Project;
