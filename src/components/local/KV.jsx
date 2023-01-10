import React from "react";
import { Typography } from "antd";

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

export default KV;
