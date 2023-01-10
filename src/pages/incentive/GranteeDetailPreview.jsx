import React, { useState, useEffect } from "react";
import { Typography, Statistic } from "antd";
import { targetMap, dateFormat, grantType } from "@/utils/const";

const { Paragraph } = Typography;

const KV = ({ label, value, clx }) => {
  return (
    <div className={`${clx || ""} shrink-0 mb-1`}>
      <p className="text-xs text-[#475569]">{label}</p>
      <h3 className="text-base	font-semibold	text-[#1E293B]">
        <Paragraph
          ellipsis={{
            rows: 1,
          }}
          style={{ margin: 0 }}
        >
          {value}
        </Paragraph>
      </h3>
    </div>
  );
};

const Title = ({ title }) => {
  return <h2 className="text-base	font-semibold	text-[#1E293B] mb-1">{title}</h2>;
};

export default function ({ form, grantee = {}, plan = {} }) {
  const [grantInfo, setGrantInfo] = useState({});
  useEffect(() => {
    form.validateFields().then((values) => {
      setGrantInfo(values);
    });
  }, [form]);

  console.log({ grantInfo, form, plan });

  return (
    <div className="grid grid-cols-2	gap-x-14	">
      <div className="">
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
