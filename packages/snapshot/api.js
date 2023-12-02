import snapshot from "@snapshot-labs/snapshot.js";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const qlHub = `https://hub.snapshot.org/graphql?apiKey=74eda144b7ab8c8120193528c36779c62bfd1263d225d2b966d4ac641cff0756`;
const httpHub = "https://hub.snapshot.org";
export const client = new snapshot.Client712(httpHub);

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
