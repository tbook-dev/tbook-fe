import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

function GrantCreate() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [planId, setPlanId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [exercisePrice, setExercisePrice] = useState(0);
  // const [buyBack, setBuyBack] = useState("");
  const [vestingStartDate, setVestingStartDate] = useState();
  const [vestingSchedule, setVestingSchedule] = useState();

  const { planIdParam } = useParams();

  function submitGrant(evt) {
    const d = new FormData();
    d.append("planId", planId);
    d.append("quantity", quantity);
    d.append("exercisePrice", exercisePrice);
    // d.append("buyBack", buyBack);
    d.append("vestingStartDate", vestingStartDate);
    d.append("vestingEndDate", vestingSchedule);

    evt.preventDefault();
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="lg:relative lg:flex">

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]">
              <div className="lg:max-w-[640px] lg:mx-auto">

                {/* Cart items */}
                <div className="mb-6 lg:mb-0">
                  <div className="mb-3">
                    <div className="flex text-sm font-medium text-slate-400 space-x-2">
                      <span className="text-slate-500">Incentives</span>
                      <span>-&gt;</span>
                      <span className="text-slate-500">New Grant</span>
                    </div>
                  </div>
                  <header className="mb-6">
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">Create a Incentive Plan ✨</h1>
                  </header>
                  {/* Billing Information */}
                  <div>
                    <div className="text-slate-800 font-semibold mb-4">Incentive Information</div>
                    <form onSubmit={submitGrant}>
                      <div className="space-y-4">
                        {/* 1st row */}
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="tip">
                              TIP
                            </label>
                            <select onChange={e => setPlanId(e.target.value)} id="tip" name="tip" className="form-input w-full">
                            </select>
                          </div>
                        </div>
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="quantity">
                              Quantity
                            </label>
                            <input onChange={e => setQuantity(e.target.value)} id="quantity" name="quantity" className="form-input w-full" type="number" defaultValue="" required/>
                          </div>
                        </div>
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="exercisePrice">
                              Total virtual token
                            </label>
                            <input onChange={e => setExercisePrice(e.target.value)} id="exercisePrice" name="exercisePrice" className="form-input w-full" type="number" defaultValue="" required/>
                          </div>
                        </div>
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="vestingStart">
                              Vesting Start Date
                            </label>
                            <input onChange={e => setVestingStartDate(e.target.value)} id="vestingStart" className="form-input w-full" type="date" required/>
                          </div>
                        </div>

                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="vestingSchedule">
                              Vesting Schedule
                            </label>
                            <select onChange={e => setVestingSchedule(e.target.value)} id="vestingSchedule" className="form-input w-full">
                              <option value="1">1/24M 1Y Cliff</option>
                              <option value="2">1/24M 2Y Cliff</option>
                              <option value="3">1/24M 4Y Cliff</option>
                            </select>
                          </div>
                        </div>

                        <div className="text-right">
                          <button type="submit" className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500">
                            Create
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* Divider */}
                  <hr className="my-6 border-t border-slate-200" />
                </div>

              </div>
            </div>
          </div>
        </main>

      </div>

    </div>
  );
}

export default GrantCreate;