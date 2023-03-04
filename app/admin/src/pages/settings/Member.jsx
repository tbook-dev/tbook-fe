import React from "react";

import MemberPanel from "../../partials/settings/MemberPanel";

function Member() {
  return (
    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl text-slate-800">
          Settings ✨
        </h1>
      </div>

      <div className="mb-8 bg-white rounded-sm shadow-lg">
        <MemberPanel />
      </div>
    </div>
  );
}

export default Member;
