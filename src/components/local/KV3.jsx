import React from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

const KV = ({ label, value, clx,children }) => {
  return (
    <div className={`${clx || ""}  shrink-0 mb-1 grid grid-cols-2 gap-x-6`}>
      <p className="text-sm text-[#94A3B8] text-left">{label}</p>
      <h3 className="text-base	font-medium	text-[#1E293B] text-left">
        <Paragraph
          ellipsis={{
            rows: 1,
          }}
          style={{ margin: 0 }}
        >
          {value}
        </Paragraph>
      </h3>
      {children}
    </div>
  );
};

export default KV;
