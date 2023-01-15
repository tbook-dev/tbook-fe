import React, { useState, useCallback } from "react";
import LayoutV2 from "./LayoutV2";
import clsx from "clsx";
import { personalPropertyList } from "@/utils/const";
import { getUserAssets } from "@/api/incentive";
import { useAsyncEffect } from "ahooks";
import { Statistic, Progress } from "antd";
import { useNavigate } from "react-router-dom";

export default function PersonalProperty() {
  const [currentNav, setNav] = useState(null);
  const [assetList, setAssetList] = useState([]);
  const typeList = personalPropertyList.map((v) => v.value);
  const navigate = useNavigate();
  useAsyncEffect(async () => {
    const res = (await getUserAssets()) || [];
    const finalRes = res
      .filter((project) => {
        // 当grantlist为空的时候不展示projectName
        return Array.isArray(project.grantList) && project.grantList.length > 0;
      })
      .filter((project) => {
        // grant的类型必须是当前所展示的类型
        return project.grantList.some((grant) =>
          typeList.includes(grant.grantStatus)
        );
      });
    setAssetList(finalRes);

    // setAssetList([...finalRes,...finalRes]);
  }, []);

  const formatByNav = useCallback(() => {
    // console.log(currentNav, assetList);
    if (currentNav === null) return assetList;
    return assetList.filter((project) => {
      return project.grantList.some(
        (grant) => currentNav === grant.grantStatus
      );
    });
  }, [currentNav, assetList]);

  const handleClickCard = useCallback((card) => {
    // console.log("card", card);
    let link = "";
    if (card.grantStatus === 2) {
      // 点击签字中的卡片，进入signing流程；
      link = `/grants/${card.grantId}/sign`;
    } else {
      // 点击已生效或已完成卡片，进入grant详情页。
      link = `/incentive/grant/${card.incentivePlanId}/${card.grantId}/detail`;
      // /incentive/grant/:tipId/:grantId/detail
    }
    navigate(link);
  }, []);

  const handleNavChange = useCallback(
    (id) => {
      if (id === currentNav) {
        setNav(null);
      } else {
        setNav(id);
      }
    },
    [currentNav]
  );

  //   console.log("acurrentNav,ssetList->", currentNav, assetList);
  return (
    <LayoutV2>
      <main className="flex-auto px-12 py-8 bg-white">
        <nav className="flex pb-[25px] border-b border-[#E2E8F0] mb-14">
          {personalPropertyList.map((v) => (
            <div
              className={clsx(
                "w-[105px] mr-6 cursor-pointer text-sm py-1 rounded-2xl text-center font-medium hover:font-black hover:shadow-lg border",
                v.colorCls,
                v.value === currentNav && v.selectedCls
              )}
              key={v.value}
              onClick={() => handleNavChange(v.value)}
            >
              {v.label}
            </div>
          ))}
        </nav>

        <div>
          {formatByNav().map((v) => {
            return (
              <div key={v.projectId} className="flex items-start mb-14">
                <div className="w-[160px] mr-8 text-base font-semibold text-black">
                  {v.projectName}
                </div>
                <div className="grid grid-cols-3 gap-x-14 gap-y-12 w-[1098px]">
                  {v.grantList.map((grant) => {
                    const status = grant.grantStatus;
                    //   console.log("cliffAmount", grant.grantStatus);
                    const textCls = `text-sm	text-[#94A3B8] font-medium`;
                    const cardThemeColor = clsx({
                      "#F59E0B": status === 2,
                      "#1E293B": status === 4 || status === 3,
                    });
                    // console.log(status, currentNav);
                    // console.log('percent-status',status, percent)

                    return (currentNav === null || status === currentNav) &&
                      typeList.includes(status) ? (
                      <div
                        onClick={() => handleClickCard(grant)}
                        key={grant.grantId}
                        className={clsx(
                          "h-[200px] cursor-pointer px-6 pt-9 pb-4 border rounded-3xl flex flex-col justify-between shadow-c4",
                          status === 2 ? "border-[#FEF3C7] hover:bg-c1 hover:shadow-c4" :"border-[#E2E8F0]"
                        )}
                      >
                        <div className="flex justify-between">
                          <Statistic
                            title={<p className={textCls}>Vested Token</p>}
                            value={grant.cliffAmount}
                            valueStyle={{
                              color: cardThemeColor,
                              fontWeight: "600",
                            }}
                          />
                          <Statistic
                            title={
                              <p className={clsx(textCls, "text-right")}>
                                {status === 2 && Total} Value
                              </p>
                            }
                            prefix="$"
                            value={
                              status === 2
                                ? (grant.cliffAmount || 0) *
                                  (grant.exercisePrice || 0)
                                : (grant.grantNum || 0) *
                                  (grant.exercisePrice || 0)
                            }
                            valueStyle={{
                              color: cardThemeColor,
                              fontWeight: "600",
                            }}
                          />
                        </div>

                        <div>
                          {status === 3 && (
                            <div className="mx-[-24px]">
                              <Progress
                                percent={grant.cliffAmount/grant.grantNum}
                                strokeColor="#6366F1"
                                showInfo={false}
                              />
                            </div>
                          )}
                          <div
                            className={`text-base font-semibold text-[${cardThemeColor}]`}
                          >
                            {grant.grantId}
                          </div>
                          <div className={`flex items-center ${textCls}`}>
                            Total Token:
                            <Statistic
                              value={grant.grantNum}
                              suffix="Token"
                              valueStyle={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#94A3B8",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </LayoutV2>
  );
}
