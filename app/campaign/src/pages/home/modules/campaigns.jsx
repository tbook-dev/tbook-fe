import { useResponsive } from "ahooks";
import useExporeCampainQuery from "@/hooks/useExporeCampainQuery";
import ListCampaign from "@/components/campain/campaignList";
import Loading from "@/components/loading";
import { useMemo } from "react";
import CampaignSwiper from "./swiper";

export default function Campaigns() {
  const { pc } = useResponsive();
  const { data: list = [], isLoading } = useExporeCampainQuery();
  
  const sectionList = useMemo(() => {
    return [
      {
        title: "SocialFi Campaigns",
        list: list.filter(v=> v.campaignCategory === 1),
      },
      {
        title: "Infra Campaigns",
        list: list.filter(v=> v.campaignCategory === 2),
      },
      {
        title: "Security Campaigns",
        list: list.filter(v=> v.campaignCategory === 3),
      },
      {
        title: "GameFi Campaigns",
        list: list.filter(v=> v.campaignCategory === 4),
      },
      {
        title: "Community Campaigns",
        list: list.filter(v=> v.campaignCategory === 5),
      },
    ].filter(v => v.list.length > 0);
  }, [list]);

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        sectionList.map((v) => {
          return (
            <section className="pb-20" key={v.title}>
              <div className="lg:w-bx mx-auto px-7 lg:px-0">
                <h1 className="relative py-5 lg:py-10 text-black text-2xl font-bold lg:text-[32px] leading-tight lg:font-black">
                  {v.title}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {pc ? (
                    v.list.slice(0, 4).map((campaign) => {
                      return (
                        <ListCampaign key={campaign.campaignId} {...campaign} />
                      );
                    })
                  ) : (
                    <CampaignSwiper
                      listData={v.list.slice(0, 4)}
                      ItemComponent={ListCampaign}
                    />
                  )}
                </div>
              </div>
            </section>
          );
        })
      )}
    </main>
  );
}
