import React from "react";
import { Statistic } from "antd";
import { targetMap, dateFormat, grantType } from "@/utils/const";
import KV from '@/components/local/KV'
import Title from '@/components/local/Title'


export default function ({ grantInfo = {}, grantee = {}, plan = {} }) {
  // console.log({ grantInfo, form, plan });

  return (
    <div className="grid grid-cols-2	gap-x-14	">
      <div>
        {/* left */}
        <section className="mb-[25px]">
          <Title title="Grantee" />
          <div className="grid grid-cols-2	gap-x-20">
            <KV label="Name" value={grantee.name} clx="col-span-full" />
            <KV label="Email Address" value={grantee.email} />
            <KV label="Ethereum Address" value={grantee.mainWallet} />
          </div>
        </section>

        <section className="mb-[25px]">
          <Title title="Plan" />
          <div className="grid grid-cols-2	gap-x-20">
            <KV label="Incentive Plan Name" value={plan.incentivePlanName} />
            <KV label="Target Audience" value={targetMap[plan.target]} />
          </div>
        </section>

        <section className="mb-[25px]">
          <Title title="Grant" />
          <div className="grid grid-cols-2	gap-x-20">
            <KV
              label="Total Amount"
              value={
                <Statistic
                  value={grantInfo?.grantNum}
                  valueStyle={{
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    color: "#1E293B",
                  }}
                />
              }
            />
            <KV
              label="Grant Effect Date"
              value={grantInfo?.grantDate?.format(dateFormat)}
            />
          </div>
        </section>

        <section>
          <Title title="Vesting Schedule" />
          <div className="grid grid-cols-2	gap-x-20">
            <KV
              label="Vested"
              value={
                grantType.find((v) => v.value === grantInfo.grantType)?.name
              }
            />
            <KV
              label="Vesting Start Date"
              value={grantInfo.grantDate?.format(dateFormat)}
            />
          </div>
        </section>
      </div>

      <div>图片未完成</div>
    </div>
  );
}
