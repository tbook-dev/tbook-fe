import snapshot from "@snapshot-labs/snapshot.js";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const qlHub = `https://hub.snapshot.org/graphql?apiKey=74eda144b7ab8c8120193528c36779c62bfd1263d225d2b966d4ac641cff0756`;
const httpHub = "https://hub.snapshot.org";
export const client = new snapshot.Client712(httpHub);

export const getSnapshotIdBylink = (link) => {
  const { hash } = new URL(link);
  const path = hash.slice(0);
  const pathParts = path.split("/");
  return pathParts[pathParts.length - 1];
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
              network
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
