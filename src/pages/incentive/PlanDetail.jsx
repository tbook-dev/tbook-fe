import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

function PlanDetail() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams()

  useEffect(() => {
    console.log({id})
    fetch(``, { credentials: "include" })
    .then(r => r.json())
    .then(r => {})
  }, [])

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
                      <span className="text-slate-500">Detail</span>
                    </div>
                  </div>
                  <header className="mb-6">
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">Incentive Information ✨</h1>
                  </header>
                  {/* Billing Information */}
                  <div>
                      <div className="space-y-4">
                        {/* 1st row */}
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex">
                            <label className="w=64 text-sm font-bold mb-1 after:content-[' : ']" htmlFor="tipName">
                              TIP Name
                            </label>
                            <span id="tipName" name="tipName" className="flex-auto w-64 w-full"></span>
                          </div>
                        </div>
                        <hr className="my-6 border-t border-slate-200" />
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex">
                            <label className="w-64 text-sm font-bold mb-1 after:content-[' : ']" htmlFor="totalToken">
                              Total virtual token
                            </label>
                            <span id="totalToken" name="totalToken" className="flex-auto w-64 w-full"></span>
                          </div>
                        </div>
                        {/* 2nd row */}
                        <hr className="my-6 border-t border-slate-200" />
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex">
                            <label className="w-64 text-sm font-bold mb-1 after:content-[' : ']" htmlFor="tipForType">
                              TIP for
                            </label>
                            <span className='flex-auto w-64 w-full'></span>
                          </div>
                        </div>
                        <hr className="my-6 border-t border-slate-200" />
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex">
                            <label className="w-64 text-sm font-bold mb-1 after:content-[' : ']" htmlFor="prefix">
                              Prefix (E.g ES)
                            </label>
                            <span id="prefix" className="flex-auto w-64 w-full"></span>
                          </div>
                        </div>
                        {/* 3rd row */}
                        <hr className="my-6 border-t border-slate-200" />
                        <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                          <div className="flex">
                            <label className="w-64 text-sm font-bold mb-1 after:content-[' : ']" htmlFor="poorForTip">
                              Poor for this tip
                            </label>
                            <span className="flex-auto w-64 w-full"></span>
                          </div>
                        </div>
                      </div>
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

export default PlanDetail;