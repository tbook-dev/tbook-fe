import React, { useState } from "react";

import Image from "../../images/user-avatar-80.png";

function AccountPanel() {
  const [name, setName] = useState("");

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Picture */}
        <section>
          <h2 className="text-1xl text-slate-800 font-bold mb-5">My Project</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full"
                src={Image}
                width="80"
                height="80"
                alt="User upload"
              />
            </div>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
              Change
            </button>
          </div>
        </section>

        {/* Password */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Business Profile
          </h2>
          <div>
            <div>
              <div>Business Name</div>
              <div>Business Name</div>
            </div>
            <div>
              <div>Total Token Amount</div>
              <div>Business Name</div>
            </div>
            <div>
              <div> Latest Valuation</div>
              <div>Business Name</div>
            </div>
            <div>
              <div>Token Contract Address</div>
              <div>Business Name</div>
            </div>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">
              Cancel
            </button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccountPanel;
