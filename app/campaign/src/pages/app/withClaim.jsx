import { useState } from "react";
import { useParams } from "react-router-dom";
import useCampaignQuery from "@/hooks/useCampaignQuery";

export default function WithClaim({ handleFn, item, loading }) {
  const { campaignId } = useParams();
  const { campaignNotStart } = useCampaignQuery(campaignId);
  //const [loading, updateLoading] = useState(false);
  const handleClick = async function () {
    if (item.disabled) return;
    //updateLoading(true);
    try {
      // await new Promise((resolve) =>{
      //   setTimeout(resolve, 10000)
      // })
      await handleFn();
      //updateLoading(false);
    } catch (e) {
      //updateLoading(false);
      console.log(e);
    }
  };
  return (
    !campaignNotStart && (
      <>
        {item.showBtn &&
          (item.disabled ? (
            <div
              className="w-full py-2.5 mb-1 rounded flex justify-center items-center"
              style={{
                color: item.color,
                backgroundColor: item.bgColor,
              }}
            >
              {item.label}
            </div>
          ) : (
            <button
              className="w-full py-2.5 mb-1 rounded"
              disabled={loading}
              style={{
                color: item.color,
                backgroundColor: item.bgColor,
              }}
              onClick={handleClick}
            >
              {loading ? item.loadingBtn : item.label}
            </button>
          ))}

        <p className="text-xs text-c-9">
          {loading ? item.loadingText : item.desc}
        </p>
      </>
    )
  );
}
