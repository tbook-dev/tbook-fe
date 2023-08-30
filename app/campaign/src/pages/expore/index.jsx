import useExporeCampainQuery from "@/hooks/useExporeCampainQuery";
import ListCampaign from "@/components/campain/campaignList";
import Loading from "@/components/loading";

const pageConf = {
  title: "Explore Campaigns",
};
export default function Expore() {
  const { data: list = [], isLoading } = useExporeCampainQuery();
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
              return <ListCampaign key={campaign.campaignId} {...campaign} />;
            })}
          </div>
        </div>
      )}
    </main>
  );
}
