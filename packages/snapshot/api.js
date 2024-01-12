import snapshot from "@snapshot-labs/snapshot.js";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { Web3Provider } from "@ethersproject/providers";

const apiKey =
  "74eda144b7ab8c8120193528c36779c62bfd1263d225d2b966d4ac641cff0756";
const qlHub = `https://hub.snapshot.org/graphql?apiKey=${apiKey}`;
const httpHub = "https://hub.snapshot.org";
export const client = new snapshot.Client712(httpHub);

export const getSnapshotIdBylink = (link) => {
  try {
    const { hash } = new URL(link);
    const path = hash.slice(0);
    const pathParts = path.split("/");
    return pathParts[pathParts.length - 1];
  } catch (e) {
    return null;
  }
};

export const useProposal = (id) => {
  return useQuery(
    ["proposal", id],
    async () => {
      const { proposal } = await request(
        qlHub,
        gql`
        query {
            proposal(id: "${id}") {
              id
              title
              body
              choices
              start
              link
              discussion
              end
              snapshot
              state
              author
              created
              scores
              scores_by_strategy
              scores_total
              scores_updated
              plugins
              type
              network
              quorum
              votes
              ipfs
              app
              symbol
              strategies {
                name
                network
                params
              }
              space {
                id
                name
              }
            }
          }
        `
      );

      return proposal;
    },
    {
      enabled: !!id,
    }
  );
};

export const useSpace = (id) => {
  return useQuery(
    ["space", id],
    async () => {
      const { space } = await request(
        qlHub,
        gql`
        query {
          space(id: "${id}") {
              id
              voting {
                delay
                hideAbstain
                period
                privacy
                quorum
                type
              }
            }
          }
        `
      );

      return space;
    },
    {
      enabled: !!id,
    }
  );
};

// 获取当前的投票情况
export const useUserVotes = (proposalId, voter, disable = false) => {
  return useQuery(
    ["vote", proposalId, voter],
    async () => {
      const { votes } = await request(
        qlHub,
        gql`
        query {
          votes(where: { proposal: "${proposalId}", voter: "${voter}" }) {
              choice
              ipfs
              voter
              vp
              vp_by_strategy
            }
          }
        `
      );
      return votes;
    },
    {
      enabled: !!proposalId && !!voter && !disable,
    }
  );
};

export const getVp = ({
  address,
  network,
  strategies,
  snapshot: snapshotHeight,
  space,
}) => {
  // const address = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11";
  // const network = "1";
  // const strategies = [
  //   {
  //     name: "erc20-balance-of",
  //     params: {
  //       address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //       symbol: "DAI",
  //       decimals: 18,
  //     },
  //   },
  // ];
  // const snapshotHeight = 11437846;
  // const space = "yam.eth";
  const delegation = false;
  const options = { url: `https://score.snapshot.org/?apiKey=${apiKey}` };

  return snapshot.utils.getVp(
    address,
    network,
    strategies,
    Number(snapshotHeight),
    space,
    delegation,
    options
  );
};

export const useVp = ({ address, network, strategies, snapshot, space }) => {
  return useQuery(
    ["vp", address, network, snapshot, space],
    async () => {
      return getVp({ address, network, strategies, snapshot, space });
    },
    {
      enabled: !!address && !!snapshot,
    }
  );
};

export const castVote = async (
  wallet,
  account,
  { proposal, space, type, choice, app }
) => {
  const web3 = new Web3Provider(wallet);
  return client.vote(web3, account, {
    space,
    proposal,
    type,
    choice,
    app,
    reason: "",
  });
};
