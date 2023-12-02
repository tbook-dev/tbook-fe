import { useParams, Link } from "react-router-dom";
import { useProposal } from "@tbook/snapshot/api";
import TimerDown from "@tbook/snapshot/components/TimerDown";
import Markdown from "./Markdown";

const regex = /(!\[.*?\]\()ipfs:\/\/([^)]+)(\))/g;
const replacement = "$1https://snapshot.4everland.link/ipfs/$2$3";

const formatIPFS = (src) => {
  if (typeof src !== "string") return;
  return src
    .split("\n")
    .map((markdown) => {
      console.log("markdown->", markdown);
      return markdown.replace(regex, replacement);
    })
    .join("\n");
};

export default function Snapshot() {
  const { projectId, campaignId, snapshotId } = useParams();
  const { data } = useProposal(snapshotId);
  console.log({ data });
  return (
    <div className="lg:w-[880px] mx-auto">
      <Link
        to={`/app/${projectId}/campaign/${campaignId}`}
        className="flex items-center text-base font-semibold p-2.5"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="px-3"
        >
          <path
            d="M12 5.25H2.8725L7.065 1.0575L6 0L0 6L6 12L7.0575 10.9425L2.8725 6.75H12V5.25Z"
            fill="#717374"
          />
        </svg>
        Back to campaign
      </Link>

      <div className="bg-white rounded-t-[20px] px-6 pt-5 min-h-[calc(100vh_-_100px)] space-y-8">
        <div className="space-y-3">
          <TimerDown state={data?.state} value={data?.end} />
          <h2 className="text-xl font-medium">{data?.title}</h2>
        </div>

        <Markdown>{formatIPFS(data?.body)}</Markdown>
      </div>
    </div>
  );
}
