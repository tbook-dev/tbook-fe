import React,{ useState } from "react";
import IncentiveLayout from "./Layout";
import { useAsyncEffect } from "ahooks";
import { useParams } from "react-router-dom";
import { getGrantInfo } from "../../api/incentive";

export default function GrantDetail() {
  const { grantId } = useParams();
  const [grantInfo, setGrantInfo] = useState({});

  useAsyncEffect(async function () {
    const data = await getGrantInfo(grantId);
    setGrantInfo(data)
  }, []);

  return (
    <IncentiveLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          GrantDetail
        </div>
      </div>
    </IncentiveLayout>
  );
}
