import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAsyncEffect, useResponsive } from "ahooks";
import { conf } from "@tbook/utils";

const { formatDollar, shortAddress } = conf;

export default function RecordTable() {
  const { pc } = useResponsive();
  const tableHeaders = useMemo(() => ["HOLDER", "Target Audience", "TOTAL TOKEN", "Percentage"], []);

  const list = useMemo(() => {
    return [
      {
        avator: "https://api.dicebear.com/5.x/bottts/svg?seed=jbxf",
        name: "lake Hu lake Hulake Hu lake Hu",
        targetAudience: "Investor",
        mainWallet: shortAddress("0x624f313007Ca80eAE6CD1536362721F479558e3F"),
        date: "01/02/2023",
        tokens: formatDollar(400000),
        perecent: 0.2,
      },
      {
        avator: "https://api.dicebear.com/5.x/bottts/svg?seed=jbxf",
        name: "lake Hu",
        targetAudience: "Investor",
        mainWallet: shortAddress("0x624f313007Ca80eAE6CD1536362721F479558e3F"),
        date: "01/02/2023",
        tokens: formatDollar(400000),
        perecent: 0.2,
      },
      {
        avator: "https://api.dicebear.com/5.x/bottts/svg?seed=jbxf",
        name: "lake Hu",
        targetAudience: "Investor",
        mainWallet: shortAddress("0x624f313007Ca80eAE6CD1536362721F479558e3F"),
        date: "01/02/2023",
        tokens: formatDollar(400000),
        perecent: 0.2,
      },
    ];
  });
  return (
    <div className="p-3 mb-10 text-white rect-border lg:py-6 lg:px-0">
      <div className="flex items-center justify-between mb-3 lg:px-6">
        <h2 className="font-medium text-c12 lg:text-c13">Stakeholders</h2>
        <Link to="/create/plan">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 text-xs font-medium leading-normal transition duration-150 ease-in-out rounded-md lg:w-40 lg:h-10 lg:dark:bg-white lg:rounded-lg dark:text-black shadow-d3 lg:hover:text-white lg:hover:bg-cw1 lg:hover:shadow-d7"
          >
            <PlusOutlined style={pc ? null : { color: "#69D0E5", fontSize: "16px" }} />
            <span className="ml-2 text-[14px] hidden lg:inline">New Record</span>
          </button>
        </Link>
      </div>

      <div className="lg:border-t lg:border-b-1">
        <div className="hidden py-3 mx-3 font-bold text-center border-b lg:mx-0 lg:px-4 border-b-1 lg:grid-cols-4 lg:grid text-c5 text-c-9">
          {tableHeaders.map((v) => {
            return <div key={v}>{v}</div>;
          })}
        </div>
        {list.map((v, idx) => {
          return pc ? (
            <div className="grid grid-cols-4 mx-4 border-b border-b-1" key={idx}>
              <div className="flex justify-center py-1">
                <div className="w-10 h-10 rounded-full bg-[#141414] flex justify-center items-center mr-2">
                  <img src={v.avator} className="object-cover w-6 h-6" />
                </div>

                <div className="flex flex-col justify-center flex-none text-b-8">
                  <h3 className="text-ellipsis w-[115px] truncate  text-b-8 text-c9">{v.name}</h3>
                  <p className="truncate text-ellipsis text-c14">{v.mainWallet}</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <span className="max-w-[115px] text-c5 text-ellipsis text-colorful1 border border-[#4ADBE7] px-4 rounded">
                  {v.targetAudience}
                </span>
              </div>
              <div className="flex items-center justify-center font-medium text-c1">{v.tokens}</div>
              <div className="flex items-center justify-center font-medium text-c1">{v.date}</div>
            </div>
          ) : (
            <div className="grid items-center grid-cols-2 mx-4 mb-3" key={idx}>
              <div className="flex items-center justify-center ml-3">
                <div className="w-7 h-7 rounded-full bg-[#141414] flex flex-none justify-center items-center mr-2">
                  <img src={v.avator} className="object-cover w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center flex-none text-b-8">
                  <div className="mb-1">
                    <span className="max-w-[115px] text-ellipsis  text-c15 text-colorful1 border border-[#4ADBE7] px-2 py-px rounded">
                      {v.targetAudience}
                    </span>
                  </div>

                  <h3 className="text-ellipsis w-[115px] truncate  text-b-8 text-c8">{v.name}</h3>
                  <p className="truncate text-ellipsis text-c4">{v.mainWallet}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="mb-px font-bold text-c8">
                  {v.tokens}({v.perecent}%)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
