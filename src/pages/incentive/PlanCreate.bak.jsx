import React, { useState } from "react";
import IncentiveLayout from "./Layout";
import { Button, Space,Form } from "antd";

function PlanCreate() {
  const [form] = Form.useForm();

  const [planName, setPlanName] = useState("");
  const [totalToken, setTotalToken] = useState(0);
  const [tipFor, setTipFor] = useState(1);
  const [prefix, setPrefix] = useState("");
  const [poorForTip, setPoorForTip] = useState(0);

  function submitPlan(evt) {
    const d = new FormData();
    d.append("planName", planName);
    d.append("totalToken", totalToken);
    d.append("tipFor", tipFor);
    d.append("prefix", prefix);
    d.append("poorForTip", poorForTip);

    evt.preventDefault();
  }

  return (
    <IncentiveLayout>
      <div className="lg:relative lg:flex">
        <div className="px-4 sm:px-6 lg:px-16 py-8 lg:grow lg:pr-8 xl:pr-16">
          <div className="lg:max-w-[500px]">
            <div className="mb-6 lg:mb-0">
              <div className="mb-3">
                <div className="flex text-sm font-medium text-slate-400 space-x-2">
                  <span className="text-slate-500">Incentives</span>
                  <span>-&gt;</span>
                  <span className="text-[#6366F1]">Create a TIP</span>
                </div>
              </div>
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
                  New Token Incentive Plan
                </h1>
              </header>
              <div>
                <div className="text-slate-800 font-semibold mb-4">
                  TIP Basic Info
                </div>
                <form onSubmit={submitPlan}>
                  <div className="space-y-4">
                    <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="tipName"
                        >
                          TIP Name
                        </label>
                        <input
                          onChange={(e) => setPlanName(e.target.value)}
                          id="tipName"
                          name="tipName"
                          className="form-input w-full"
                          type="text"
                          defaultValue=""
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="totalToken"
                        >
                          Total token
                        </label>
                        <input
                          onChange={(e) => setTotalToken(e.target.value)}
                          id="totalToken"
                          name="totalToken"
                          className="form-input w-full"
                          type="number"
                          defaultValue=""
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="tipForType"
                        >
                          Target Audiende
                        </label>
                        <select
                          defaultValue={tipFor}
                          onChange={(e) => setTipFor(e.target.value)}
                          id="tipForType"
                          className="form-input w-full"
                        >
                          <option value="1">Employee</option>
                          <option value="2">Investor</option>
                          <option value="3">Community</option>
                        </select>
                      </div>
                    </div>
                    <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="prefix"
                        >
                          Prefix (E.g ES)
                        </label>
                        <input
                          onChange={(e) => setPrefix(e.target.value)}
                          id="prefix"
                          className="form-input w-full"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="poorForTip"
                        >
                          Poor for this tip
                        </label>
                        <input
                          onChange={(e) => setPoorForTip(e.target.value)}
                          id="poorForTip"
                          className="form-input w-full"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <hr className="my-6 border-t border-slate-200" />
              <div className="text-right">
                <Space>
                  <Button>Save</Button>
                  <Button
                    type="primary"
                    className="bg-[#6366F1]"
                  >
                    Create
                  </Button>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanCreate;
