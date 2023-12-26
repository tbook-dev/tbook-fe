import useAsset from "@/hooks/queries/useAsset";
import { conf } from "@tbook/utils";
import Loading from "@/components/loading";
import { CheckOutlined } from "@ant-design/icons";
import copyIcon from "@/images/icon/copy.svg";
import { Popover, Typography } from "antd";
import { groupBy, sum } from "lodash";

const { Paragraph } = Typography;
const { formatDollar } = conf;

export default function Credential() {
  const { data: info, isLoading: loading } = useAsset();
  const credentialList = info?.credentials || [];
  const fdata = groupBy(credentialList, "displayExp");

  return loading ? (
    <Loading h="h-40" />
  ) : (
    <div className="flex items-center gap-x-5 gap-y-4 text-xs flex-wrap">
      {credentialList.length > 0 ? (
        Object.entries(fdata).map(([k, v]) => {
          const item = v[0];
          const giveAway = sum(v.map((i) => i.giveAway));
          return (
            <div
              key={k}
              className="flex items-center justify-between gap-x-5 px-5 py-2"
            >
              <div className="flex items-center gap-x-1">
                <img src={item.picUrl} className="w-5 h-5" />
                <div
                  className="text-t-1"
                  dangerouslySetInnerHTML={{ __html: item.displayExp }}
                />
                {v.length === 1 ? (
                  <Popover
                    content={
                      <div className="text-sm text-[#FCFCFC] space-y-1">
                        <p>Credential ID</p>
                        <Paragraph
                          style={{ marginBottom: 0 }}
                          className="flex justify-center items-center"
                          copyable={{
                            text: item.campaignId,
                            icon: [
                              <img src={copyIcon} className="w-4 h-4" />,
                              <CheckOutlined style={{ color: "#3A82F7" }} />,
                            ],
                          }}
                        >
                          {item.campaignId}
                        </Paragraph>
                      </div>
                    }
                  >
                    <span className="text-xs inline-block p-1 bg-[#1a1a1a] rounded-sm cursor-pointer">
                      ID
                    </span>
                  </Popover>
                ) : (
                  <Popover
                    content={
                      <div className="space-y-6">
                        {v.map((item) => {
                          return (
                            <div
                              key={item.credentialId}
                              className="flex items-center justify-between gap-x-5 px-5 py-2"
                            >
                              <div className="flex items-center gap-x-1">
                                <img src={item.picUrl} className="w-5 h-5" />
                                <div
                                  className="text-t-1"
                                  dangerouslySetInnerHTML={{
                                    __html: item.displayExp,
                                  }}
                                />
                                <Popover
                                  content={
                                    <div className="text-sm text-[#FCFCFC] space-y-1">
                                      <p>Credential ID</p>
                                      <Paragraph
                                        style={{ marginBottom: 0 }}
                                        className="flex justify-center items-center"
                                        copyable={{
                                          text: item.campaignId,
                                          icon: [
                                            <img
                                              src={copyIcon}
                                              className="w-4 h-4"
                                            />,
                                            <CheckOutlined
                                              style={{ color: "#3A82F7" }}
                                            />,
                                          ],
                                        }}
                                      >
                                        {item.campaignId}
                                      </Paragraph>
                                    </div>
                                  }
                                >
                                  <span className="text-xs inline-block p-1 bg-[#1a1a1a] rounded-sm cursor-pointer">
                                    ID
                                  </span>
                                </Popover>
                              </div>
                              <div className="text-c-9 text-xs border border-[#666] rounded-2.5xl px-4 py-2">
                                Giveaway: {formatDollar(item.giveAway)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    }
                  >
                    <span className="text-xs inline-block p-1 bg-[#1a1a1a] rounded-sm cursor-pointer">
                      {v.length}
                    </span>
                  </Popover>
                )}
              </div>
              <div className="text-c-9 text-xs border border-[#666] rounded-2.5xl px-4 py-2">
                Giveaway: {formatDollar(giveAway)}
              </div>
            </div>
          );
        })
      ) : (
        <div className="h-[300px] w-full rounded-button bg-gray flex justify-center items-center">
          No Data
        </div>
      )}
    </div>
  );
}
