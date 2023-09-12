import useExporeCampainQuery from "@/hooks/useExporeCampainQuery";
import ListCampaign from "@/components/campain/campaignList";
import CardCampaign from "@/components/campain/campaignCard";
import Loading from "@/components/loading";
import { useResponsive } from "ahooks";

const pageConf = {
  title: "Explore Campaigns",
};
export default function Expore() {
  const { data: list = [], isLoading } = useExporeCampainQuery();
  const { pc } = useResponsive();
  return (
    <main className="bg-[#FAFAFA] pb-20">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="lg:w-bx mx-auto px-7 lg:px-0">
          <h1 className="py-5 lg:py-10 text-black text-2xl font-bold lg:text-[32px] leading-tight lg:font-black">
            {pageConf.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {list.map((campaign) => {
              return pc ? (
                <ListCampaign key={campaign.campaignId} {...campaign} />
              ) : (
                <CardCampaign key={campaign.campaignId} {...campaign} />
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
